import React from "react";
import { HiOutlineTrash } from "react-icons/hi2";

import "../styles/DeleteActionButton.css";

const DeleteAction = () => {
  return (
    <button className="delete-container">
      <HiOutlineTrash className="delete-icon" />
    </button>
  );
};

export default DeleteAction;
