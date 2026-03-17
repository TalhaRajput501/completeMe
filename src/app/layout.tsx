import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Providers from "@/components/ui/Providers";
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from "next-auth";
import ReduxProvider from "@/lib/store/ReduxProvider";
import { Toaster } from "@/components/ui/sonner"
import ClientLayout from "@/components/ui/ClientLayout";
import React from "react";


export const metadata = {
  title: "Complete your personality",
};


export default async function RootLayout(
  {
    children,
  }:
    Readonly<{
      children: React.ReactNode;
    }>
) {
  const session = await getServerSession(options) // this is for performance 

  return (
    <html lang="en" className="dark">
      <body
        className='antia liased bg-white'
      >
        <Providers session={session}>
          <ReduxProvider>
            <div
              className="  flex flex-col max-w-[1400px] mx-auto"
            >
              <nav>
                <Navbar />
              </nav>

              {/* Notification toaster basically for payment fail or error */}
              <Toaster position="top-right" className="bg-black" />

              {/* Client Layout */}
              {/* This layout is for store subscription */}
              <div className=' flex-1'>
                <ClientLayout>
                  {children}
                  <div id="portal-root" />
                </ClientLayout>
              </div>

            </div>
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
