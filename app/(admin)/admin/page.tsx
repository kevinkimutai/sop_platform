import { MainSection, Sidebar } from "@/components";
import AdminSection from "@/components/AdminSection";
import React from "react";

const page = () => {
  return (
    <main className="main">
      <Sidebar />
      {/*@ts-ignore*/}
      <AdminSection />
    </main>
  );
};

export default page;
