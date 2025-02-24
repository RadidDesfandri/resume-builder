'use client';

import { useSidebar } from '@/hooks/sidebar/useSidebar';
import Link from 'next/link';
import { VscLayoutSidebarLeft } from 'react-icons/vsc';
import Button from '../Button';
import HeaderSkeleton from './HeaderSkeleton';
import Avatar from '../Avatar';
import { useGetOwnUser } from '@/hooks/auth/useGetOwnUser';
import { useSession } from '@/hooks/auth/useSession';

const Header = () => {
  const { toggleSidebar } = useSidebar();
  const { session, isLoading } = useSession();
  const { data } = useGetOwnUser();

  if (isLoading) return <HeaderSkeleton />;

  return (
    <header className="bg-darkblue/95 flex w-full items-center justify-between px-5 py-3 text-white md:px-24">
      <VscLayoutSidebarLeft
        onClick={toggleSidebar}
        size={25}
        className="cursor-pointer"
      />
      {/* <Link href="/">Logo</Link> */}
      {session ? (
        <Avatar user={data?.user.avatar} />
      ) : (
        <Button type="button" secondary roundedFull className="font-medium">
          <Link href="/login">Create account</Link>
        </Button>
      )}
    </header>
  );
};

export default Header;
