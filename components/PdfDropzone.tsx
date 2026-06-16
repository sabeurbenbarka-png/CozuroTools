'use client';

import { useCallback, useRef, useState } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import { useI18n } from '@/i18n/context';

const MAX_SIZE_BYTES = 50 * 1024 * 1024; // 50MB

interface PdfDropzoneProps {
  onFile: (file: File) => void;
  uploadLabel: string;
  uploadSubLabel: string;
  currentFile?: File | null;
  onClear?: () => void;
  disabled?: boolean;
  /** Override accent color class for drag-over state (default: amber) */
  accentColor?: 'amber' | 'emerald' | 'indigo';
}

export default function PdfDropzone({
  onFile,
  uploadLabel,
  uploadSubLabel,
  currentFile,
  onClear,
  disabled = false,
  accentColor = 'amber',
}: PdfDropzoneProps) {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Accent color classes derived from prop — avoids Tailwind purge issues
  const accentClasses = {
    amber: {
      drag: 'border-amber-400 bg-amber-50 dark:bg-amber-950/30',
      hover: 'hover:border-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-950/20',
      icon: 'bg-amber-100 dark:bg-amber-900/50',
      iconColor: 'text-amber-600 dark:text-amber-400',
      file: 'bg-amber-100 dark:bg-amber-900/40',
      fileIcon: 'text-amber-600 dark:text-amber-400',
      ring: 'focus:ring-amber-500',
    },
    emerald: {
      drag: 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30',
      hover: 'hover:border-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20',
      icon: 'bg-emerald-100 dark:bg-emerald-900/50',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      file: 'bg-emerald-100 dark:bg-emerald-900/40',
      fileIcon: 'text-emerald-600 dark:text-emerald-400',
      ring: 'focus:ring-emerald-500',
    },
    indigo: {
      drag: 'border-indigo-400 bg-indigo-50 dark:bg-indigo-950/30',
      hover: 'hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20',
      icon: 'bg-indigo-100 dark:bg-indigo-900/50',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      file: 'bg-indigo-100 dark:bg-indigo-900/40',
      fileIcon: 'text-indigo-600 dark:text-indigo-400',
      ring: 'focus:ring-indigo-500',
    },
  }[accentColor];

  const validateAndSet = useCallback(
    (file: File) => {
      setError(null);
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        // Use generic tool_error_type equivalent — we have pdf-specific keys in each tool
        setError(t('pdf_compressor_error_type'));
        return;
      }
      if (file.size > MAX_SIZE_BYTES) {
        setError(t('pdf_compressor_error_size'));
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
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${accentClasses.file}`}>
            <FileText className={`h-6 w-6 ${accentClasses.fileIcon}`} />
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
        className={`w-full rounded-2xl border-2 border-dashed transition-all duration-200 p-10 text-center cursor-pointer focus:outline-none focus:ring-2 ${accentClasses.ring} focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed ${
          isDragging
            ? `${accentClasses.drag} scale-[1.01]`
            : `border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 ${accentClasses.hover} hover:scale-[1.005]`
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${
            isDragging ? accentClasses.icon : 'bg-slate-200 dark:bg-slate-700'
          }`}>
            <Upload className={`h-7 w-7 transition-colors ${
              isDragging ? accentClasses.iconColor : 'text-slate-500 dark:text-slate-400'
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
        accept="application/pdf,.pdf"
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
