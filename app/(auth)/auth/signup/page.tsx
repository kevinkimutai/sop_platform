"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import "../../../../styles/auth.css";
import Link from "next/link";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";
import { toast } from "react-hot-toast";
import { URL } from "@/utils/constants";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fname: "",
      lname: "",
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
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
      fname: Yup.string().required("*Required"),
      lname: Yup.string().required("*Required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await fetch(`${URL}/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        values = formik.initialValues;
        toast.success("successfully Signed Up!");
        setLoading(false);

        router.push("/auth/login");
      } catch (error) {
        console.error(error);
        toast.error("oops something went wrong!!");
      }
    },
  });

  //const router = useRouter();

  return (
    <>
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
          {loading ? (
            <Loader />
          ) : (
            <>
              <h1>Sign Up</h1>
              <div className="input-container">
                <label>First Name:</label>
                <div className="input-wrapper">
                  <input
                    placeholder="First Name:"
                    id="fname"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.fname}
                  />
                  {formik.touched.fname && formik.errors.fname ? (
                    <p className="input__error">{formik.errors.fname}</p>
                  ) : null}
                </div>
              </div>
              <div className="input-container">
                <label>Last Name:</label>
                <div className="input-wrapper">
                  <input
                    id="lname"
                    placeholder="Last Name:"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.lname}
                  />
                  {formik.touched.lname && formik.errors.lname ? (
                    <p className="input__error">{formik.errors.lname}</p>
                  ) : null}
                </div>
              </div>
              <div className="input-container">
                <label>Email:</label>
                <div className="input-wrapper">
                  <input
                    id="email"
                    placeholder="Enter your email:"
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
                    placeholder="Enter Password:"
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
              <div className="input-container">
                <label>Confirm Password:</label>
                <div className="input-wrapper">
                  <input
                    id="confirmPassword"
                    placeholder="Confirm Password:"
                    type="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                  />
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <p className="input__error">
                      {formik.errors.confirmPassword}
                    </p>
                  ) : null}
                </div>
              </div>
              <p className="auth-link__container">
                Already have an account
                <Link href={"/auth/login"} className="auth-link">
                  Login
                </Link>
                to continue
              </p>
              <motion.button whileTap={{ scale: 1.1 }} type="submit">
                Submit
              </motion.button>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
