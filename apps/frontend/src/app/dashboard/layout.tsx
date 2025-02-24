import { AppSidebar } from '@/components/AppSidebar';
import LayoutContainer from '@/components/layout/LayoutContainer';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <LayoutContainer padded="small" className="bg-white">
          <SidebarTrigger className="block md:hidden" />
          <div>Header</div>
          {children}
        </LayoutContainer>
      </main>
    </SidebarProvider>
  );
}
