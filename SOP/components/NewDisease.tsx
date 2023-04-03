import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { URL } from "@/utils/constants";
import Loader from "./Loader";
import "../styles/NewSop.css";

const NewDisease = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("*Required"),
      description: Yup.string().required("*Required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await fetch(`${URL}/disease`, {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await res.json();

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
  });

  return (
    <motion.form
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sop__form-section-container last_form"
      onSubmit={formik.handleSubmit}
    >
      <div className="input-container">
        <div className="input__group">
          <label>Name</label>
          <input
            id="title"
            className="form-input"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <p className="input__error">{formik.errors.name}</p>
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

        {loading ? (
          <Loader />
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
  );
};

export default NewDisease;
