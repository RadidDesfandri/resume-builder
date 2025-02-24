'use client';

import { useSession } from '@/hooks/auth/useSession';
import { cn } from '@/libs/utils';
import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons/lib';

interface BoxLinkItemsProps {
  label: string;
  url: string;
  icon: IconType;
  active?: boolean;
  onClick: () => void;
}

const BoxLinkItems: React.FC<BoxLinkItemsProps> = ({
  label,
  url,
  icon: Icon,
  active,
  onClick,
}) => {
  const { session } = useSession();

  return (
    <Link
      href={url}
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-4 rounded p-2 px-3 text-sm hover:bg-gray-700',
        active && 'bg-gray-700/80 font-medium',
        !session && url !== '/' && 'hidden'
      )}
    >
      <Icon size={19} /> {label}
    </Link>
  );
};

export default BoxLinkItems;
