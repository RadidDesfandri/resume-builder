import SlideIn from '@/components/SlideIn';
import { AnimatePresence } from 'framer-motion';
import React, { RefObject } from 'react';

interface TipsCreateResumeProps {
  isOpen: boolean;
  ref: RefObject<HTMLDivElement | null>;
}

const TipsCreateResume: React.FC<TipsCreateResumeProps> = ({ isOpen, ref }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <SlideIn ref={ref} position="right" width="large">
          <div className="p-4 text-white">NANTI DISINI ADALAH SEBUAH TIPS</div>
        </SlideIn>
      )}
    </AnimatePresence>
  );
};

export default TipsCreateResume;
