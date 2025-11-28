import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authApi";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();

  const myLearning = data?.user?.enrolledCourse || [];

  return (
    <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
      <h1 className="font-bold text-2xl">My Learning</h1>
      <div className="my-5">
        {isLoading ? (
          <LearningSkeleton></LearningSkeleton>
        ) : myLearning.length === 0 ? (
          <p>You are not enrolled in any courses.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {myLearning.map((course, i) => (
              <Course key={i} course={course}></Course>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

const LearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array(3)
      .fill(0)
      .map((_, i) => (
        <div
          key={i}
          className="p-4 bg-white dark:bg-gray-800 rounded shadow animate-pulse"
        >
          <div className="h-28 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded mb-1 w-3/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-1 w-full"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        </div>
      ))}
  </div>
);
