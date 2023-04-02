"use client";

import React from "react";
import { HiArchiveBox, HiPencilSquare } from "react-icons/hi2";
import PdfViewer from "@/components/PdfViewer";

import "../../../../styles/specifiSopPage.css";

const specificSOPPage = () => {
  return (
    <div className="specificSop-container">
      <PdfViewer />
      <div className="pdf-description">
        <h1 className="title-section">Covid 19 SOP</h1>
        <p className="sop_program-name">UNITAID CAPTB</p>
        <p className="sop_program-desc">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et incidunt
          vero iure autem dicta nisi alias facilis doloribus eius. At dolores
          perspiciatis perferendis aspernatur dolorum eius tempora ducimus quo
          asperiores!
        </p>
        <div className="sop_program-admin-actions">
          <button>
            <HiArchiveBox className="action-icon" />
            Delete
          </button>
          <button>
            <HiPencilSquare className="action-icon" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default specificSOPPage;
