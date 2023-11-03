import React from "react";



const Summary = () => {
  return (
    <section className="text-black bg-gray-100 px-4" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8  xl:gap-16 sm:py-16 ">
      <p className="text-base lg:text-lg break-words">
          Separate and extract PDF pages online for free. You won’t need to download any expensive software; you only need a browser and an internet connection.
          </p>        
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <p className="text-base lg:text-lg break-words">
          Effortlessly split and extract pages from your PDF documents online without the need for costly software. All you require is a web browser and an internet connection—no downloads necessary          </p>
        </div>
      </div>
    </section>
  );
};

export default Summary;