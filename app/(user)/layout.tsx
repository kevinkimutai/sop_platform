"use client";

import { SessionProvider } from "next-auth/react";

import { Navbar, Footer } from "@/components";
import "../../styles/globals.css";

import React from "react";

interface Props {
  children: React.ReactNode;
  session: any;
}

export default function RootLayout({ children, session }: Props) {
  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session}>
          <Navbar />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
