'use client';

import { useCallback, useRef, useState } from 'react';
import { Download, Combine, RefreshCw, Plus, X, GripVertical, FileText } from 'lucide-react';
import { useI18n } from '@/i18n/context';

type ProcessState = 'idle' | 'processing' | 'done' | 'error';

interface PdfEntry {
  id: string;
  file: File;
  pageCount: number | null; // null until loaded
}

const MAX_SIZE_BYTES = 50 * 1024 * 1024;

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function getPdfPageCount(file: File): Promise<number | null> {
  try {
    const { PDFDocument } = await import('pdf-lib');
    const bytes = await file.arrayBuffer();
    const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    return doc.getPageCount();
  } catch {
    return null;
  }
}

export default function MergePdfTool() {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const [pdfs, setPdfs] = useState<PdfEntry[]>([]);
  const [state, setState] = useState<ProcessState>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number>(0);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const dragItem = useRef<string | null>(null);

  const totalSize = pdfs.reduce((s, p) => s + p.file.size, 0);

  const addFiles = useCallback(async (files: FileList | File[]) => {
    setErrorMsg(null);
    const arr = Array.from(files);
    const valid: PdfEntry[] = [];

    for (const file of arr) {
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        setErrorMsg(t('merge_pdf_error_type'));
        continue;
      }
      if (file.size > MAX_SIZE_BYTES) {
        setErrorMsg(t('merge_pdf_error_size'));
        continue;
      }
      valid.push({ id: `${Date.now()}-${Math.random()}`, file, pageCount: null });
    }

    if (valid.length) {
      setPdfs((prev) => [...prev, ...valid]);
      setResultUrl(null);
      setState('idle');

      // Load page counts async (non-blocking)
      for (const entry of valid) {
        getPdfPageCount(entry.file).then((count) => {
          setPdfs((prev) =>
            prev.map((p) => (p.id === entry.id ? { ...p, pageCount: count } : p))
          );
        });
      }
    }
  }, [t]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) addFiles(e.target.files);
    e.target.value = '';
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const removePdf = (id: string) => {
    setPdfs((prev) => prev.filter((p) => p.id !== id));
    setResultUrl(null);
    setState('idle');
  };

  // Drag-to-reorder
  const handleDragStart = (id: string) => { dragItem.current = id; };
  const handleDragEnter = (id: string) => { setDragOverId(id); };
  const handleDragEnd = () => {
    if (dragItem.current && dragOverId && dragItem.current !== dragOverId) {
      setPdfs((prev) => {
        const arr = [...prev];
        const fromIdx = arr.findIndex((p) => p.id === dragItem.current);
        const toIdx = arr.findIndex((p) => p.id === dragOverId);
        const [moved] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, moved);
        return arr;
      });
    }
    dragItem.current = null;
    setDragOverId(null);
  };

  const merge = useCallback(async () => {
    if (pdfs.length < 2) {
      setErrorMsg(t('merge_pdf_error_one_file'));
      return;
    }
    setState('processing');
    setErrorMsg(null);

    try {
      // Dynamic import — only loaded when merge is triggered
      const { PDFDocument } = await import('pdf-lib');

      const mergedDoc = await PDFDocument.create();

      for (const entry of pdfs) {
        const bytes = await entry.file.arrayBuffer();
        const srcDoc = await PDFDocument.load(bytes, { ignoreEncryption: false });
        const pageIndices = srcDoc.getPageIndices();
        const copiedPages = await mergedDoc.copyPages(srcDoc, pageIndices);
        copiedPages.forEach((page) => mergedDoc.addPage(page));
      }

      const mergedBytes = await mergedDoc.save({ useObjectStreams: true });
      // ✅ FIX: Convert Uint8Array to ArrayBuffer for Blob compatibility
      const blob = new Blob([mergedBytes.buffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setResultUrl(url);
      setResultSize(mergedBytes.byteLength);
      setState('done');
    } catch (err) {
      const msg = err instanceof Error && err.message.toLowerCase().includes('encrypt')
        ? 'One or more PDFs are password-protected. Please remove passwords first.'
        : t('merge_pdf_error_process');
      setErrorMsg(msg);
      setState('error');
    }
  }, [pdfs, resultUrl, t]);

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = 'cozuro-merged.pdf';
    a.click();
  };

  const isProcessing = state === 'processing';

  return (
    <div className="space-y-6">
      {/* Drop zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => !isProcessing && inputRef.current?.click()}
        className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 hover:border-indigo-400 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition-all duration-200 p-8 text-center cursor-pointer"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-200 dark:bg-slate-700">
            <Plus className="h-6 w-6 text-slate-500 dark:text-slate-400" />
          </div>
          <div>
            <p className="font-semibold text-slate-700 dark:text-slate-200">{t('merge_pdf_upload')}</p>
            <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">{t('merge_pdf_upload_sub')}</p>
          </div>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        multiple
        onChange={handleInputChange}
        className="hidden"
      />

      {/* PDF list */}
      {pdfs.length > 0 && (
        <div className="space-y-3 animate-slide-up">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400 dark:text-slate-500">{t('merge_pdf_reorder_hint')}</p>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {pdfs.length} {t('merge_pdf_files_count')} · {formatSize(totalSize)}
            </span>
          </div>

          <div className="space-y-2">
            {pdfs.map((pdf, idx) => (
              <div
                key={pdf.id}
                draggable
                onDragStart={() => handleDragStart(pdf.id)}
                onDragEnter={() => handleDragEnter(pdf.id)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                className={`flex items-center gap-3 rounded-xl border bg-white dark:bg-slate-900 p-3 cursor-grab active:cursor-grabbing transition-all ${
                  dragOverId === pdf.id
                    ? 'border-indigo-400 shadow-md shadow-indigo-500/10 scale-[1.01]'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <GripVertical className="h-4 w-4 text-slate-300 dark:text-slate-600 shrink-0" />
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/40">
                  <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-300">
                    {idx + 1}. {pdf.file.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {formatSize(pdf.file.size)}
                    {pdf.pageCount !== null && ` · ${pdf.pageCount} ${t('merge_pdf_pages')}`}
                  </p>
                </div>
                <button
                  onClick={() => removePdf(pdf.id)}
                  disabled={isProcessing}
                  className="shrink-0 p-1.5 rounded-lg text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => inputRef.current?.click()}
            disabled={isProcessing}
            className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 py-2.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
            {t('merge_pdf_add_more')}
          </button>
        </div>
      )}

      {/* Merge button */}
      {pdfs.length >= 2 && (
        <button
          onClick={merge}
          disabled={isProcessing}
          className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              {t('merge_pdf_processing')}
            </>
          ) : (
            <>
              <Combine className="h-4 w-4" />
              {t('merge_pdf_merge')}
            </>
          )}
        </button>
      )}

      {pdfs.length === 1 && (
        <p className="text-center text-xs text-slate-400 dark:text-slate-500">
          {t('merge_pdf_error_one_file')}
        </p>
      )}

      {/* Error */}
      {errorMsg && (
        <p className="text-sm text-red-600 dark:text-red-400 font-medium animate-fade-in">⚠ {errorMsg}</p>
      )}

      {/* Result */}
      {state === 'done' && resultUrl && (
        <div className="rounded-2xl border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50 dark:bg-indigo-950/20 p-5 animate-slide-up space-y-3">
          <h3 className="text-sm font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider">
            {t('merge_pdf_result_title')}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {pdfs.length} {t('merge_pdf_files_count')} → {formatSize(resultSize)}
          </p>
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-5 py-3 text-sm font-bold text-white shadow-md transition-all"
          >
            <Download className="h-4 w-4" />
            {t('merge_pdf_download')}
          </button>
        </div>
      )}
    </div>
  );
}