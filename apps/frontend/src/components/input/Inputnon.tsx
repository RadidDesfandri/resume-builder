'use client';

import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useState } from 'react';
import clsx from 'clsx';

interface InputProps {
  type: string;
  name: string;
  id?: string;
  label?: string;
  errorMessage?: string;
  disabled?: boolean;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
  value?: string;
  variant?: 'default' | 'gost';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Inputnon: React.FC<InputProps> = ({
  type,
  name,
  id,
  label,
  errorMessage,
  disabled,
  placeholder,
  autoComplete,
  className,
  value,
  onChange,
  onBlur,
  variant = 'default',
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div>
      {label && (
        <label htmlFor={id || name} className="mb-1 block text-sm">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id || name}
          type={inputType}
          name={name}
          disabled={disabled}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={clsx(
            `w-full rounded-lg outline-none transition-all duration-300 placeholder:text-sm focus:ring-1`,
            disabled && 'cursor-not-allowed opacity-55',
            errorMessage
              ? 'ring-rose-500 ring-offset-rose-500'
              : 'placeholder:text-gray-400',
            variant === 'gost' && 'border bg-transparent p-2 focus:ring-1',
            variant === 'default' &&
              'bg-secondDarkBlue/10 hover:ring-secondDarkBlue focus:ring-secondDarkBlue px-4 py-3',
            type === 'number' &&
              '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
            className
          )}
        />
        {type === 'password' && (
          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className="absolute right-3 top-[30%] text-neutral-400"
          >
            {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </button>
        )}
      </div>
      {errorMessage && (
        <div className="text-[11px] text-red-500">{errorMessage}</div>
      )}
    </div>
  );
};

export default Inputnon;
