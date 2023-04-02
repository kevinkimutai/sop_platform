"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import "../styles/Modal.css";

const UsersModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="overlay">
      <div className="modal">
        <motion.button
          whileTap={{ scale: 1.1 }}
          className="close"
          onClick={toggleModal}
        >
          X
        </motion.button>
        <h2 className="modal-title">Edit User</h2>
        <form className="content-container">
          <div className="input__container">
            <label>Full Name:</label>
            <div className="input__wrapper">
              <input placeholder="Enter your email:" />
            </div>
          </div>

          <div className="input__container">
            <label>Email:</label>
            <div className="input__wrapper">
              <input placeholder="Confirm Password:" />
            </div>
          </div>
          <div className="input__container">
            <label>Role:</label>
            <div className="input__wrapper">
              <input placeholder="Confirm Password:" />
            </div>
          </div>

          <motion.button whileTap={{ scale: 1.1 }} type="submit">
            Confirm Changes
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default UsersModal;
