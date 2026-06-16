'use client';

import { useCallback, useRef, useState } from 'react';
import { Download, FileImage, RefreshCw, Plus, X, GripVertical } from 'lucide-react';
import { useI18n } from '@/i18n/context';

type ProcessState = 'idle' | 'processing' | 'done' | 'error';

interface ImageEntry {
  id: string;
  file: File;
  previewUrl: string;
  width: number;
  height: number;
}

const MAX_SIZE_BYTES = 20 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function loadImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
}

export default function JpgToPdfTool() {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [state, setState] = useState<ProcessState>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const dragItem = useRef<string | null>(null);

  const totalSize = images.reduce((s, i) => s + i.file.size, 0);

  const addFiles = useCallback(async (files: FileList | File[]) => {
    setErrorMsg(null);
    const arr = Array.from(files);
    const valid: ImageEntry[] = [];

    for (const file of arr) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setErrorMsg(t('jpg_to_pdf_error_type'));
        continue;
      }
      if (file.size > MAX_SIZE_BYTES) {
        setErrorMsg(t('jpg_to_pdf_error_size'));
        continue;
      }
      try {
        const { width, height } = await loadImageDimensions(file);
        valid.push({
          id: `${Date.now()}-${Math.random()}`,
          file,
          previewUrl: URL.createObjectURL(file),
          width,
          height,
        });
      } catch {
        setErrorMsg(t('jpg_to_pdf_error_process'));
      }
    }
    if (valid.length) {
      setImages((prev) => [...prev, ...valid]);
      setResultUrl(null);
      setState('idle');
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

  const removeImage = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
    setResultUrl(null);
    setState('idle');
  };

  // Drag-to-reorder
  const handleDragStart = (id: string) => { dragItem.current = id; };
  const handleDragEnter = (id: string) => { setDragOverId(id); };
  const handleDragEnd = () => {
    if (dragItem.current && dragOverId && dragItem.current !== dragOverId) {
      setImages((prev) => {
        const arr = [...prev];
        const fromIdx = arr.findIndex((i) => i.id === dragItem.current);
        const toIdx = arr.findIndex((i) => i.id === dragOverId);
        const [moved] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, moved);
        return arr;
      });
    }
    dragItem.current = null;
    setDragOverId(null);
  };

  const createPdf = useCallback(async () => {
    if (images.length === 0) {
      setErrorMsg(t('jpg_to_pdf_error_no_images'));
      return;
    }
    setState('processing');
    setErrorMsg(null);

    try {
      // Dynamic import for code splitting — jspdf is ~300KB
      const { jsPDF } = await import('jspdf');

      const firstImg = images[0];
      const isLandscape = firstImg.width > firstImg.height;
      const pdf = new jsPDF({
        orientation: isLandscape ? 'landscape' : 'portrait',
        unit: 'px',
        format: [firstImg.width, firstImg.height],
        compress: true,
      });

      for (let i = 0; i < images.length; i++) {
        const entry = images[i];
        if (i > 0) {
          pdf.addPage([entry.width, entry.height], entry.width > entry.height ? 'landscape' : 'portrait');
        }

        // Draw image via canvas to get a clean data URL at original resolution
        const bitmap = await createImageBitmap(entry.file);
        const canvas = document.createElement('canvas');
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas 2D context unavailable');
        ctx.drawImage(bitmap, 0, 0);
        bitmap.close();

        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        const imgFormat = 'JPEG';

        pdf.addImage(dataUrl, imgFormat, 0, 0, entry.width, entry.height, undefined, 'FAST');
      }

      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setResultUrl(url);
      setState('done');
    } catch {
      setErrorMsg(t('jpg_to_pdf_error_process'));
      setState('error');
    }
  }, [images, resultUrl, t]);

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = 'cozuro-converted.pdf';
    a.click();
  };

  const isProcessing = state === 'processing';

  return (
    <div className="space-y-6">
      {/* Drop zone for adding images */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 hover:border-rose-400 hover:bg-rose-50/40 dark:hover:bg-rose-950/20 transition-all duration-200 p-8 text-center cursor-pointer"
        onClick={() => !isProcessing && inputRef.current?.click()}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-200 dark:bg-slate-700">
            <Plus className="h-6 w-6 text-slate-500 dark:text-slate-400" />
          </div>
          <div>
            <p className="font-semibold text-slate-700 dark:text-slate-200">{t('jpg_to_pdf_upload')}</p>
            <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">{t('jpg_to_pdf_upload_sub')}</p>
          </div>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Image list with drag reorder */}
      {images.length > 0 && (
        <div className="space-y-3 animate-slide-up">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400 dark:text-slate-500">{t('jpg_to_pdf_reorder_hint')}</p>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {images.length} {t('jpg_to_pdf_images_count')} · {formatSize(totalSize)}
            </span>
          </div>

          <div className="space-y-2">
            {images.map((img, idx) => (
              <div
                key={img.id}
                draggable
                onDragStart={() => handleDragStart(img.id)}
                onDragEnter={() => handleDragEnter(img.id)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                className={`flex items-center gap-3 rounded-xl border bg-white dark:bg-slate-900 p-3 cursor-grab active:cursor-grabbing transition-all ${
                  dragOverId === img.id
                    ? 'border-rose-400 shadow-md shadow-rose-500/10 scale-[1.01]'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <GripVertical className="h-4 w-4 text-slate-300 dark:text-slate-600 shrink-0" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.previewUrl}
                  alt={`Page ${idx + 1}`}
                  className="h-10 w-14 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t('jpg_to_pdf_page')} {idx + 1}
                  </p>
                  <p className="text-xs text-slate-400">{img.file.name} · {img.width}×{img.height}</p>
                </div>
                <button
                  onClick={() => removeImage(img.id)}
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
            className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 py-2.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:border-rose-400 hover:text-rose-600 dark:hover:text-rose-400 transition-all disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
            {t('jpg_to_pdf_add_more')}
          </button>
        </div>
      )}

      {/* Action button */}
      {images.length > 0 && (
        <button
          onClick={createPdf}
          disabled={isProcessing}
          className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              {t('jpg_to_pdf_processing')}
            </>
          ) : (
            <>
              <FileImage className="h-4 w-4" />
              {t('jpg_to_pdf_convert')}
            </>
          )}
        </button>
      )}

      {/* Error */}
      {errorMsg && (
        <p className="text-sm text-red-600 dark:text-red-400 font-medium animate-fade-in">⚠ {errorMsg}</p>
      )}

      {/* Result */}
      {state === 'done' && resultUrl && (
        <div className="rounded-2xl border border-rose-200 dark:border-rose-800/60 bg-rose-50 dark:bg-rose-950/20 p-5 animate-slide-up space-y-3">
          <h3 className="text-sm font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider">
            {t('jpg_to_pdf_result_title')}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {images.length} {t('jpg_to_pdf_images_count')}
          </p>
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-700 px-5 py-3 text-sm font-bold text-white shadow-md transition-all"
          >
            <Download className="h-4 w-4" />
            {t('jpg_to_pdf_download')}
          </button>
        </div>
      )}
    </div>
  );
}