import clsx from 'clsx';
import { ReactNode } from 'react';

interface LayoutContainerProps {
  children: ReactNode;
  className?: string;
  padded?: boolean;
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
        padded && 'px-5 md:px-14 lg:px-16 xl:px-24',
        center && 'flex items-center justify-center',
        className
      )}
    >
      {children}
    </main>
  );
};

export default LayoutContainer;
