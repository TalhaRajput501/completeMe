import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Providers from "@/components/ui/Providers";
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from "next-auth";
import ReduxProvider from "@/lib/store/ReduxProvider";
import { Toaster } from "@/components/ui/sonner"
import ClientLayout from "@/components/ui/ClientLayout";


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
    <html lang="en">
      <body
        className={`  antia liased`}
      >
        <Providers session={session}>
          <ReduxProvider>
            <div
              className="h-screen flex flex-col "
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
