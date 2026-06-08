'use client';

import { useCallback, useState } from 'react';
import { Download, RefreshCw } from 'lucide-react';
import { useI18n } from '@/i18n/context';
import FileDropzone from '@/components/FileDropzone';

type OutputFormat = 'image/webp' | 'image/jpeg' | 'image/png';
type ProcessState = 'idle' | 'processing' | 'done' | 'error';

interface Result {
  dataUrl: string;
  outputSize: number;
  fileName: string;
  format: OutputFormat;
}

const FORMAT_OPTIONS: { value: OutputFormat; label: string; ext: string }[] = [
  { value: 'image/webp', label: 'WEBP', ext: 'webp' },
  { value: 'image/jpeg', label: 'JPG', ext: 'jpg' },
  { value: 'image/png', label: 'PNG', ext: 'png' },
];

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function WebpConverterTool() {
  const { t } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('image/webp');
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

  const convert = useCallback(async () => {
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

      // خلفية بيضاء لصيغة JPG فقط لأنها لا تدعم الشفافية
      if (outputFormat === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // رسم الصورة الأصلية على الكانفاس
      ctx.drawImage(bitmap, 0, 0);
      bitmap.close();

      // --- 🚀 ميزة إزالة الخلفية البيضاء تلقائياً لصيغ PNG و WEBP ---
      if (outputFormat === 'image/png' || outputFormat === 'image/webp') {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // المرور على كل بكسل (كل بكسل يتكون من 4 قيم: أحمر، أخضر، أزرق، والشفافية)
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];     // Red
          const g = data[i + 1]; // Green
          const b = data[i + 2]; // Blue

          // إذا كان اللون قريباً جداً من الأبيض الناصع (أعلى من درجة 240)
          if (r > 240 && g > 240 && b > 240) {
            data[i + 3] = 0; // جعل البكسل شفافاً تماماً (Alpha = 0)
          }
        }
        // إعادة رسم الصورة بعد تفريغ الخلفية البيضاء
        ctx.putImageData(imageData, 0, 0);
      }
      // -------------------------------------------------------------

      const quality = outputFormat === 'image/png' ? undefined : 0.9;
      const dataUrl = canvas.toDataURL(outputFormat, quality);
      const base64 = dataUrl.split(',')[1];
      const outputSize = Math.round((base64.length * 3) / 4);

      const formatOption = FORMAT_OPTIONS.find((f) => f.value === outputFormat)!;
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      const fileName = `${baseName}.${formatOption.ext}`;

      setResult({ dataUrl, outputSize, fileName, format: outputFormat });
      setState('done');
    } catch {
      setErrorMsg(t('tool_error_process'));
      setState('error');
    }
  }, [file, outputFormat, t]);

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.dataUrl;
    a.download = `converted_${result.fileName}`;
    a.click();
  };

  const isProcessing = state === 'processing';

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <FileDropzone
        onFile={handleFile}
        uploadLabel={t('webp_upload')}
        uploadSubLabel={t('webp_upload_sub')}
        currentFile={file}
        onClear={handleClear}
        disabled={isProcessing}
      />

      {/* Format selector */}
      {file && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 animate-slide-up">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            {t('webp_output_format')}
          </label>
          <div className="grid grid-cols-3 gap-3">
            {FORMAT_OPTIONS.map((fmt) => (
              <button
                key={fmt.value}
                onClick={() => setOutputFormat(fmt.value)}
                disabled={isProcessing}
                className={`rounded-xl border-2 py-3 text-sm font-bold transition-all duration-150 disabled:opacity-50 ${
                  outputFormat === fmt.value
                    ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 shadow-md shadow-violet-500/10'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-violet-300 hover:bg-violet-50/50 dark:hover:bg-violet-950/10'
                }`}
              >
                {fmt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Convert button */}
      {file && (
        <button
          onClick={convert}
          disabled={isProcessing}
          className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              {t('webp_processing')}
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              {t('webp_convert')}
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
        <div className="rounded-2xl border border-violet-200 dark:border-violet-800/60 bg-violet-50 dark:bg-violet-950/20 p-5 animate-slide-up space-y-4">
          <h3 className="text-sm font-bold text-violet-800 dark:text-violet-300 uppercase tracking-wider">
            {t('webp_result_title')}
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="text-center rounded-xl bg-white dark:bg-slate-900 border border-violet-100 dark:border-violet-900/40 p-3">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{t('webp_output_size')}</p>
              <p className="text-sm font-bold text-violet-700 dark:text-violet-400">
                {formatSize(result.outputSize)}
              </p>
            </div>
            <div className="text-center rounded-xl bg-white dark:bg-slate-900 border border-violet-100 dark:border-violet-900/40 p-3">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Format</p>
              <p className="text-sm font-bold text-violet-700 dark:text-violet-400 uppercase">
                {FORMAT_OPTIONS.find((f) => f.value === result.format)?.label}
              </p>
            </div>
          </div>

          {/* Preview */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={result.dataUrl}
            alt="Converted preview"
            className="w-full max-h-48 rounded-xl object-contain bg-slate-100 dark:bg-slate-800"
          />

          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 px-5 py-3 text-sm font-bold text-white shadow-md transition-all"
          >
            <Download className="h-4 w-4" />
            {t('webp_download')}
          </button>
        </div>
      )}
    </div>
  );
}