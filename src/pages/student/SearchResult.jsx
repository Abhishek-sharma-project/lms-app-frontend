import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4">
      <Link
        to={`/course-details/${course._id}`}
        className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
      ></Link>
    </div>
  );
};

export default SearchResult;
