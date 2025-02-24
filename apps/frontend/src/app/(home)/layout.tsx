import Header from '@/components/headers/Header';
import Sidebar from '@/components/sidebar/Sidebar';
import { SidebarProvider } from '@/hooks/sidebar/useSidebar';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <main>
        <Sidebar />
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
}
