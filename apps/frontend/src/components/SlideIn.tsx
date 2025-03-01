import { cn } from '@/libs/utils';
import { motion } from 'framer-motion';
import React, { forwardRef } from 'react';

interface SlideInProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  position?: 'left' | 'right';
  width?: 'small' | 'medium' | 'large';
}

const SlideIn = forwardRef<HTMLDivElement, SlideInProps>(
  ({ children, position = 'left', width = 'small' }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={position === 'left' ? { x: '-100%' } : { x: '100%' }}
        animate={{ x: 0 }}
        exit={position === 'left' ? { x: '-100%' } : { x: '100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed top-0 z-50 h-full bg-gray-800 shadow-lg',
          position === 'left' && 'left-0',
          position === 'right' && 'right-0',
          width === 'small' && 'w-64',
          width === 'medium' && 'w-64 md:w-80',
          width === 'large' && 'w-80 md:w-[400px]'
        )}
      >
        {children}
      </motion.div>
    );
  }
);

SlideIn.displayName = 'SlideIn';

export default SlideIn;
