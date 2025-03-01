'use client';

import { cn } from '@/libs/utils';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { FaRegFolder } from 'react-icons/fa';
import { FiInbox, FiUser } from 'react-icons/fi';
import { RiHome9Line } from 'react-icons/ri';
import { TbNotes } from 'react-icons/tb';

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent: boolean;
  icon: React.ReactNode;
  isEditable: boolean;
}

const getIconForSegment = (segment: string) => {
  switch (segment.toLowerCase()) {
    case 'resume':
      return <TbNotes className="h-4 w-4" />;
    case 'cover-letter':
      return <FiInbox className="h-4 w-4" />;
    case 'account':
      return <FiUser className="h-4 w-4" />;
    default:
      return <FaRegFolder className="h-4 w-4" />;
  }
};

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const pathSegments = pathname.split('/').filter(Boolean);
  const resumeId = useSearchParams().get('id');

  const [editing, setEditing] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>('');

  const breadcrumbs: BreadcrumbItem[] = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    return {
      label: decodeURIComponent(segment)
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase()),
      href,
      isCurrent: index === pathSegments.length - 1,
      icon: getIconForSegment(segment),
      isEditable: pathSegments[index - 1] === 'resume',
    };
  });

  const handleEdit = (breadcrumb: BreadcrumbItem) => {
    setEditing(breadcrumb.href);
    setEditedText(breadcrumb.label);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(event.target.value);
  };

  const handleBlurOrSubmit = (breadcrumb: BreadcrumbItem) => {
    if (editedText.trim() === '' || editedText === breadcrumb.label) {
      setEditing(null);
      return;
    }

    const newSegment = editedText.trim().replace(/\s+/g, '-').toLowerCase();
    const basePath = pathname.split('/').slice(0, -1).join('/');
    const newPath = `${basePath}/${newSegment}${resumeId ? `?id=${resumeId}` : ''}`;

    router.push(newPath);
    setEditing(null);
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      <Link href="/">
        <span
          className={cn(
            'flex items-center space-x-1 hover:text-black',
            pathname === '/' && 'font-medium text-black'
          )}
        >
          <RiHome9Line className="h-4 w-4" />
          <span>Home</span>
        </span>
      </Link>
      {breadcrumbs.map((breadcrumb) => (
        <React.Fragment key={breadcrumb.href}>
          <span>/</span>
          {breadcrumb.isCurrent ? (
            editing === breadcrumb.href ? (
              <div className="flex items-center gap-1 text-black">
                <span>{breadcrumb.icon}</span>
                <input
                  className="text-black outline-none"
                  value={editedText}
                  onChange={handleChange}
                  onBlur={() => handleBlurOrSubmit(breadcrumb)}
                  autoFocus
                  onKeyDown={(e) =>
                    e.key === 'Enter' && handleBlurOrSubmit(breadcrumb)
                  }
                />
              </div>
            ) : (
              <span
                className={`flex items-center gap-1 ${
                  breadcrumb.isCurrent
                    ? 'font-medium text-black'
                    : 'hover:text-black'
                }`}
                onDoubleClick={() =>
                  breadcrumb.isEditable && handleEdit(breadcrumb)
                }
              >
                {breadcrumb.icon}
                {breadcrumb.label}
              </span>
            )
          ) : (
            <Link
              href={breadcrumb.href}
              className="flex items-center space-x-1 hover:text-black"
            >
              {breadcrumb.icon}
              {breadcrumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
