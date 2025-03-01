import { cn } from '@/libs/utils';
import React, { ChangeEvent } from 'react';

interface TextAreaProps {
  id: string;
  name?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  className?: string;
  error?: boolean;
  errorMessage?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  name,
  placeholder,
  label,
  required,
  className,
  error,
  onChange,
  value,
  onBlur,
  errorMessage,
}) => {
  return (
    <label htmlFor={id} className="flex flex-col">
      <span className="text-sm">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={cn(
          'small-scrollbar min-h-36 rounded-md border p-2 px-4 text-sm outline-none focus:ring-1',
          error && 'ring-1 ring-red-600',
          className
        )}
      />
      {error && <p className="text-xs text-red-500">{errorMessage}</p>}
    </label>
  );
};

export default TextArea;
