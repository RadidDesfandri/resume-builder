import { usePathname } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { CiLogout } from 'react-icons/ci';
import { FiInbox, FiUser } from 'react-icons/fi';
import { RiHome9Line } from 'react-icons/ri';
import { TbNotes } from 'react-icons/tb';
import { useSidebar } from './sidebar/useSidebar';

export const useRoutes = () => {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  const [isOpenModal, setisOpenModal] = useState(false);

  const handleToggleModal = useCallback(() => {
    setisOpenModal(!isOpenModal);
    toggleSidebar();
  }, [isOpenModal, toggleSidebar]);

  const router = useMemo(
    () => [
      {
        label: 'Home',
        url: '/',
        icon: RiHome9Line,
        active: pathname == '/',
        onClick: toggleSidebar,
      },
      {
        label: 'Resumes',
        url: '/resume',
        icon: TbNotes,
        active: pathname == '/resume',
        onClick: toggleSidebar,
      },
      {
        label: 'Cover letters',
        url: '/cover-letter',
        icon: FiInbox,
        active: pathname == '/cover-letter',
        onClick: toggleSidebar,
      },
      {
        label: 'Account',
        url: '/account',
        icon: FiUser,
        active: pathname == '/account',
        onClick: toggleSidebar,
      },
      {
        label: 'Logout',
        url: '#',
        icon: CiLogout,
        onClick: handleToggleModal,
      },
    ],
    [pathname, toggleSidebar, handleToggleModal]
  );
  return { router, isOpenModal, handleToggleModal };
};
