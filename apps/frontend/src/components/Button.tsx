'use client';

import clsx from 'clsx';

interface ButtonProps {
  type?: 'submit' | 'button' | 'reset' | undefined;
  children: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  fullWidth?: boolean;
  onClick?: (e: never) => void;
  secondary?: boolean;
  roundedFull?: boolean;
  className?: string;
  outline?: boolean;
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  disabled,
  danger,
  fullWidth,
  onClick,
  secondary,
  roundedFull,
  className,
  outline,
  size = 'default',
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        `flex items-center justify-center transition-all duration-300 active:scale-95 disabled:hover:bg-none disabled:active:scale-100`,
        fullWidth && 'w-full',
        size === 'default' && 'h-9 px-4 py-2 md:px-6',
        size === 'sm' && 'h-8 px-3 text-xs',
        size === 'lg' && 'h-10 px-8',
        size === 'icon' && 'p-1',
        roundedFull ? 'rounded-full' : 'rounded-lg',
        disabled && 'cursor-default opacity-50',
        secondary &&
          'hover:bg-secondDarkBlue/30 bg-secondDarkBlue/40 transition-all duration-300',
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
