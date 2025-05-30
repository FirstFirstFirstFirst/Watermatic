"use client";

import {
  BarChart3,
  Droplets,
  History,
  Home,
  Settings,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const pathname = usePathname();

  const routes = [
    {
      title: "Dashboard",
      href: "/",
      icon: Home,
      isMockData: true,
    },
    {
      title: "Usage History",
      href: "/usage-history",
      icon: History,
      isMockData: true,
    },
    {
      title: "Sensor Status",
      href: "/sensor-status",
      icon: Droplets,
      isMockData: true,
    },
    {
      title: "Maintenance",
      href: "/maintenance",
      icon: Wrench,
      isMockData: true,
    },
    {
      title: "Data Analysis",
      href: "/data-analysis",
      icon: BarChart3,
      isMockData: true,
    },
  ];

  return (
    <Sidebar className="h-[calc(100vh-4rem)] pt-2 border-r bg-background">
      <SidebarHeader className="flex h-16 items-center justify-center border-b px-4 md:hidden">
        <div className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-lg font-bold text-primary-foreground">W</span>
          </div>
          <span>Water Management</span>
        </div>
      </SidebarHeader>
      <div className="pt-2 md:pt-16">
        <SidebarContent className="px-2">
          <SidebarMenu>
            {routes.map((route) => (
              <SidebarMenuItem key={route.href} className="w-full">
                <SidebarMenuButton
                  asChild
                  className="w-full justify-start"
                  isActive={
                    pathname === route.href ||
                    (route.href !== "/" && pathname.startsWith(route.href))
                  }
                  tooltip={
                    route.title + (route.isMockData ? " (Mock Data)" : "")
                  }
                >
                  <Link href={route.href} className="w-full">
                    <route.icon className="h-4 w-4" />
                    <span className="flex items-center gap-2">
                      {route.title}
                      {route.isMockData && (
                        <span className="ml-auto text-xs font-medium rounded-full bg-blue-200 text-blue-700 px-2 py-0.5">
                          MOCK
                        </span>
                      )}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter className="px-2 pb-4">
          <SidebarMenu>
            <SidebarMenuItem className="w-full">
              <SidebarMenuButton
                asChild
                tooltip="Settings"
                className="w-full justify-start"
              >
                <Link href="/settings" className="w-full">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
