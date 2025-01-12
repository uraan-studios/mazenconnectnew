import { AppSidebar } from '@/components/general/SidebarNew';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { validateRequest } from '@/lib/validateSessions';
import React from 'react'

const DashboardLayout = async ({ children }: React.PropsWithChildren) => {
    const session = await validateRequest();
  return (
    <SidebarProvider>
    <AppSidebar isAdmin={session?.user?.isSuperUser || false} />
    <main className='flex-grow px-4 bg-white dark:bg-black'>
      <SidebarTrigger />
      {children}
    </main>
  </SidebarProvider>
  )
}

export default DashboardLayout
