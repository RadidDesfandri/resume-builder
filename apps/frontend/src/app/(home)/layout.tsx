import BreadCrumb from '@/components/BreadCrump';
import Header from '@/components/headers/Header';
import LayoutContainer from '@/components/layout/LayoutContainer';
import Sidebar from '@/components/sidebar/Sidebar';
import { SidebarProvider } from '@/hooks/sidebar/useSidebar';
import { TipsProvider } from '@/hooks/useTips';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <TipsProvider>
        <Sidebar />
        <Header />
        <LayoutContainer padded="large" className="bg-white py-6">
          <BreadCrumb />
          <main className="h-full w-full pt-5">{children}</main>
        </LayoutContainer>
      </TipsProvider>
    </SidebarProvider>
  );
}
