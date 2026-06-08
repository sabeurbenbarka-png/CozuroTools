'use client';

import { useCallback, useRef, useState } from 'react';
import { Upload, X, FileImage } from 'lucide-react';
import { useI18n } from '@/i18n/context';

const MAX_SIZE_BYTES = 20 * 1024 * 1024; // 20MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

interface FileDropzoneProps {
  onFile: (file: File) => void;
  uploadLabel: string;
  uploadSubLabel: string;
  currentFile?: File | null;
  onClear?: () => void;
  disabled?: boolean;
}

export default function FileDropzone({
  onFile,
  uploadLabel,
  uploadSubLabel,
  currentFile,
  onClear,
  disabled = false,
}: FileDropzoneProps) {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndSet = useCallback(
    (file: File) => {
      setError(null);
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError(t('tool_error_type'));
        return;
      }
      if (file.size > MAX_SIZE_BYTES) {
        setError(t('tool_error_size'));
        return;
      }
      onFile(file);
    },
    [onFile, t]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      const file = e.dataTransfer.files[0];
      if (file) validateAndSet(file);
    },
    [disabled, validateAndSet]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSet(file);
    e.target.value = '';
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  if (currentFile) {
    return (
      <div className="relative rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-900/40">
            <FileImage className="h-6 w-6 text-sky-600 dark:text-sky-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
              {currentFile.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t('tool_file_selected')} · {formatSize(currentFile.size)}
            </p>
          </div>
          {onClear && (
            <button
              onClick={onClear}
              disabled={disabled}
              className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all disabled:opacity-40"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        disabled={disabled}
        className={`w-full rounded-2xl border-2 border-dashed transition-all duration-200 p-10 text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed ${
          isDragging
            ? 'border-sky-400 bg-sky-50 dark:bg-sky-950/30 scale-[1.01]'
            : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 hover:border-sky-400 hover:bg-sky-50/50 dark:hover:bg-sky-950/20 hover:scale-[1.005]'
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${
            isDragging ? 'bg-sky-100 dark:bg-sky-900/50' : 'bg-slate-200 dark:bg-slate-700'
          }`}>
            <Upload className={`h-7 w-7 transition-colors ${
              isDragging ? 'text-sky-600 dark:text-sky-400' : 'text-slate-500 dark:text-slate-400'
            }`} />
          </div>
          <div>
            <p className="text-base font-semibold text-slate-700 dark:text-slate-200">
              {isDragging ? t('tool_drop_active') : uploadLabel}
            </p>
            <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">{uploadSubLabel}</p>
          </div>
        </div>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="hidden"
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium animate-fade-in">
          ⚠ {error}
        </p>
      )}
    </div>
  );
}
