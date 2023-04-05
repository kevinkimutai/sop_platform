import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

import "../styles/PageNumbers.css";

const PageNumbers = () => {
  return (
    <div className="page__numbers-container">
      <button>
        <HiChevronLeft />
      </button>
      <span>1</span>
      <button>
        <HiChevronRight />
      </button>
    </div>
  );
};

export default PageNumbers;
