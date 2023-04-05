"use client";

import React, { useState } from "react";

import { HiDocumentPlus, HiUserGroup } from "react-icons/hi2";

import "../styles/AdminButtonGroup.css";

type PageProps = {
  show: (bool: boolean) => void;
  type: string;
};

const AdminButtonGroup = (props: PageProps) => {
  const [add, setAdd] = useState(false);
  return (
    <div className="admin__btn-container">
      {/* <button>
        <span>
          <HiUserGroup />
        </span>
        users
      </button> */}
      <button
        onClick={() => {
          setAdd(!add);
          props.show(add);
        }}
      >
        <span>
          <HiDocumentPlus />
        </span>
        Add {props.type}
      </button>
    </div>
  );
};

export default AdminButtonGroup;
