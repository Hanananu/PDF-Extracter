import React, { useState, useEffect } from 'react';
import { PacmanLoader } from 'react-spinners';

const Loader = ({loading}) => {
  
  return (
    <div className='h-[515px] flex items-center justify-center'>
      <PacmanLoader color='#00abf0' size={35} loading={loading} />
    </div>
  );
};

export default Loader;
