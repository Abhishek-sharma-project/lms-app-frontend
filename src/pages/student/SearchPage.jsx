import React from "react";
import FilterPage from "./FilterPage";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import SearchResult from "./SearchResult";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";

const SearchPage = () => {
  const { data, isLoading } = useGetSearchCourseQuery();
  const isEmpty = false;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="my-6">
        <h1>result for "html</h1>
        <p>
          Showing results for{" "}
          <span className="text-blue-800 font-bold italic">
            Frontend developer
          </span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <FilterPage></FilterPage>
        <div className="flex-1">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <CourseCardSkeleton key={i}></CourseCardSkeleton>
            ))
          ) : isEmpty ? (
            <CourseNotFound></CourseNotFound>
          ) : (
            [1, 2, 3, 4].map((_, i) => <SearchResult key={i}></SearchResult>)
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseCardSkeleton = () => {
  return (
    <div className="w-full flex justify-center mb-4">
      <Card className="w-[80%] rounded-xl shadow-sm">
        <CardContent className="p-4 space-y-4">
          <Skeleton className="h-10 w-full rounded-lg" />

          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CourseNotFound = () => {
  return (
    <div className="w-full flex justify-center mt-10 lg:mt-20 px-4">
      <Card className="w-full max-w-[600px] p-6 text-center shadow-sm rounded-xl">
        <CardContent className="flex flex-col items-center space-y-4">
          <AlertCircle className="h-12 w-12 text-gray-500" />

          <h2 className="text-xl font-semibold">Course Not Found</h2>

          <p className="text-gray-600 text-sm">
            We couldn't find any course matching your search.
          </p>

          <Button variant="link" className="mt-2 italic">
            <Link to="/" className="italic">
              Browse all courses
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
