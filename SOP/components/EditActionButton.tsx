"use client";

import React, { useState } from "react";
import { HiOutlinePencil } from "react-icons/hi2";
import { motion } from "framer-motion";

import "../styles/EditActionButton.css";

type PageProps = {
  showModal: (bool: boolean, type: string, id: string) => void;
  id: string;
  type: string;
};

const EditAction = (props: PageProps) => {
  return (
    <motion.button
      whileTap={{ scale: 1.1 }}
      className="edit-container"
      onClick={() => {
        props.showModal(true, props.type, props.id);
      }}
    >
      <HiOutlinePencil className="edit-icon" />
    </motion.button>
  );
};

export default EditAction;
