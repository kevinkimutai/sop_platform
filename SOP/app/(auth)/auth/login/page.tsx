"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import "../../../../styles/auth.css";
import { signIn } from "next-auth/react";

import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import Loader from "@/components/Loader";

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("*Required"),
      password: Yup.string()
        .required("*Required")
        .min(8, "*Password is too short - should be 8 chars minimum.")
        .matches(
          /^(?=.*[a-z])/,
          "*Must contain at least one lowercase character"
        )
        .matches(
          /^(?=.*[A-Z])/,
          "*Must contain at least one uppercase character"
        )
        .matches(/^(?=.*[0-9])/, "Must contain at least one number")
        .matches(
          /^(?=.*[!@#%&])/,
          "*Must contain at least one special character"
        ),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await signIn("credentials", {
          email: values.email,
          password: values.password,

          redirect: true,
          callbackUrl: "/",
        });
        values = formik.initialValues;
        toast.success("successfully Logged in!!");
        setLoading(false);
      } catch (error) {
        toast.error("Wrong email or password!!");
      }
    },
  });
  return (
    <div className="auth">
      <div className="illustration-container">
        <img
          src="/footer-logo.png"
          alt="login-illustration"
          className="image-illustration"
          // width={100}
          // height={100}
        />
      </div>
      <form className="auth-container" onSubmit={formik.handleSubmit}>
        {loading ? <Loader /> : <h1>Login</h1>}
        <div className="input-container">
          <label>Email:</label>
          <div className="input-wrapper">
            <input
              id="email"
              placeholder="Enter your email address"
              type="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="input__error">{formik.errors.email}</p>
            ) : null}
          </div>
        </div>
        <div className="input-container">
          <label>Password:</label>
          <div className="input-wrapper">
            <input
              id="password"
              placeholder="Enter Password"
              type="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="input__error">{formik.errors.password}</p>
            ) : null}
          </div>
        </div>
        <p className="auth-link__container">
          Dont have an account
          <Link href={"/auth/login"} className="auth-link">
            sign up
          </Link>
          to continue
        </p>
        <motion.button whileHover={{ scale: 1.1 }} type="submit">
          Submit
        </motion.button>
      </form>
    </div>
  );
};

export default LoginPage;
