import React from "react";
import { NextApiRequest } from "next";

import "../../styles/globals.css";
import { Navbar, MainSection, Footer } from "@/components";

// const getSops = async () => {
//   try {
//     const res = await fetch("http://localhost:3000/api/sop");
//     if (!res.ok) {
//       throw new Error("Failed to fetch data!");
//     }
//     const { data } = await res.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// Set the number of objects you want to create
const numberOfObjects = 10;

// Create an empty array to store the objects
//@ts-ignore
const objectArray = [];

// Loop through the number of objects and create a new object each time
for (let i = 1; i <= numberOfObjects; i++) {
  // Generate random values for each field
  const no = i;
  const title = `Title ${i}`;
  const program = `Program ${i}`;
  const description = `Description ${i}`;
  const updated_at = new Date().toISOString();

  // Create the object and add it to the array
  const newObj = {
    no,
    title,
    program,
    description,
    updated_at,
  };
  objectArray.push(newObj);
}

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
