'use client';

import { useSession } from '@/hooks/auth/useSession';
import { useSidebar } from '@/hooks/sidebar/useSidebar';
import { useRoutes } from '@/hooks/useRoutes';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { VscLayoutSidebarLeft } from 'react-icons/vsc';
import LogoutConfirm from '../LogoutConfirm';
import BoxLinkItems from './BoxLinkItems';
import { useGetOwnUser } from '@/hooks/auth/useGetOwnUser';

const Sidebar = () => {
  const { isOpenSidebar, toggleSidebar } = useSidebar();
  const { session } = useSession();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { router, isOpenModal, handleToggleModal } = useRoutes();
  const { data } = useGetOwnUser();
  const username = data
    ? data?.user.username.charAt(0).toUpperCase() + data?.user.username.slice(1)
    : 'Guest';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        toggleSidebar();
      }
    };

    if (isOpenSidebar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenSidebar, toggleSidebar]);

  return (
    <>
      <AnimatePresence>
        {isOpenSidebar && (
          <motion.aside
            ref={sidebarRef}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 top-0 z-50 h-full w-64 bg-gray-800 shadow-lg"
          >
            <div className="h-full p-4 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Hi👋, {username}</h2>
                <VscLayoutSidebarLeft
                  onClick={toggleSidebar}
                  size={23}
                  className="cursor-pointer"
                />
              </div>

              <div className="flex h-full w-full flex-col justify-between">
                <ul className="mt-5 flex w-full flex-col gap-y-1">
                  <p className="font-medium">General</p>
                  {router.slice(0, 3).map((route) => (
                    <BoxLinkItems
                      key={route.label}
                      label={route.label}
                      active={route.active}
                      url={route.url}
                      icon={route.icon}
                      onClick={route.onClick}
                    />
                  ))}
                  {session && (
                    <div className="mt-5">
                      <p className="font-medium">Settings</p>
                      {router.slice(3, 5).map((route) => (
                        <BoxLinkItems
                          key={route.label}
                          label={route.label}
                          active={route.active}
                          url={route.url}
                          icon={route.icon}
                          onClick={route.onClick}
                        />
                      ))}
                    </div>
                  )}
                </ul>

                <footer className="mb-8">
                  <h2 className="text-xl font-bold">Resume Builder</h2>
                </footer>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <LogoutConfirm isOpen={isOpenModal} onClose={handleToggleModal} />
    </>
  );
};

export default Sidebar;
