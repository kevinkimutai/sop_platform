"use client";

import React from "react";
import { useState } from "react";

import { motion } from "framer-motion";
import "../styles/SearchForm.css";
import { HiOutlineSearch } from "react-icons/hi";

type PageProps = {
  search: (searchTerm: string | undefined) => void;
  input: string;
};

const SearchForm = (props: PageProps) => {
  const [searchTerm, setSearchTerm] = useState<string>();

  // const handleBlur = () => {
  //   props.search(searchTerm);
  // };
  return (
    <form className="form-section">
      <input
        type="text"
        placeholder={`Type to search for ${props.input} here`}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(e.target.value);
          props.search(searchTerm);
        }}
      />

      {/*TODO:STYLE CUSTOM SELECT*/}
      {/* <select name="cars" id="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select> */}
      <select name="cars" id="cars">
        <option value="volvo">Date:2022</option>
        <option value="saab">Saab</option>
      </select>
      <motion.button whileTap={{ scale: 1.1 }} type="submit">
        <HiOutlineSearch className="search-icon" />
      </motion.button>
    </form>
  );
};

export default SearchForm;
