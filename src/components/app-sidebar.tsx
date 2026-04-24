"use client"

import { FileText, User, Settings, ShieldCheck, Sparkles, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { logout } from "@/actions/auth"

const items = [
  {
    title: "Resume",
    url: "/dashboard",
    icon: FileText,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Preference",
    url: "/dashboard/preferences",
    icon: Settings,
  },
  {
    title: "Authentication",
    url: "/dashboard/security",
    icon: ShieldCheck,
  },
  {
    title: "AI Setup",
    url: "/dashboard/ai",
    icon: Sparkles,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar
      collapsible="offcanvas"
      variant="inset"
      className="border-r-0 !sticky top-0 shadow-sm relative overflow-hidden truncate"
    >
      <SidebarHeader className="pt-6 pb-2 px-4 flex flex-row items-center gap-2 z-10 bg-transparent overflow-hidden">
        <div className="relative flex items-center justify-center p-1.5 bg-blue-600 rounded-lg shadow-lg shadow-blue-600/20 shrink-0">
          <Sparkles className="w-4 h-4 text-white animate-pulse" />
        </div>
        <span className="font-bold text-xl tracking-widest text-foreground truncate">
          NovaCV<span className="text-blue-500">.</span>
        </span>
      </SidebarHeader>

      <SidebarContent className="bg-gradient-to-b from-sidebar via-sidebar to-sidebar/90 backdrop-blur-sm z-10 pt-4">
        <SidebarGroup>
          <SidebarGroupContent className="px-2">
            <SidebarMenu className="gap-1.5">
              {items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.url

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      onClick={handleLinkClick}
                      className={`h-11 px-3 transition-all duration-200 rounded-md
                        ${isActive
                          ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-semibold shadow-sm ring-1 ring-blue-500/20'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                        }`}
                      isActive={isActive}
                    >
                      <Link href={item.url}>
                        <Icon className={`w-5 h-5 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground"}`} />
                        <span className="text-[14.5px]">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 z-10 flex">
        <SidebarMenu>
          <SidebarMenuItem>
            <form action={logout} className="w-full">
              <SidebarMenuButton
                type="submit"
                onClick={handleLinkClick}
                className="h-11 px-3 w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                tooltip="Log out"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-[14.5px] font-medium">Log out</span>
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      {/* Decorative Sidebar Background Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none z-0" />
    </Sidebar>
  )
}
