import { usePathname } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { CiLogout } from 'react-icons/ci';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineExplore } from 'react-icons/md';

export const useRoutes = () => {
  const pathname = usePathname();

  const [isOpenModal, setisOpenModal] = useState(false);

  const handleToggleModal = useCallback(() => {
    setisOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const router = useMemo(
    () => [
      {
        label: 'Home',
        href: '/dashboard',
        icon: IoHomeOutline,
        active: pathname === '/dashboard',
      },
      {
        label: 'Explore',
        href: '/dashboard/explore',
        icon: MdOutlineExplore,
        active: pathname === '/dashboard/explore',
      },
      {
        label: 'Settings',
        href: '/dashboard/settings',
        icon: IoSettingsOutline,
        active: pathname === '/dashboard/settings',
      },
      {
        label: 'Logout',
        href: '',
        icon: CiLogout,
        onClick: handleToggleModal,
      },
    ],
    [pathname, handleToggleModal]
  );
  return { router, isOpenModal, handleToggleModal };
};
