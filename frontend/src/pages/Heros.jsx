import React from "react";

const Heros = ({ onGetStarted }) => (
  <section className="flex flex-col items-center text-center py-16 px-4 bg-yellow-100 rounded-md">
    <h1 className="text-4xl font-bold mb-4">
      Welcome to <span className="text-yellow-600">PDF-DOST</span>
    </h1>
    <p className="text-gray-600 max-w-xl mb-6">
      Upload a PDF and ask your AI assistant anything about it.
    </p>
    <button
      onClick={onGetStarted}
      className="bg-blue-500 text-white px-6 py-3 rounded-md"
    >
      Get Started
    </button>
  </section>
);

export default Heros;
