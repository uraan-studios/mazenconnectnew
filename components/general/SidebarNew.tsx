"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
  } from "@/components/ui/sidebar"
import { menu } from "@/constants/menu"
import Image from "next/image"
import Logout from "./Logout"
import { ModeToggle } from "./DarkModeToggle"
import { usePathname } from "next/navigation"
  
  export function AppSidebar({isAdmin}: {isAdmin: boolean}) {
    const path = usePathname()
    return (
      <Sidebar className="bg-white">
        <SidebarHeader>
            {/* Light theme image */}
            <Image
                draggable={false}
                className="mx-2 w-60 h-20 rounded-xl object-contain dark:hidden"
                src={"/nav/mazen-nav-light.png"}
                alt="Mazen Banner"
                width={240}
                height={80}
            />

            {/* Dark theme image */}
            <Image
                draggable={false}
                className="mx-2 w-60 h-20 rounded-xl object-contain hidden dark:block"
                src={"/nav/mazen-nav-dark.png"}
                alt="Mazen Banner"
                width={240}
                height={80}
            />
        </SidebarHeader>

        <SidebarContent>

          <SidebarGroup >
            <SidebarGroupLabel>Home</SidebarGroupLabel>
            <SidebarMenu>
                {
                    menu.home.map((item, index) => (
                        (!item.secure || isAdmin) &&
                        (<SidebarMenuItem key={index}>
                            <SidebarMenuButton asChild className={`${path === item.path ? 'bg-primary text-primary-foreground' : ''}`}>
                                <a href={item.path}>
                                    <item.icon/>
                                    {item.name}
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>)
                    ))
                }
            </SidebarMenu>

          </SidebarGroup>

          <SidebarGroup >
            <SidebarGroupLabel>Manage</SidebarGroupLabel>
            <SidebarMenu>
                {
                    menu.manage.map((item, index) => (
                        (!item.secure || isAdmin) &&
                        (
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton asChild  className={`${path === item.path ? 'bg-primary text-primary-foreground' : ''}`}>
                                <a href={item.path}>
                                    <item.icon/>
                                    {item.name}
                                </a>
                            </SidebarMenuButton>
                            <SidebarMenuSub>
                                {
                                    item.submenu.map((subItem, index) => (
                                        (!subItem.secure || isAdmin) &&
                                        (<SidebarMenuSubItem key={index}>
                                            <SidebarMenuButton asChild  className={`text-primary-foreground/50 ${path === subItem.path ? 'bg-primary text-primary-foreground' : ''}`}>
                                                <a className="" href={subItem.path}>
                         
                                                    {subItem.name}
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuSubItem>)
                                    ))
                                }
                                <SidebarMenuSubItem>
                                    <SidebarMenuButton asChild  className={`${path === item.path ? 'bg-primary text-primary-foreground' : ''}`}>
                                        
                                    </SidebarMenuButton>
                                </SidebarMenuSubItem>
                            </SidebarMenuSub>
                        </SidebarMenuItem>)
                    ))
                }
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup >
            <SidebarGroupLabel>Report</SidebarGroupLabel>
            <SidebarMenu>
                {
                    menu.report.map((item, index) => (
                        (!item.secure || isAdmin) &&
                        (
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton asChild  className={`${path === item.path ? 'bg-primary text-primary-foreground' : ''}`}>
                                <a href={item.path}>
                                    <item.icon/>
                                    {item.name}
                                </a>
                            </SidebarMenuButton>
                            <SidebarMenuSub>
                                {
                                    item.submenu.map((subItem, index) => (
                                        (!subItem.secure || isAdmin) &&
                                        (<SidebarMenuSubItem key={index}>
                                            <SidebarMenuButton asChild  className={`text-primary-foreground/50 ${path === subItem.path ? 'bg-primary text-primary-foreground' : ''}`}>
                                                <a href={subItem.path}>
                         
                                                    {subItem.name}
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuSubItem>)
                                    ))
                                }
         
                            </SidebarMenuSub>
                        </SidebarMenuItem>)
                    ))
                }
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup >
            <SidebarGroupLabel>Campuses</SidebarGroupLabel>
            <SidebarMenu>
                {
                    menu.campus.map((item, index) => (
                        (!item.secure || isAdmin) &&
                        (
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton asChild  className={`${path === item.path ? 'bg-primary text-primary-foreground' : ''}`}>
                                <a href={item.path}>
                                    <item.icon/>
                                    {item.name}
                                </a>
                            </SidebarMenuButton>
                            <SidebarMenuSub>
                                {
                                    item.submenu.map((subItem, index) => (
                                        (!subItem.secure || isAdmin) &&
                                        (<SidebarMenuSubItem key={index}>
                                            <SidebarMenuButton asChild  className={`text-primary-foreground/50 ${path === subItem.path ? 'bg-primary text-primary-foreground' : ''}`}>
                                                <a href={subItem.path}>
                         
                                                    {subItem.name}
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuSubItem>)
                                    ))
                                }

                            </SidebarMenuSub>
                        </SidebarMenuItem>)
                    ))
                }
            </SidebarMenu>
          </SidebarGroup>

        </SidebarContent>

        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <ModeToggle/>
                </SidebarMenuItem>
                <SidebarMenuItem>
                   <Logout />
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
        
      </Sidebar>
    )
  }
  