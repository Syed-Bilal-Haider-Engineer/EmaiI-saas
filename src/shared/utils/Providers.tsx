"use client"
import { useUser } from '@clerk/nextjs';
import { NextUIProvider } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import DashboardSideBar from '../wedgets/dashboard/sidebar/dashboard.sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const {isLoaded} = useUser();
  if(!isLoaded) {
       return null
  }
  const shouldRenderSidebar =
    !['/dashboard/new-email', '/sign-up', '/', '/subscribe', '/sign-in'].includes(pathname);

  return (
    <NextUIProvider>
      {shouldRenderSidebar && (
        <div className="w-full flex">
          <div className="w-[290px] h-screen overflow-y-scroll">
           <DashboardSideBar/>
          </div>
          {children}
        </div>
      )}
      {!shouldRenderSidebar && children}
      <ToastContainer position="top-center" />
    </NextUIProvider>
  );
}
