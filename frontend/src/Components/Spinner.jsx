import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center relative ">
      <div className="absolute bottom-96 sm:bottom-56 animate-spin rounded-full h-44 w-44 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default Spinner;
