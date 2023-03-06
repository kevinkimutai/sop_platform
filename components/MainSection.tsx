import React, { Suspense } from "react";

import "../styles/MainSection.css";

import {
  SearchForm,
  Sidebar,
  AdminButtonGroup,
  DataTable,
  PageNumbers,
  SearchContainer,
  DataContainer,
} from "../components/index";
import Loader from "./Loader";
import Modal from "./Modal";
import UsersModal from "./UsersModal";

type PageProps = {
  sop: any;
};

const MainSection = (props: PageProps) => {
  const handleSearchTerm = () => {};

  return (
    <>
      <section className="main-section">
        <h1 className="title-section">Standard Operating Procedure (SOP)</h1>

        <DataContainer type="sop" />
      </section>
    </>
  );
};

export default MainSection;
