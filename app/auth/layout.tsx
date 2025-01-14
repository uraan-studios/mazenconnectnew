"use client";
import Image from 'next/image';
import React from 'react';

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  // Check if the client is mobile
  React.useEffect(() => {
    const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    setIsMobile(mobileRegex.test(userAgent) || window.innerWidth <= 768);
  }, []);

  return (
    <main className="min-h-screen h-full flex tex-fore">
      {/* Left Section */}
      {
        !isMobile &&
        (<div className="h-screen flex-grow flex items-center justify-center">
          {children}
        </div>)
      }
      {
        isMobile && (
          <div className="p-4 mx-auto h-screen flex flex-col items-center justify-center">
            <h1 className='text-xl text-center font-bold'>Welcome to Mazen Schools Digital Reporting</h1>
            <p className='text-sm'>Open the Portal on your Desktop to access it</p>
          </div>
        )
      }

      {/* Right Section */}
      {!isMobile && ( // Only show this section if not mobile
        <div className="h-screen p-4 flex justify-end">
          <div className="relative h-full w-auto">
            <Image
              className="rounded-3xl h-full w-auto object-contain"
              src="/cover2.png"
              alt="Authentication Cover"
              width={1000}
              height={1000}
              draggable={false}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default AuthLayout;
