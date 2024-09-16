import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import React from "react";
import RegisterModal from "@/app/components/modals/RegisterModal";
import ToasterProvider from "@/app/providers/ToasterProvider";
import LoginModal from "@/app/components/modals/LoginModal";
import {getCurrentUser} from "@/app/lib/actions";
import RentModal from "@/app/components/modals/RentModal";
import SearchModal from "@/app/components/modals/SearchModal";

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
  const currentUser = await getCurrentUser()
  const isDev = process.env.NODE_ENV === 'development'

  return (
    <html lang="en">
      <body className={font.className} suppressHydrationWarning={isDev}>
        <ToasterProvider/>
        <SearchModal />
        <RentModal />
        <RegisterModal/>
        <LoginModal/>
        <Navbar currentUser={currentUser}/>
        <div className={"pb-20 pt-28"}>
          {children}
        </div>
      </body>
    </html>
  );
}
