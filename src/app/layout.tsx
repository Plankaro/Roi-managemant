
import type { Metadata } from "next";
import "./globals.css";
import { font } from "@/app/fonts";
import StoreProvider from "./storeProvider";
import {Toaster} from 'react-hot-toast'
export const metadata: Metadata = {
  title: "Roi magnet",
  description: "A whatsapp marketing platform",
  icons: {
    icon: '/logo/logo.svg',
    shortcut: '/logo/logo.svg',
  },
};
import { auth } from "@/auth"
import { SocketProvider } from "./socketProvider";
import { SessionProvider } from "next-auth/react";
import TopLoaderWrapper from "./loader";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth() 
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
    <StoreProvider>
  
      <SocketProvider>
    <html lang="en">
      <body
        className={` ${font.className} antialiased`}
      >
  <TopLoaderWrapper/>
        <div>
          {children}
          <Toaster />
          
        </div>
       
      </body>
    </html>
    </SocketProvider>
    </StoreProvider>
    </SessionProvider>
  );
}

