'use client';

import { useCallback, useState } from 'react';
import { Download, ImageDown, RefreshCw } from 'lucide-react';
import { useI18n } from '@/i18n/context';
import FileDropzone from '@/components/FileDropzone';

type ProcessState = 'idle' | 'processing' | 'done' | 'error';

interface Result {
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
  fileName: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function savings(orig: number, comp: number): string {
  const pct = Math.round(((orig - comp) / orig) * 100);
  return `${pct}%`;
}

export default function ImageCompressorTool() {
  const { t } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(75);
  const [state, setState] = useState<ProcessState>('idle');
  const [result, setResult] = useState<Result | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFile = useCallback((f: File) => {
    setFile(f);
    setResult(null);
    setState('idle');
    setErrorMsg(null);
  }, []);

  const handleClear = () => {
    setFile(null);
    setResult(null);
    setState('idle');
    setErrorMsg(null);
  };

  const compress = useCallback(async () => {
    if (!file) {
      setErrorMsg(t('tool_error_empty'));
      return;
    }
    setState('processing');
    setErrorMsg(null);

    try {
      const bitmap = await createImageBitmap(file);
      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context unavailable');
      ctx.drawImage(bitmap, 0, 0);
      bitmap.close();

      const mimeType =
        file.type === 'image/png' ? 'image/png' : 'image/jpeg';
      const qualityValue = quality / 100;

      const dataUrl = canvas.toDataURL(mimeType, qualityValue);
      // Calculate compressed size from base64
      const base64 = dataUrl.split(',')[1];
      const compressedSize = Math.round((base64.length * 3) / 4);

      const nameParts = file.name.split('.');
      const ext = mimeType === 'image/png' ? 'png' : 'jpg';
      nameParts[nameParts.length - 1] = ext;
      const fileName = nameParts.join('.');

      setResult({
        dataUrl,
        originalSize: file.size,
        compressedSize,
        fileName,
      });
      setState('done');
    } catch {
      setErrorMsg(t('tool_error_process'));
      setState('error');
    }
  }, [file, quality, t]);

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.dataUrl;
    a.download = `compressed_${result.fileName}`;
    a.click();
  };

  const isProcessing = state === 'processing';

  return (
    <div className="space-y-6">
      {/* Drop zone */}
      <FileDropzone
        onFile={handleFile}
        uploadLabel={t('compressor_upload')}
        uploadSubLabel={t('compressor_upload_sub')}
        currentFile={file}
        onClear={handleClear}
        disabled={isProcessing}
      />

      {/* Quality slider */}
      {file && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t('compressor_quality')}
            </label>
            <span className="text-sm font-bold text-sky-600 dark:text-sky-400 tabular-nums">
              {quality}%
            </span>
          </div>
          <div className="relative">
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              disabled={isProcessing}
              className="w-full h-2 rounded-full appearance-none cursor-pointer accent-sky-500 bg-slate-200 dark:bg-slate-700 disabled:opacity-50"
            />
          </div>
          <div className="flex justify-between mt-1.5 text-xs text-slate-400">
            <span>{t('compressor_quality_low')}</span>
            <span>{t('compressor_quality_high')}</span>
          </div>
        </div>
      )}

      {/* Action button */}
      {file && (
        <button
          onClick={compress}
          disabled={isProcessing}
          className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              {t('compressor_processing')}
            </>
          ) : (
            <>
              <ImageDown className="h-4 w-4" />
              {t('compressor_compress')}
            </>
          )}
        </button>
      )}

      {/* Error */}
      {errorMsg && (
        <p className="text-sm text-red-600 dark:text-red-400 font-medium animate-fade-in">
          ⚠ {errorMsg}
        </p>
      )}

      {/* Result */}
      {result && state === 'done' && (
        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/20 p-5 animate-slide-up space-y-4">
          <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
            {t('compressor_result_title')}
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900/40 p-3">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{t('compressor_original')}</p>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {formatSize(result.originalSize)}
              </p>
            </div>
            <div className="text-center rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900/40 p-3">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{t('compressor_compressed')}</p>
              <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                {formatSize(result.compressedSize)}
              </p>
            </div>
            <div className="text-center rounded-xl bg-emerald-600 p-3">
              <p className="text-xs text-emerald-100 mb-1">{t('compressor_saved')}</p>
              <p className="text-sm font-bold text-white">
                {savings(result.originalSize, result.compressedSize)}
              </p>
            </div>
          </div>

          {/* Preview */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={result.dataUrl}
            alt="Compressed preview"
            className="w-full max-h-48 rounded-xl object-contain bg-slate-100 dark:bg-slate-800"
          />

          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-md transition-all"
          >
            <Download className="h-4 w-4" />
            {t('compressor_download')}
          </button>
        </div>
      )}
    </div>
  );
}
