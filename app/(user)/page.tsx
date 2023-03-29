import React from "react";
import { NextApiRequest } from "next";

import "../../styles/globals.css";
import { Navbar, MainSection, Footer } from "@/components";

const HomePage = async () => {
  // const data = await getSops();
  return (
    <>
      <main className="main">
        {/*@ts-ignore*/}
        <MainSection />
      </main>
    </>
  );
};

export default HomePage;
