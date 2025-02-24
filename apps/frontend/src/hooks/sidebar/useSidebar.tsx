'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type SidebarContextType = {
  isOpenSidebar: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

  useEffect(() => {
    const storedState = localStorage.getItem('sidebarOpen');
    setIsOpenSidebar(storedState === 'true');
  }, []);

  const toggleSidebar = () => {
    const newState = !isOpenSidebar;
    setIsOpenSidebar(newState);
    localStorage.setItem('sidebarOpen', JSON.stringify(newState));
  };

  return (
    <SidebarContext.Provider value={{ isOpenSidebar, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar harus digunakan dalam SidebarProvider');
  }
  return context;
};
