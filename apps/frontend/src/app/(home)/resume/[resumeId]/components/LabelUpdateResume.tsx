import { cn } from '@/libs/utils';
import { ReactNode } from 'react';

interface LabelUpdateResumeProps {
  children: ReactNode;
  required?: boolean;
  size?: 'sm' | 'xs' | 'md';
  helperText?: boolean;
}

const LabelUpdateResume: React.FC<LabelUpdateResumeProps> = ({
  children,
  required,
  size = 'sm',
  helperText,
}) => {
  return (
    <span
      className={cn(
        size === 'sm' && 'text-sm',
        size === 'xs' && 'text-xs',
        size === 'md' && 'text-base',
        helperText && 'text-gray-700'
      )}
    >
      {children} {required && <span className="text-red-600">*</span>}
    </span>
  );
};

export default LabelUpdateResume;
