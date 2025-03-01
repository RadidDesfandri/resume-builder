'use client';

import { useGetOwnUser } from '@/hooks/auth/useGetOwnUser';
import { useSession } from '@/hooks/auth/useSession';
import { useSidebar } from '@/hooks/sidebar/useSidebar';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useRoutes } from '@/hooks/useRoutes';
import { upperCaseFirstLetter } from '@/libs/uppareCaseFirstLetter';
import { AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { VscLayoutSidebarLeft } from 'react-icons/vsc';
import LogoutConfirm from '../LogoutConfirm';
import SlideIn from '../SlideIn';
import BoxLinkItems from './BoxLinkItems';

const Sidebar = () => {
  const { isOpenSidebar, toggleSidebar } = useSidebar();
  const { session } = useSession();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { router, isOpenModal, handleToggleModal } = useRoutes();
  const { data } = useGetOwnUser();
  const username = data ? upperCaseFirstLetter(data?.user.username) : 'Guest';

  useClickOutside(sidebarRef, toggleSidebar, isOpenSidebar);

  return (
    <>
      <AnimatePresence>
        {isOpenSidebar && (
          <SlideIn ref={sidebarRef}>
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
          </SlideIn>
        )}
      </AnimatePresence>

      <LogoutConfirm isOpen={isOpenModal} onClose={handleToggleModal} />
    </>
  );
};

export default Sidebar;
