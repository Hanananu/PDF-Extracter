import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../constants/constant';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FileConverter = lazy(() => import('../components/FileConverter'));

const ViewPdf = () => {
  const { fileName } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    // Create an AbortController and get its signal
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchPdf = async () => {
      try {
        // Make the fetch request with the AbortController's signal
        const response = await fetch(`${BACKEND_URL}/pdf/get/${fileName}.pdf`, { signal });

        if (response.ok) {
          // If the response is okay, proceed with handling the data
          const blob = await response.blob();
          const pdfBlobUrl = URL.createObjectURL(blob);
          setPdfUrl(pdfBlobUrl);
        } else {
          // If the response is not okay, throw an error to trigger the catch block
          throw new Error('Failed to fetch PDF');
        }
      } catch (error) {
        console.error('Error fetching PDF:', error);

        // Check if the request was aborted
        if (controller.signal.aborted) {
          console.log('Request was aborted');
        } else {
          // If not aborted, show an error toast and make another request
          toast.error('Failed to fetch PDF. Retrying...');
          fetchPdf();
        }
      }
    };

    // Call the fetchPdf function
    fetchPdf();

    // Cleanup function to abort the request if the component unmounts
    return () => {
      controller.abort();
    };
  }, [fileName]);

  return (
    <div className="bg-gray-100 h-[480px] mt-20">
      <Suspense fallback={<div>Loading...</div>}>
        {pdfUrl && <FileConverter pdfUrl={pdfUrl} fileName={fileName} />}
      </Suspense>
      <ToastContainer />
    </div>
  );
};

export default ViewPdf;
