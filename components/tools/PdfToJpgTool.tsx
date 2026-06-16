'use client';

import { useCallback, useState } from 'react';
import { Download, Images, RefreshCw, Package } from 'lucide-react';
import { useI18n } from '@/i18n/context';
import PdfDropzone from '@/components/PdfDropzone';

type ProcessState = 'idle' | 'processing' | 'done' | 'error';

interface PageResult {
  dataUrl: string;
  pageNumber: number;
  width: number;
  height: number;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/*
 * PDF.js worker configuration for Next.js 14 static export:
 *
 * We load pdfjs-dist via dynamic import() for code splitting (~3MB).
 * The worker is pointed at the CDN matching the installed package version.
 * This avoids the Next.js worker bundling complexity entirely and is the
 * recommended approach for static/client-side deployments.
 *
 * We use the standard 'pdfjs-dist' entry (not /legacy/) since we target
 * pdfjs-dist v4.x which exports ESM directly from the package root.
 */
const RENDER_SCALE = 2; // 2× = ~144dpi output

export default function PdfToJpgTool() {
  const { t } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<ProcessState>('idle');
  const [pages, setPages] = useState<PageResult[]>([]);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFile = useCallback((f: File) => {
    setFile(f);
    setPages([]);
    setState('idle');
    setErrorMsg(null);
    setProgress(null);
  }, []);

  const handleClear = () => {
    setFile(null);
    setPages([]);
    setState('idle');
    setErrorMsg(null);
    setProgress(null);
  };

  const extract = useCallback(async () => {
    if (!file) {
      setErrorMsg(t('pdf_to_jpg_error_empty'));
      return;
    }
    setState('processing');
    setErrorMsg(null);
    setPages([]);

    try {
      /*
       * Dynamic import of pdfjs-dist v4.x.
       * v4.x exports from the package root — no /legacy/ subpath needed.
       * The GlobalWorkerOptions.workerSrc is set to the matching CDN URL
       * to avoid bundler worker resolution issues in Next.js.
       */
      const pdfjsLib = await import('pdfjs-dist');

      // Set worker src to CDN version matching the installed package
      // This is safe because we control the version in package.json (^4.4.168)
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();

      // getDocument accepts ArrayBuffer directly in v4.x
      const loadingTask = pdfjsLib.getDocument({
        data: new Uint8Array(arrayBuffer),
        // Disable range requests — we already have the full buffer
        disableRange: true,
        disableStream: true,
      });

      const pdfDocument = await loadingTask.promise;
      const totalPages = pdfDocument.numPages;

      const results: PageResult[] = [];

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        setProgress({ current: pageNum, total: totalPages });

        const page = await pdfDocument.getPage(pageNum);
        const viewport = page.getViewport({ scale: RENDER_SCALE });

        const canvas = document.createElement('canvas');
        canvas.width = Math.round(viewport.width);
        canvas.height = Math.round(viewport.height);
        const ctx = canvas.getContext('2d');

        if (!ctx) throw new Error('Canvas 2D context unavailable');

        // White background — PDFs may have no explicit background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({ canvasContext: ctx as CanvasRenderingContext2D, viewport }).promise;

        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        results.push({
          dataUrl,
          pageNumber: pageNum,
          width: canvas.width,
          height: canvas.height,
        });

        // Yield to the browser between pages to avoid UI freeze on large PDFs
        await new Promise<void>((r) => setTimeout(r, 0));
      }

      setPages(results);
      setState('done');
      setProgress(null);
    } catch (err) {
      const message = err instanceof Error ? err.message.toLowerCase() : '';
      let errorText: string;
      if (message.includes('password')) {
        errorText = 'This PDF is password-protected. Remove the password first, then try again.';
      } else if (message.includes('invalid pdf') || message.includes('missing pdf')) {
        errorText = 'This file does not appear to be a valid PDF.';
      } else {
        errorText = t('pdf_to_jpg_error_process');
      }
      setErrorMsg(errorText);
      setState('error');
      setProgress(null);
    }
  }, [file, t]);

  const downloadPage = (page: PageResult) => {
    const a = document.createElement('a');
    a.href = page.dataUrl;
    a.download = `page-${String(page.pageNumber).padStart(3, '0')}.jpg`;
    a.click();
  };

  const downloadAll = async () => {
    if (pages.length === 0) return;

    try {
      // JSZip loaded only when actually downloading all pages
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();

      for (const page of pages) {
        const base64 = page.dataUrl.split(',')[1];
        zip.file(
          `page-${String(page.pageNumber).padStart(3, '0')}.jpg`,
          base64,
          { base64: true }
        );
      }

      const blob = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 },
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cozuro-pdf-pages.zip';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setErrorMsg('Failed to create ZIP. Try downloading pages individually.');
    }
  };

  const isProcessing = state === 'processing';

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <PdfDropzone
        onFile={handleFile}
        uploadLabel={t('pdf_to_jpg_upload')}
        uploadSubLabel={t('pdf_to_jpg_upload_sub')}
        currentFile={file}
        onClear={handleClear}
        disabled={isProcessing}
        accentColor="emerald"
      />

      {/* Extract button */}
      {file && state !== 'done' && (
        <button
          onClick={extract}
          disabled={isProcessing}
          className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              {progress
                ? `${t('pdf_to_jpg_progress')} ${progress.current} ${t('pdf_to_jpg_of')} ${progress.total}…`
                : t('pdf_to_jpg_processing')}
            </>
          ) : (
            <>
              <Images className="h-4 w-4" />
              {t('pdf_to_jpg_convert')}
            </>
          )}
        </button>
      )}

      {/* Progress bar */}
      {isProcessing && progress && (
        <div className="space-y-1.5 animate-fade-in">
          <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
          <p className="text-xs text-center text-slate-400 dark:text-slate-500">
            {Math.round((progress.current / progress.total) * 100)}%
          </p>
        </div>
      )}

      {/* Error */}
      {errorMsg && (
        <p className="text-sm text-red-600 dark:text-red-400 font-medium animate-fade-in">
          ⚠ {errorMsg}
        </p>
      )}

      {/* Results */}
      {state === 'done' && pages.length > 0 && (
        <div className="space-y-4 animate-slide-up">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
              {t('pdf_to_jpg_result_title')}
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {pages.length} {t('pdf_to_jpg_pages_extracted')}
            </span>
          </div>

          {/* Download all as ZIP */}
          <button
            onClick={downloadAll}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-md transition-all"
          >
            <Package className="h-4 w-4" />
            {t('pdf_to_jpg_download_all')}
          </button>

          {/* Individual pages grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {pages.map((page) => (
              <div
                key={page.pageNumber}
                className="group relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={page.dataUrl}
                  alt={`Page ${page.pageNumber}`}
                  className="w-full aspect-[3/4] object-cover object-top bg-slate-100 dark:bg-slate-800"
                />
                <div className="p-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    {t('pdf_to_jpg_page')} {page.pageNumber}
                  </span>
                  <button
                    onClick={() => downloadPage(page)}
                    className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    <Download className="h-3 w-3" />
                    {t('pdf_to_jpg_download_page')}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Reset */}
          <button
            onClick={handleClear}
            className="w-full text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors py-1"
          >
            {t('tool_change_file')}
          </button>
        </div>
      )}
    </div>
  );
}
