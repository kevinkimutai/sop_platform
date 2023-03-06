"use client";

import React, { Suspense, useState } from "react";
import { SearchContainer, DataTable, PageNumbers, NewSop } from "./index";
import Loader from "./Loader";
import { debounce } from "lodash";
import { URL } from "@/utils/constants";
import NewDisease from "./NewDisease";

type PageProps = {
  show?: string;
  type: string;
};

const DataContainer = (props: PageProps) => {
  //const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<
  //string | (undefined > undefined);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [showForm, setShowForm] = useState(false);

  const showFormHandle = (bool: boolean) => {
    setShowForm(bool);
  };

  //   const debouncedSearch = debounce((searchTerm: string) => {
  //     setDebouncedSearchTerm(searchTerm);
  //   }, 500);

  const handleSearchTerm = (searchTerm: string | undefined) => {
    setSearchTerm(searchTerm);
  };

  return (
    <>
      <SearchContainer
        input="sops"
        search={handleSearchTerm}
        show={showFormHandle}
        addBtn={props.show}
      />
      {props.show === "sop" ? showForm && <NewSop /> : null}
      {props.show === "disease" ? showForm && <NewDisease /> : null}
      <DataTable
        searchTerm={searchTerm}
        url={`${URL}/${props.type}`}
        type={props.type}
      />
      {/*<PageNumbers />*/}
    </>
  );
};

export default DataContainer;
