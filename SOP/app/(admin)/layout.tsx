"use client";

import React from "react";
import { Footer, Navbar } from "@/components";
import { SessionProvider } from "next-auth/react";
import "../../styles/globals.css";

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
