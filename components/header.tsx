import { Bell, User } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <SidebarTrigger />
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
          <span className="text-lg font-bold text-primary-foreground">W</span>
        </div>
        <span className="hidden font-semibold md:inline-flex">
          Water Management System
        </span>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <User className="h-4 w-4" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <User className="h-4 w-4" />
              </div>
              <div className="text-sm font-medium">Admin User</div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="w-full">
              <Link href="/profile" className="w-full">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="w-full">
              <Link href="/settings" className="w-full">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="w-full">
              <Link href="/integrations" className="w-full">
                Connect with HVAC
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="w-full">
              <Link href="/integrations" className="w-full">
                Connect with BMS
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
