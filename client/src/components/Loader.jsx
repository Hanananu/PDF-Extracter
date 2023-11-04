import React, { useState, useEffect } from 'react';
import { PacmanLoader } from 'react-spinners';

const Loader = ({loading}) => {
  
  return (
    <div className='h-screen text-center'>
      <PacmanLoader color='#00abf0' size={25} loading={loading} />
    </div>
  );
};

export default Loader;
