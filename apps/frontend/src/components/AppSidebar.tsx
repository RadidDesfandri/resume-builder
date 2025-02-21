'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useRoutes } from '@/hooks/useRoutes';
import Link from 'next/link';
import LogoutConfirm from './LogoutConfirm';

export function AppSidebar() {
  const { router, isOpenModal, handleToggleModal } = useRoutes();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader textWhenOpen="Username">
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarGroupLabel>General</SidebarGroupLabel>
            {router.slice(0, 2).map((route) => (
              <SidebarMenuItem key={route.label}>
                <SidebarMenuButton asChild isActive={route.active}>
                  <Link href={route.href}>
                    <route.icon size={30} />
                    {route.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <SidebarMenu>
            <SidebarGroupLabel>Personal</SidebarGroupLabel>
            {router.slice(2, 4).map((route) => (
              <SidebarMenuItem key={route.label}>
                <SidebarMenuButton
                  asChild
                  onClick={route.onClick}
                  isActive={route.active}
                >
                  <Link href={route.href}>
                    <route.icon size={30} />
                    {route.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter textWhenOpen="Username">avatar</SidebarFooter>
      <LogoutConfirm isOpen={isOpenModal} onClose={handleToggleModal} />
    </Sidebar>
  );
}
