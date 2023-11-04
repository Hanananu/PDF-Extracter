import React, { useState, useEffect, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants/constant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FileConverter = lazy(() => import("../components/FileConverter"));

const ViewPdf = () => {
  const { fileName } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // Retry configuration
    const maxRetries = 3;
    const retryDelay = 1000; // 1 second delay between retries
    let retries = 0;

    const fetchPdf = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/pdf/get/${fileName}.pdf`, {
          signal,
        });

        if (response.ok) {
          const blob = await response.blob();
          const pdfBlobUrl = URL.createObjectURL(blob);
          setPdfUrl(pdfBlobUrl);
          console.log("form viewpdf", pdfBlobUrl);
        } else {
          throw new Error("Failed to fetch PDF");
        }
      } catch (error) {
        if (controller.signal.aborted) {
          console.log("Request was aborted");
        } else if (retries < maxRetries) {
          // If not aborted and retries are within limit, retry after a delay
          retries++;
          setTimeout(fetchPdf, retryDelay);
        } else {
          // If retries exceed the limit, show an error toast
          toast.error('Failed to fetch PDF. Maximum retries reached.');
          throw new Error("Maximum retries reached");
        }
      }
    };

    fetchPdf();

    return () => {
      controller.abort();
    };
  }, [fileName]);

  

  return (
    <div className="bg-gray-100 h-[480px] mt-20">
      <Suspense fallback={<div>Loading...</div>}>
        {pdfUrl && <FileConverter pdfUrl={pdfUrl} fileName={fileName} />}
      </Suspense>
    </div>
  );
};

export default ViewPdf;
