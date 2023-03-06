"use client";

import React from "react";

import { HiMenu } from "react-icons/hi";

import "../styles/Navbar.css";

import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="navbar-container">
      {/*LOGO */}
      <div className="logo">
        <img src="/logo.jpg" alt="logo-image" className="logo-img" />
      </div>

      {/* Users Profile */}
      <div className="navbar_user-section">
        <div className="user-profile__container">
          {session ? (
            <>
              <div className="user-profile__img-container">
                <img src="/avatar.png" alt="logo-image" />
              </div>

              <span>
                {/*@ts-ignore */}
                {session.user?.fname} {session.user.lname}
              </span>
              {/*TODO:STYLE signout BUTTON*/}
              <button
                onClick={() => {
                  signOut();
                }}
              >
                SIGNOUT
              </button>
            </>
          ) : (
            <button className="sign-in__btn" onClick={() => signIn()}>
              sign in
            </button>
          )}
        </div>
        <button className="hamburger-btn">
          <HiMenu className="hamburger-icon" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
