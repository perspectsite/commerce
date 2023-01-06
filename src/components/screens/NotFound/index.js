import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="pt-10 mt-20 flex justify-center items-center not-found">
      <div className="text-center">
        <div className="py-3">
          <h6 className="text-2xl font-bold text-black dark:text-[#ccc] mb-1">
            Page not found
          </h6>
          <p className="text-gray-500 dark:text-[#ccc] mb-10">
            The page you’re looking for doesn’t exist.
          </p>
          <Link to="/" className="primary-clr pb-6 site-btn view-btn">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
