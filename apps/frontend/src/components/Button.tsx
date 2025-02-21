'use client';

import clsx from 'clsx';

interface ButtonProps {
  type: 'submit' | 'button' | 'reset' | undefined;
  children: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  secondary?: boolean;
  roundedFull?: boolean;
  className?: string;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  disabled,
  danger,
  fullWidth,
  onClick,
  secondary,
  roundedFull,
  className,
  outline,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        `text-hitam flex items-center justify-center px-3 py-3 transition-all duration-300 active:scale-95 disabled:hover:bg-none disabled:active:scale-100 md:px-6`,
        fullWidth && 'w-full',
        roundedFull ? 'rounded-full' : 'rounded-lg',
        disabled &&
          'hover:bg-secondDarkBlue/40 cursor-default opacity-50 hover:text-white/60',
        secondary &&
          'hover:bg-secondDarkBlue/30 bg-secondDarkBlue/40 transition-all duration-300 hover:text-white/60',
        danger &&
          'bg-red-600 text-white transition-all duration-300 hover:bg-red-700',
        outline && 'ring-secondDarkBlue/40 ring-1 ring-inset',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
