import React from "react";

import "../styles/SearchContainer.css";
import { SearchForm, AdminButtonGroup } from "./index";

type PageProps = {
  search: (searchTerm: string | undefined) => void;
  input: string;
  show: (bool: boolean) => void;
  addBtn: string | undefined;
};

const SearchContainer = (props: PageProps) => {
  return (
    <div className="search-container__wrapper">
      <SearchForm search={props.search} input={props.input} />
      {props.addBtn && (
        <AdminButtonGroup show={props.show} type={props.addBtn} />
      )}
    </div>
  );
};

export default SearchContainer;
