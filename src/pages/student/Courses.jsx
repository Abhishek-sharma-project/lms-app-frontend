import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Course from "./Course";

const Courses = () => {
  const courses = [1, 2, 3, 4, 5, 6, 7, 8];
  const isLoading = false;
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index}></CourseSkeleton>
              ))
            : courses.map((_, i) => <Course key={i}></Course>)}
        </div>
      </div>
    </div>
  );
};

export default Courses;

export const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36 bg-gray-200 dark:bg-gray-700"></Skeleton>
      <div className="p-4 space-y-2">
        <Skeleton className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700"></Skeleton>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700"></Skeleton>
            <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-700"></Skeleton>
          </div>
          <Skeleton className="h-4 w-16 bg-gray-200 dark:bg-gray-700"></Skeleton>
        </div>
        <Skeleton className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700"></Skeleton>
      </div>
    </div>
  );
};
