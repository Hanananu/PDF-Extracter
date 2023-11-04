// BlobContext.js
import React, { createContext, useContext, useState } from 'react';

const BlobContext = createContext();

export const BlobProvider = ({ children }) => {
  const [blobUrl, setBlobUrl] = useState(null);

  const setBlob = (url) => {
    setBlobUrl(url);
  };

  return (
    <BlobContext.Provider value={{ blobUrl, setBlob }}>
      {children}
    </BlobContext.Provider>
  );
};

export const useBlob = () => {
  const context = useContext(BlobContext);
  if (!context) {
    throw new Error('useBlob must be used within a BlobProvider');
  }
  return context;
};
