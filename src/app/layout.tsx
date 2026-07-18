// @ts-ignore
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Providers from "@/components/ui/Providers";
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from "next-auth";
import ReduxProvider from "@/lib/store/ReduxProvider";
import { Toaster } from "@/components/ui/sonner"
import ClientLayout from "@/components/ui/ClientLayout";
import React from "react";


import { Metadata } from "next";

export const metadata: Metadata = {
  title: "completeMe | Premium Modern eCommerce Platform",
  description: "Shop the latest premium trends in clothing, shoes, and watches. Experience a high-performance, seamless eCommerce platform built with the MERN stack and Next.js.",
  
  // 1. Core indexing configurations for the project production domain
  metadataBase: new URL("https://complete-me-beta.vercel.app"),
  alternates: {
    canonical: "/",
  },

  // 2. Keywords optimized specifically for your eCommerce product & stack
  keywords: [
    "completeMe",
    "eCommerce Platform",
    "Online Shopping",
    "Buy Clothes Online",
    "Premium Premium Watches",
    "MERN Stack eCommerce",
    "Next.js Shopping Cart",
    "Fast Web Store",
    "TalhaRajput501",
  ],

  // 3. Open Graph (Optimized for store link sharing on LinkedIn, Discord, and FB)
  openGraph: {
    title: "completeMe | Premium Modern eCommerce Platform",
    description: "Discover a seamless online shopping experience on completeMe. Explore premium catalogs of clothing, footwear, and accessories built over a lightning-fast, production-grade MERN & Next.js web application architecture.",
    url: "https://complete-me-beta.vercel.app",
    siteName: "completeMe Store",
    images: [
      {
        url: "/og-image.jpg",  
        width: 1200,
        height: 630,
        alt: "completeMe eCommerce Storefront Preview - Shop Premium Clothing, Shoes & Watches",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // 4. Twitter Cards (Tailored for seamless X card expansions)
  twitter: {
    card: "summary_large_image",
    title: "completeMe | Premium Modern eCommerce Platform",
    description: "Shop premium clothing, shoes, and watches. A lightning-fast, high-performance eCommerce application built using Next.js and the MERN stack.",
    images: ["/og-image.jpg"],
  },

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
    <html lang="en" className="scroll-smooth">
      <body
        className='antia liased bg-blue-50  '
      >
        <Providers session={session}>
          <ReduxProvider>
            <div
              className="  flex flex-col max-w-[1400px] mx-auto  "
            >
              <nav>
                <Navbar />
              </nav>

              {/* Notification toaster basically for payment fail or error */}
              <Toaster position="top-right" toastOptions={{
                classNames: {
                  toast: '!bg-white  ', // Target the toast container
                  title: '!text-slate-900',
                  description: '!text-slate-600',
                }
              }} />

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
