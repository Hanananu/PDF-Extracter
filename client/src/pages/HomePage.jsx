import React, { useState, useEffect } from "react";
import FileUploadForm from "../components/FileUploadForm";
import Summary from "../components/Summary";
import Loader from "../components/Loader";


const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a 2-second delay
    const delay = 3000;
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          <FileUploadForm />
          <Summary />
        </>
      )}
    </>
  );
};

export default HomePage;
