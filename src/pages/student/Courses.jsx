import React from "react";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import Course from "./Course";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "@/components/ui/skeleton";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();

  if (isError) {
    return (
      <h1 className="text-center py-20 text-2xl text-gray-700 dark:text-gray-400">
        Failed to load course details. Please refresh the page.
      </h1>
    );
  }

  return (
    <section className="w-full py-10 bg-slate-50 dark:bg-[#050816]">
      <div className="text-center mt-4 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
          Discover Courses That Help You Grow
        </h2>

        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-3 text-sm md:text-base">
          Learn from expert instructors and upgrade your skills with our curated
          collection of high-quality courses designed to accelerate your career.
        </p>

        <div className="w-24 h-[3px] bg-blue-600 dark:bg-blue-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {isLoading ? (
          <Carousel>
            <CarouselContent>
              {Array.from({ length: 6 }).map((_, index) => (
                <CarouselItem key={index} className="basis-80 pl-2">
                  <CourseSkeleton />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <Carousel
            className="w-full"
            opts={{
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 2500,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
          >
            <CarouselContent>
              {data?.courses?.map((course, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 pr-1 sm:pl-2 sm:pr-2 flex-none w-auto mx-auto"
                >
                  <Course course={course} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-0 cursor-pointer" />
            <CarouselNext className="right-0 cursor-pointer" />
          </Carousel>
        )}
      </div>
    </section>
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
