'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type TipsContextType = {
  isActiveTips: boolean;
  onCloseTips: () => void;
};

const TipsContext = createContext<TipsContextType | undefined>(undefined);

export const TipsProvider = ({ children }: { children: ReactNode }) => {
  const [isActiveTips, setIsActiveTips] = useState<boolean>(true);

  useEffect(() => {
    const storedState = sessionStorage.getItem('tipsOpen');
    setIsActiveTips(storedState ? storedState === 'true' : true);
  }, []);

  const onCloseTips = () => {
    setIsActiveTips(false);
    sessionStorage.setItem('tipsOpen', 'false');
  };

  return (
    <TipsContext.Provider value={{ isActiveTips, onCloseTips }}>
      {children}
    </TipsContext.Provider>
  );
};

export const useTips = () => {
  const context = useContext(TipsContext);
  if (!context) {
    throw new Error('useTips harus digunakan dalam TipsProvider');
  }
  return context;
};
