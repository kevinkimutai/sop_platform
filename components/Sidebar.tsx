"use client";
import React, { useState } from "react";

import { HiFolderOpen, HiHome, HiCog6Tooth, HiUsers } from "react-icons/hi2";
import { motion } from "framer-motion";

import "../styles/Sidebar.css";

const Sidebar = () => {
  const [active, setActive] = useState<string>("overview");
  function handleScrollClick(id: string) {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  }
  return (
    <aside className="sidebar">
      <ul>
        <li
          className={`${active === "overview" ? "active" : ""}`}
          onClick={() => handleScrollClick("overview")}
        >
          <HiHome className="sidebar-icon" />
          OverView
        </li>
        <li
          className={`${active === "sop" ? "active" : ""}`}
          onClick={() => handleScrollClick("sop")}
        >
          <HiFolderOpen className="sidebar-icon" />
          Sop's
        </li>
        <li
          className={`${active === "user" ? "active" : ""}`}
          onClick={() => handleScrollClick("user")}
        >
          <HiUsers className="sidebar-icon" />
          Users
        </li>
        <li
          className={`${active === "disease" ? "active" : ""}`}
          onClick={() => handleScrollClick("disease")}
        >
          <HiCog6Tooth className="sidebar-icon" />
          Disease
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
