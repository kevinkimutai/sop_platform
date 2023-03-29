"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/Modal.css";

import PdfViewer from "./PdfViewer";
import {
  HiBellAlert,
  HiLink,
  HiOutlineCloud,
  HiOutlineDocument,
  HiOutlineXMark,
} from "react-icons/hi2";
import Loader from "./Loader";
import { URL } from "@/utils/constants";
import Spinner from "./Spinner";
import Link from "next/link";

import { storage } from "../firebase.config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

type PageProps = {
  id: string;
  showModal: (bool: boolean) => void;
  type: string;
  mode?: string;
};
type Data = {
  _id: string;
  title: string;
  description: string;
  file: string;
  disease: string;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [msg, setMsg] = useState<string | null>();
  const [diseases, setDiseases] = useState<[]>();
  const [pdfSOP, setpdfSOP] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const alterAction = async () => {
    try {
      setSpinner(true);
      const APIURL = `${URL}/${props.type}/${props.id}`;
      await fetch(APIURL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSpinner(false);
      setMsg(
        `successFully Deleted ${
          props.type === "user"
            ? data?.fname
            : props.type === "sop"
            ? data?.title
            : ""
        }`
      );
      setTimeout(() => {
        setMsg(null);
      }, 2000);
      setTimeout(() => {
        props.showModal(false);
      }, 3000);
    } catch (error) {
      //@ts-ignore
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // const APIURL = getURL();
        let APIURL;
        APIURL = `${URL}/${props.type}/${props.id}`;

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // const APIURL = getURL();
        let APIURL;
        APIURL = `${URL}/disease`;

        const res = await fetch(APIURL);
        const { data } = await res.json();
        setDiseases(data);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData().then(() => console.log(data));
  }, []);
  const editHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSpinner(true);
    try {
      const APIURL = `${URL}/${props.type}/${props.id}`;
      await fetch(APIURL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setMsg(
        `successFully Updated  ${
          props.type === "user"
            ? data?.fname
            : props.type === "sop"
            ? data?.title
            : ""
        }`
      );
      setSpinner(false);

      setTimeout(() => {
        setMsg(null);
      }, 2000);
      setTimeout(() => {
        props.showModal(false);
      }, 3000);
    } catch (error) {
      setSpinner(false);
      //@ts-ignore
    }
  };

  const uploadSOP = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setLoading(true);
    const pdfFile = e.target.files![0];

    const storageRef = ref(storage, `sops/ ${Date.now()} - ${pdfFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, pdfFile);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log("Something went wrong while uploading", error);
        setLoading(false);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //@ts-ignore
          setData({ ...data, file: downloadURL });

          setLoading(false);
        });
      }
    );
  };

  let modal;

  switch (props.type) {
    case "sop":
      modal = (
        <>
          <div className="modal">
            {spinner ? (
              <Spinner />
            ) : (
              <>
                {msg ? <div className="info__message">{msg}</div> : null}
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
                <form className="content-container" onSubmit={editHandler}>
                  <div className="input__container">
                    <label>Title:</label>
                    <div className="input__wrapper">
                      <input
                        value={`${data?.title}`}
                        onChange={(e) =>
                          //@ts-ignore
                          setData({ ...data, title: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="input__container">
                    <label>Description:</label>
                    <div className="input__wrapper">
                      <textarea
                        value={`${data?.description}`}
                        onChange={(e) =>
                          //@ts-ignore
                          setData({ ...data, description: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="input__container">
                    <label>Disease:</label>
                    <div className="input__wrapper">
                      <select
                        value={data?.disease}
                        onChange={(e) =>
                          //@ts-ignore
                          setData({ ...data, disease: e.target.value })
                        }
                      >
                        <option value="">Choose Disease</option>
                        {diseases?.map((disease) => (
                          <option key={disease.name} value={disease.name}>
                            {disease.name}
                          </option>
                        ))}

                        {/* 
                <option value="elma">Elma</option>
                <option value="g-power">G-Power</option>
                <option value="dhibiti">Dhibiti</option> */}
                      </select>
                    </div>
                  </div>
                  <div className="input__container">
                    <label>File:</label>
                    <div className="input__wrapper last">
                      <motion.button
                        whileTap={{ scale: 1.1 }}
                        className="button-pdf"
                      >
                        <a href={data?.file as string} target="_blank">
                          <HiLink className="link-icon" />
                          Check PDF
                        </a>
                      </motion.button>

                      {loading ? (
                        <Spinner />
                      ) : (
                        <div className="upload-div">
                          <label
                            htmlFor="file"
                            className="custom-file-upload-container"
                          >
                            Upload New PDF
                            <HiOutlineCloud className="link-icon" />
                          </label>
                          <input id="file" type="file" onChange={uploadSOP} />
                        </div>
                      )}

                      {/* <motion.button className="add-new">
                        <HiOutlineDocument className="link-icon" />
                        Update PDF
                      </motion.button> */}
                    </div>
                  </div>

                  <motion.button whileTap={{ scale: 1.1 }} type="submit">
                    Confirm Changes
                  </motion.button>
                </form>
              </>
            )}
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
          <form className="content-container" onSubmit={editHandler}>
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
                <select
                  value={data?.disease}
                  onChange={(e) =>
                    //@ts-ignore
                    setData({ ...data, role: e.target.value })
                  }
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
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
      <>
        {isLoading ? (
          <Loader />
        ) : props.mode ? (
          <div className="modal">
            {spinner ? (
              <Spinner />
            ) : (
              <>
                <div className="delete__container">
                  <HiBellAlert className="delete__icon" />
                  {msg ? <span className="info__message">{msg}</span> : null}
                  <p>Are you sure you want to delete </p>
                  <p>
                    <span>{props.type}:</span>
                    {data?.fname ? data.fname + " " + data.lname : data?.title}
                  </p>
                  <div className="btn-container">
                    <motion.button
                      whileTap={{ scale: 1.1 }}
                      whileHover={{ scale: 1.1 }}
                      className="cancel__button"
                      onClick={() => {
                        props.showModal(false);
                      }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 1.1 }}
                      whileHover={{ scale: 1.1 }}
                      className="delete__button"
                      onClick={alterAction}
                    >
                      Delete
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          modal
        )}
      </>
    </div>
  );
}

export default Modal;
