import clsx from 'clsx';
import { ReactNode } from 'react';

interface LayoutContainerProps {
  children: ReactNode;
  className?: string;
  padded?: 'small' | 'large';
  center?: boolean;
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({
  children,
  className,
  padded,
  center,
}) => {
  return (
    <main
      className={clsx(
        'bg-primary mx-auto h-full w-full max-w-screen-2xl',
        padded == 'large' && 'px-5 md:px-14 lg:px-16 xl:px-24',
        padded == 'small' && 'px-5 md:px-9',
        center && 'flex items-center justify-center',
        className
      )}
    >
      {children}
    </main>
  );
};

export default LayoutContainer;
