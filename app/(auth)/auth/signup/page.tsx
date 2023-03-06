"use client";

import React from "react";

import "../../../../styles/auth.css";
import Link from "next/link";
import { motion } from "framer-motion";

const SignUpPage = () => {
  return (
    <>
      {" "}
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
        <form className="auth-container">
          <h1>Sign Up</h1>
          <div className="input-container">
            <label>Email:</label>
            <div className="input-wrapper">
              <input placeholder="Enter your email:" />
            </div>
          </div>
          <div className="input-container">
            <label>Password:</label>
            <div className="input-wrapper">
              <input placeholder="Enter Password:" />
            </div>
          </div>
          <div className="input-container">
            <label>Confirm Password:</label>
            <div className="input-wrapper">
              <input placeholder="Confirm Password:" />
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
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
