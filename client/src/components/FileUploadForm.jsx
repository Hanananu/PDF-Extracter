// FileUploadForm Component: Handles the upload of PDF files and displays toast messages based on server responses.

import React, { useRef, useEffect, ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants/constant";
import { toast } from "react-toastify";
import LoadingBar from "react-top-loading-bar";

const FileUploadForm = () => {
  const fileInputRef = useRef(null);
  const controllerRef = useRef(new AbortController());
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  useEffect(() => {
    return () => {
      // Cleanup: Abort the ongoing request if the component unmounts
      controllerRef.current.abort();
    };
  }, []);

  const handleFileChange = async (e) => {
    setLoading(true);

    // Abort the previous request before starting a new one
    controllerRef.current.abort();

    const selectedFile = e.target.files && e.target.files[0];

    // Perform PDF validation
    if (selectedFile && selectedFile.type === "application/pdf") {
      const formData = new FormData();
      formData.set("pdf", selectedFile);

      // Create a new AbortController for the current request
      controllerRef.current = new AbortController();

      try {
        const response = await fetch(`${BACKEND_URL}/pdf/upload`, {
          method: "POST",
          body: formData,
          signal: controllerRef.current.signal,
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("File uploaded successfully");
          router(`view-pdf/${data?.fileWithOutExtension}`);
        } else {
          throw new Error(`File upload failed: ${data.message}`);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          // Handle abort (e.g., don't display an error message)
        } else {
          toast.error(`File upload failed: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    } else {
      // Handle invalid file type (not a PDF)
      toast.error("Please select a valid PDF file.");
    }
  };

  const handleButtonClick = () => {
    // Trigger file input click programmatically
    fileInputRef.current && fileInputRef.current.click();
  };

  return (
    <section className="bg-gray-100 h-56 mt-20">
      <LoadingBar color="#f11946" progress={loading ? 50 : 0} height={6} />
      <div className="text-center text-2xl sm:text-4xl px-2 py-5">
        <h1 className="font-extrabold text-black">Split PDF</h1>
      </div>
      <div className="flex items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-gray-100 p-6 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>

          <p className="mt-2 text-gray-500 tracking-wide">Upload or drag PDF</p>

          <input
            id="dropzone-file"
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf"
          />
        </label>
      </div>
    </section>
  );
};

export default FileUploadForm;
