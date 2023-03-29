"use client";

import React, { useState, useEffect } from "react";

import { HiOutlineCloud } from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";

import "../styles/NewSop.css";
import { useFormik } from "formik";
import { storage } from "../firebase.config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import toast from "react-hot-toast";

import * as Yup from "yup";
import Loader from "./Loader";
import { URL } from "@/utils/constants";
import Spinner from "./Spinner";

type Disease = {
  name: string;
  description: string;
};

type PageProps = {
  show: (bool: boolean) => void;
};

const NewSop = (props: PageProps) => {
  const [pdfSOP, setpdfSOP] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const [uploading, setUploading] = useState<boolean>(false);
  const [disease, setDisease] = useState<Disease[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${URL}/disease`);
        const { data } = await res.json();
        setDisease(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

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
          setpdfSOP(downloadURL);
          setLoading(false);
        });
      }
    );
  };

  const deleteSOP = () => {
    const pdfToDelete = pdfSOP;

    const pdfRef = ref(storage, pdfToDelete);

    // Delete the file
    deleteObject(pdfRef)
      .then(() => {
        setpdfSOP("");

        setLoading(true);

        setTimeout(() => {
          setLoading(false);
        }, 4000);
      })
      .then(() => {})
      .catch((error) => {
        console.log("Error deleting sop doc", error);
      });
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      disease: "",
      //created_by: "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("*Required"),
      description: Yup.string().required("*Required"),
      //created_by: Yup.string().required("*Required"),
      disease: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        if (!pdfSOP) {
          //TODO:ADD TOAST NOTIFICATION
          return toast.error("Missing Pdf File");
        }

        setUploading(true);
        const res = await fetch(`${URL}/sop`, {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({ ...values, file: pdfSOP }),
        });
        const data = await res.json();

        toast.success(`Successfully Added ${data.title} SOP`);
        setUploading(false);
        values = formik.initialValues;
        setTimeout(() => {
          props.show(false);
        }, 2500);
      } catch (error) {
        console.error(error);
        setUploading(false);
        toast.error("oops!,Something went wrong");
      }
    },
  });

  return (
    <AnimatePresence>
      {uploading ? (
        <Loader />
      ) : (
        <motion.form
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          exit={{ y: -50, opacity: 0.5 }}
          className="sop__form-section-container"
          onSubmit={formik.handleSubmit}
        >
          <div className="file-container">
            {loading ? (
              <Spinner />
            ) : !pdfSOP ? (
              <>
                <p>upload sop here</p>
                <label htmlFor="file-upload" className="custom-file-upload">
                  <HiOutlineCloud className="file__upload-icon" />
                </label>
                <input
                  id="custom-file"
                  type="file"
                  name="file"
                  onChange={uploadSOP}
                />
              </>
            ) : (
              <button onClick={deleteSOP} className="delete__pdf--btn">
                Delete Uploaded SOP
              </button>
            )}
          </div>
          <div className="input-container">
            <div className="input__group">
              <label>Title</label>
              <input
                id="title"
                className="form-input"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title ? (
                <p className="input__error">{formik.errors.title}</p>
              ) : null}
            </div>
            <div className="input__group">
              <label>Description</label>
              <textarea
                id="description"
                className="form-input form-input__textarea"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description ? (
                <p className="input__error">{formik.errors.description}</p>
              ) : null}
            </div>
            <div className="input__group">
              <select
                name="disease"
                id="disease"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.disease}
              >
                <option value="">Choose Disease</option>
                {disease?.map((disease) => (
                  <option key={disease.name} value={disease.name}>
                    {disease.name}
                  </option>
                ))}
                {/* 
                <option value="elma">Elma</option>
                <option value="g-power">G-Power</option>
                <option value="dhibiti">Dhibiti</option> */}
              </select>
              {formik.touched.disease && formik.errors.disease ? (
                <p className="input__error">{formik.errors.disease}</p>
              ) : null}
            </div>
            {/* <div
            className="input__group"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.created_by}
          >
            <select name="created by" id="created_by">
              <option value="volvo">Admin</option>
            </select>
            </div> */}
            {loading ? (
              <Spinner />
            ) : (
              <motion.button
                whileTap={{ scale: 1.03 }}
                type="submit"
                className="form-submit__btn"
              >
                submit
              </motion.button>
            )}
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default NewSop;
