'use client';

import { cn } from '@/libs/utils';
import React, {
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  useRef,
} from 'react';
import { IoIosClose } from 'react-icons/io';
import SpinnerLoading from '../loading/SpinnerLoading';

interface AutoCompleteInputProps {
  suggestions: string[];
  onSelect: (selected: string[]) => void;
  error?: boolean;
  errorMessage?: string;
}

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  suggestions,
  onSelect,
  error,
  errorMessage,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const suggestionRef = useRef<HTMLInputElement>(null);
  const liRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node) &&
        liRef.current &&
        !liRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    if (showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSuggestions]);

  useEffect(() => {
    if (!inputValue) {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      const filtered = suggestions.filter(
        (s) =>
          s.toLowerCase().includes(inputValue.toLowerCase()) &&
          !selectedItems.includes(s)
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
      setHighlightedIndex(0);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [inputValue, selectedItems, suggestions]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelect = (suggestion: string) => {
    if (!selectedItems.includes(suggestion)) {
      const updatedItems = [...selectedItems, suggestion];
      setSelectedItems(updatedItems);
      onSelect(updatedItems);
    }
    setInputValue('');
    setShowSuggestions(false);
    setIsLoading(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      if (
        highlightedIndex >= 0 &&
        highlightedIndex < filteredSuggestions.length
      ) {
        handleSelect(filteredSuggestions[highlightedIndex]);
      } else if (inputValue.trim() && !selectedItems.includes(inputValue)) {
        handleSelect(inputValue);
      }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
    }
  };

  const handleRemove = (item: string) => {
    const updatedItems = selectedItems.filter((i) => i !== item);
    setSelectedItems(updatedItems);
    onSelect(updatedItems);
  };

  return (
    <div className="relative w-full">
      <div
        className={cn(
          'flex flex-wrap items-center gap-2 rounded-md border p-2',
          isFocused && 'ring-1',
          error && 'ring-1 ring-red-600'
        )}
      >
        {selectedItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 rounded border bg-blue-50 px-2 py-1 text-sm text-neutral-900"
          >
            {item}
            <button className="text-black" onClick={() => handleRemove(item)}>
              <IoIosClose size={15} />
            </button>
          </div>
        ))}
        <input
          type="text"
          ref={suggestionRef}
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={
            selectedItems.length > 0 ? '' : 'Type and press Enter or Tab to add'
          }
          className="min-w-[50px] flex-1 placeholder:text-sm placeholder:text-gray-400 focus:outline-none"
        />
      </div>
      {error && <p className="text-xs text-red-500">{errorMessage}</p>}
      {isLoading && (
        <div className="absolute z-10 mt-1 flex w-full items-center justify-center rounded-md border bg-white p-2 py-6 shadow-lg">
          <SpinnerLoading />
        </div>
      )}
      {showSuggestions &&
        filteredSuggestions.length > 0 &&
        inputValue.length > 0 &&
        !isLoading && (
          <ul
            ref={liRef}
            className="small-scrollbar absolute z-10 mt-1 max-h-44 w-full overflow-y-auto rounded-md border bg-white shadow-lg"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className={cn(
                  'cursor-pointer p-2 text-sm',
                  highlightedIndex === index
                    ? 'bg-blue-300 text-white'
                    : 'hover:bg-gray-200'
                )}
                onClick={() => handleSelect(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
};

export default AutoCompleteInput;
