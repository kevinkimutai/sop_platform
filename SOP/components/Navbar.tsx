//@ts-nocheck
"use client";

import React from "react";

import { HiMenu } from "react-icons/hi";
import { motion } from "framer-motion";

import "../styles/Navbar.css";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { HiUserCircle } from "react-icons/hi2";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="navbar-container">
      {/*LOGO */}
      <div className="logo">
        <Link href={"/"}>
          <img src="/logo.jpg" alt="logo-image" className="logo-img" />
        </Link>
      </div>

      {/* Users Profile */}
      <div className="navbar_user-section">
        <div className="user-profile__container">
          {session ? (
            <>
              <div className="user-profile__img-container">
                <img src="/avatar.png" alt="logo-image" />
              </div>

              <span>{session.user.user.fname}</span>
              {/*TODO:STYLE signout BUTTON*/}
              <motion.button
                whileTap={{ scale: 1.1 }}
                whileHover={{ scale: 1.1 }}
                className="sign-out__btn"
                onClick={() => {
                  signOut();
                }}
              >
                SIGNOUT
              </motion.button>
            </>
          ) : (
            <motion.button
              whileTap={{ scale: 1.1 }}
              whileHover={{ scale: 1.1 }}
              className="sign-in__btn"
              onClick={() => signIn()}
            >
              <HiUserCircle className="sign-in__icon" /> sign in
            </motion.button>
          )}
        </div>
        {/* <motion.button whileHover={{ scale: 1.1 }} className="hamburger-btn">
          <HiMenu className="hamburger-icon" />
        </motion.button> */}
      </div>
    </nav>
  );
};

export default Navbar;
