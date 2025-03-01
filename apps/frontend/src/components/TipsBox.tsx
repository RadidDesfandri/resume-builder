import { IoClose } from 'react-icons/io5';
import { AiFillInfoCircle } from 'react-icons/ai';
import { cn } from '@/libs/utils';

interface TipsBoxProps {
  text: string;
  isOpen: boolean;
  onClose: () => void;
  highlightText?: string;
  onHighlightClick: () => void;
}

const TipsBox: React.FC<TipsBoxProps> = ({
  text,
  isOpen,
  onClose,
  highlightText,
  onHighlightClick,
}) => {
  const parts = text.split(highlightText!);

  return (
    <div
      className={cn(
        'w-full items-center justify-between rounded-md bg-blue-200/10 px-3 py-1 text-sm text-neutral-700 ring-1 md:text-base',
        isOpen ? 'flex' : 'hidden'
      )}
    >
      <div className="flex items-center gap-2">
        <AiFillInfoCircle className="text-blue-700" />
        <p className="text-gray-800">
          {parts[0]}
          <span
            className="cursor-pointer font-medium underline"
            onClick={onHighlightClick}
          >
            {highlightText}
          </span>
          {parts[1]}
        </p>
      </div>
      <IoClose onClick={onClose} className="cursor-pointer" />
    </div>
  );
};

export default TipsBox;
