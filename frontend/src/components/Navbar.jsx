import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 shadow-lg z-50 h-16 md:h-20">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-center h-full">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-yellow-400 tracking-wide select-none">
          PDF-DOST
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
