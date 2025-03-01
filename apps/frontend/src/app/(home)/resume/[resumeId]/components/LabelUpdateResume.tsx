import { ReactNode } from 'react';

interface LabelUpdateResumeProps {
  children: ReactNode;
  required?: boolean;
}

const LabelUpdateResume: React.FC<LabelUpdateResumeProps> = ({
  children,
  required,
}) => {
  return (
    <span className="text-sm">
      {children} {required && <span className="text-red-600">*</span>}
    </span>
  );
};

export default LabelUpdateResume;
