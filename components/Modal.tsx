"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/Modal.css";

import PdfViewer from "./PdfViewer";
import { HiLink, HiOutlineDocument, HiOutlineXMark } from "react-icons/hi2";
import Loader from "./Loader";
import { URL } from "@/utils/constants";

type PageProps = {
  id: string;
  showModal: (bool: boolean) => void;
  type: string;
};
type Data = {
  _id: string;
  title: string;
  description: string;
  file: string;
  program: string;
};
type User = {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  role: string;
};

function Modal(props: PageProps) {
  const [data, setData] = useState<Data & User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log(props);
      try {
        setIsLoading(true);
        let APIURL;
        if (props.type === "sop") {
          APIURL = `${URL}/sop/${props.id}`;
        } else if (props.type === "user") {
          APIURL = `${URL}/user/${props.id}`;
        } else {
          APIURL = `${URL}/disease/${props.id}`;
        }

        const res = await fetch(APIURL);
        const { data } = await res.json();
        setData(data);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData().then(() => console.log(data));
  }, [props.id]);

  let modal;

  switch (props.type) {
    case "sop":
      modal = (
        <>
          <div className="modal">
            <motion.button
              whileTap={{ scale: 1.1 }}
              whileHover={{ scale: 1.1 }}
              className="close"
              onClick={() => {
                props.showModal(false);
              }}
            >
              <HiOutlineXMark className="close-icon" />
            </motion.button>
            <h2 className="modal-title">Edit SOP</h2>
            <form className="content-container">
              <div className="input__container">
                <label>Title:</label>
                <div className="input__wrapper">
                  <input value={`${data?.title}`} />
                </div>
              </div>
              <div className="input__container">
                <label>Description:</label>
                <div className="input__wrapper">
                  <textarea value={`${data?.description}`} />
                </div>
              </div>
              <div className="input__container">
                <label>Disease:</label>
                <div className="input__wrapper">
                  <input value={`${data?.program}`} />
                </div>
              </div>
              <div className="input__container">
                <label>File:</label>
                <div className="input__wrapper last">
                  <motion.button
                    whileTap={{ scale: 1.1 }}
                    className="button-pdf"
                  >
                    <HiLink className="link-icon" />
                    Check PDF
                  </motion.button>
                  <motion.button className="add-new">
                    <HiOutlineDocument className="link-icon" />
                    Add New PDF
                  </motion.button>
                </div>
              </div>

              <motion.button whileTap={{ scale: 1.1 }} type="submit">
                Confirm Changes
              </motion.button>
            </form>
          </div>
        </>
      );
      break;

    case "user":
      modal = (
        <div className="modal">
          <motion.button
            whileTap={{ scale: 1.1 }}
            whileHover={{ scale: 1.1 }}
            className="close"
            onClick={() => {
              props.showModal(false);
            }}
          >
            <HiOutlineXMark className="close-icon" />
          </motion.button>
          <h2 className="modal-title">Edit User</h2>
          <form className="content-container">
            <div className="input__container">
              <label>FullName:</label>
              <div className="input__wrapper">
                <input value={`${data?.fname} ${data?.lname}`} disabled />
              </div>
            </div>
            <div className="input__container">
              <label>Email:</label>
              <div className="input__wrapper">
                <input value={`${data?.email}`} disabled />
              </div>
            </div>
            {/*TODO:ADD SELECT FOR USER ROLES*/}
            <div className="input__container">
              <label>Role:</label>
              <div className="input__wrapper">
                <input value={`${data?.role}`} />
              </div>
            </div>

            <motion.button whileTap={{ scale: 1.1 }} type="submit">
              Confirm Changes
            </motion.button>
          </form>
        </div>
      );

      break;
    default:
      break;
  }

  return (
    <div className="overlay">
      <>{isLoading ? <Loader /> : modal}</>
    </div>
  );
}

export default Modal;
