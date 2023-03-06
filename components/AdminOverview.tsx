"use client";

import React from "react";
import {
  HiOutlineFolder,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
  HiPuzzlePiece,
} from "react-icons/hi2";

import { motion } from "framer-motion";

import "../styles/AdminOverview.css";
import Overview from "./Overview";
import { HiOutlineCubeTransparent } from "react-icons/hi";

// const sampleData = [
//   {
//     icon: <HiOutlineFolder className="overview-icon " />,
//     title: "Total Sop Documents",
//     total: 200,
//   },
//   {
//     icon: <HiOutlineUsers className="overview-icon " />,
//     title: "Total Users",
//     total: 56,
//   },
//   {
//     icon: <HiOutlineCog6Tooth className="overview-icon " />,
//     title: "Programs",
//     total: 12,
//   },
//   {
//     icon: <HiPuzzlePiece className="overview-icon " />,
//     title: "Partners",
//     total: 5,
//   },
// ];

const AdminOverview = () => {
  return (
    <section className="overview-section">
      <h1>Quick Overview</h1>
      <div className="overview-container">
        <Overview
          icon={<HiOutlineFolder className="overview-icon " />}
          url={"sop"}
          title={"Total SOP documents"}
        />
        <Overview
          icon={<HiOutlineUsers className="overview-icon " />}
          url={"user"}
          title={"Total Users"}
        />
        <Overview
          icon={<HiOutlineCubeTransparent className="overview-icon " />}
          url={"disease"}
          title={"Infectious Diseases"}
        />

        {/* {sampleData.map((data) => {
          return (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="overview"
              key={data.title}
            >
              <div className="icon-container">{data.icon}</div>
              <div className="overview-title">{data.title}</div>
              <div className="overview-total">{data.total}</div>
            </motion.div>
          );
        })} */}
      </div>
    </section>
  );
};

export default AdminOverview;
