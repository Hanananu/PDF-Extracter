import React, { useState, useEffect } from 'react';
import { DocumentIcon } from '@heroicons/react/24/solid';

const ExtractButton = ({ selectedPages, fileName }) => {

  // State to manage loading state
  const [loading, setLoading] = useState(false);
  console.log(selectedPages,fileName);

  // Function to handle extraction
  const handleExtract = async ({selectedPages,fileName}) => {
    // Create an AbortController to handle potential request abort
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      setLoading(true);
    //   // Send a POST request to the extraction API
    //   const response = await fetch('/your-extraction-api-endpoint', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       selectedPages,
    //       fileName,
    //     }),
    //     signal,
    //   });

    //   // Parse the response
    //   const data = await response.json();
    //   console.log(data);

    //   // Trigger download of the new PDF file
    //   window.location.href = `/your-download-api-endpoint/${data.newPdfFileName}`;
    // } catch (error) {
    //   // Handle errors, including potential abort
    //   if (error.name === 'AbortError') {
    //     console.log('Request was aborted');
    //   } else {
    //     console.error('Error during extraction:', error);
    //   }
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      {/* Extract button */}
      <button
        onClick={handleExtract}
        disabled={loading}
        className={`btn-bg px-4 py-2 rounded-full ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        } sm:px-6 sm:py-3`}
      >
        {loading ? (
          // Loading spinner
          <span className="flex items-center">
            Loading...
            <span className="animate-spin ml-2">⚙️</span>
          </span>
        ) : (
          // Download icon and text
          <span className="flex items-center bg-blue-700 text-white px-2 py-2 rounded-md hover:bg-blue-400 font-semibold text-base hover:text-black ">
            <DocumentIcon className="h-5 w-5 sm:h-6 sm:w-6 mr-1" />
            Extract Pages
          </span>
        )}
      </button>
    </div>
  );
};

export default ExtractButton;
