'use client';

import { ErrorMessage, Field } from 'formik';
import clsx from 'clsx';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useState } from 'react';

interface InputProps {
  type: string;
  name: string;
  id?: string;
  label?: string;
  children?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  id,
  label,
  children,
  error,
  disabled,
  placeholder,
  autoComplete,
  className,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isTypeShowPassword = showPassword ? 'text' : 'password';

  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm">
          {label}
        </label>
      )}
      <div className="relative">
        <Field
          id={id}
          type={type == 'password' ? isTypeShowPassword : type}
          name={name}
          disabled={disabled}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={clsx(
            `disabled:hover:ring-secondary bg-secondary/10 mb-1 w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-sm focus:ring-1 disabled:hover:placeholder:text-gray-500`,
            disabled && 'opacity-55',
            error
              ? 'ring-rose-500 ring-offset-rose-500'
              : 'hover:ring-secondary focus:ring-secondary placeholder:text-gray-500 hover:placeholder:text-gray-400',
            className
          )}
        >
          {children}
        </Field>
        {type == 'password' && (
          <button
            onClick={() => setShowPassword!(!showPassword)}
            type="button"
            className="absolute right-3 top-[30%] text-neutral-400"
          >
            {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </button>
        )}
      </div>
      {error && (
        <ErrorMessage
          name={name}
          component={'div'}
          className="text-[11px] text-red-500"
        />
      )}
    </div>
  );
};

export default Input;
