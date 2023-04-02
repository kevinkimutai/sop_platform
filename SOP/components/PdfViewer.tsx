import React from "react";

import { Worker } from "@react-pdf-viewer/core";

// Import the main component
import { Viewer } from "@react-pdf-viewer/core";

import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
// Import styles
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import "../styles/PdfViewer.css";

const PdfViewer = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div className="pdf-container">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
        <Viewer fileUrl="/covid_sop-sample.pdf" />;
      </Worker>
    </div>
  );
};

export default PdfViewer;
