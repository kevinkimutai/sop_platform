"use client";

import { Toaster } from "react-hot-toast";
import "../../styles/globals.css";
import { SessionProvider } from "next-auth/react";

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
          <div className="wrapper">
            <Toaster containerClassName="toast" />
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
