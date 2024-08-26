import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import React from "react";
import RegisterModal from "@/app/components/modals/RegisterModal";
import ToasterProvider from "@/app/providers/ToasterProvider";
import LoginModal from "@/app/components/modals/LoginModal";
import {getUserId} from "@/app/lib/actions";
import RentModal from "@/app/components/modals/RentModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = await getUserId()
  const isDev = process.env.NODE_ENV === 'development'

  return (
    <html lang="en">
      <body className={font.className} suppressHydrationWarning={isDev}>
        <ToasterProvider/>
        <RentModal />
        <RegisterModal/>
        <LoginModal/>
        <Navbar userId={userId}/>
        {children}
      </body>
    </html>
  );
}
