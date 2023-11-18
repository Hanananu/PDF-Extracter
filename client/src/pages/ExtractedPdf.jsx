import React, { useEffect } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { useBlob } from "../context/BlobContext";

const ExtractedPdf = () => {
  const { blobUrl } = useBlob();
  const plugin = defaultLayoutPlugin();

  useEffect(() => {
    // Handle any additional logic with the Blob URL if needed
  }, [blobUrl]);


  if(!blobUrl){
    throw new Error("Please Extract Pdf")
  }
  return (
     
    <div className="max-w-full  mt-20 bg-gray-100 ">
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@latest/build/pdf.worker.min.js`}
      >
        <div className="w-full  overflow-y-auto">
        {blobUrl && (
          <Viewer
            fileUrl={blobUrl}
            plugins={[plugin]}
          />
        )}
        </div>
      </Worker>
    </div>
  );
};

export default ExtractedPdf;
