import React from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { motion } from "framer-motion";

import "../styles/DeleteActionButton.css";

type PageProps = {
  showModal: (bool: boolean, type: string, id: string, mode?: string) => void;
  id: string;
  type: string;
  mode?: string;
};

const DeleteAction = (props: PageProps) => {
  return (
    <motion.button
      whileTap={{ scale: 1.1 }}
      className="delete-container"
      onClick={() => {
        props.showModal(true, props.type, props.id, props.mode);
      }}
    >
      <HiOutlineTrash className="delete-icon" />
    </motion.button>
  );
};

export default DeleteAction;
