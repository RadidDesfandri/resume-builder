'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

interface ClientQueryProviderProps {
  children: ReactNode;
}

const ClientQueryProvider: React.FC<ClientQueryProviderProps> = ({
  children,
}) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ClientQueryProvider;
