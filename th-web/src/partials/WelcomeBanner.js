import React from 'react';

function WelcomeBanner(props) {
  return (
    <div className="relative bg-indigo-200 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">

      {/* Background */}
      <div className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block" aria-hidden="true"></div>

      <div className="relative">
        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold mb-1">{props.text}</h1>
      </div>

    </div>
  );
}

export default WelcomeBanner;
