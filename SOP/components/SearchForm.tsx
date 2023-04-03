"use client";

import React from "react";
import { useState } from "react";

import { motion } from "framer-motion";
import "../styles/SearchForm.css";
import { HiOutlineSearch } from "react-icons/hi";

type PageProps = {
  search: (searchTerm: string | undefined) => void;
  type: string;
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
        placeholder={`Type to search for ${props.type} here`}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(e.target.value);
          props.search(searchTerm);
        }}
      />

      <motion.button whileTap={{ scale: 1.1 }} type="submit">
        <HiOutlineSearch className="search-icon" />
      </motion.button>
    </form>
  );
};

export default SearchForm;
