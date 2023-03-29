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
