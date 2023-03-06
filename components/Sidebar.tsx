import React from "react";

import {
  HiFolderOpen,
  HiHome,
  HiOutlineCog6Tooth,
  HiOutlineUsers,
} from "react-icons/hi2";
import { motion } from "framer-motion";

import "../styles/Sidebar.css";

const Sidebar = () => {
  function handleScrollClick() {
    const section = document.querySelector("#my-section")!;
    section.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <aside className="sidebar">
      <ul>
        <li className="active">
          <HiHome className="sidebar-icon" />
          OverView
        </li>
        <li>
          <HiFolderOpen className="sidebar-icon" />
          Sop's
        </li>
        <li>
          <HiOutlineUsers className="sidebar-icon" />
          Users
        </li>
        <li>
          <HiOutlineCog6Tooth className="sidebar-icon" />
          Program
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
