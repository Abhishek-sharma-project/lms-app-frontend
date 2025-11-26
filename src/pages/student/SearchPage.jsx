import React, { useEffect, useState } from "react";
import FilterPage from "./FilterPage";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import SearchResult from "./SearchResult";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const isMobile = window.innerWidth < 768;
  const limit = isMobile ? 3 : 6;

  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    categories: [],
    sortByPrice: "",
  });

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: filters.categories,
    sortByPrice: filters.sortByPrice,
    page,
    limit,
  });

  const isEmpty = !isLoading && data?.courses.length === 0;

  const handleFilterChange = (categories, price) => {
    setFilters({
      categories,
      sortByPrice: price,
    });
    setPage(1);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="pt-5 md:pt-0 md:h-auto md:overflow-visible h-[calc(100vh-80px)] overflow-y-auto">
      <div className="max-w-7xl mx-auto p-4 md:p-8 mt-5">
        <div className="my-6">
          <h1 className="font-bold text-xl md:text-2xl">
            result for "{query}"
          </h1>
          <p>
            Showing results for {" "}
            <span className="text-blue-800 font-bold italic">
              {query || ` ""`}
            </span>
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          <FilterPage
            selectedCategories={filters.categories}
            sortByPrice={filters.sortByPrice}
            onFilterChange={handleFilterChange}
          ></FilterPage>
          <div className="flex-1">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <CourseCardSkeleton key={i}></CourseCardSkeleton>
              ))
            ) : isEmpty ? (
              <CourseNotFound></CourseNotFound>
            ) : (
              data?.courses?.map((course) => (
                <SearchResult key={course._id} course={course}></SearchResult>
              ))
            )}

            {/* Pagination */}
            {!isLoading && !isEmpty && (
              <div className="flex items-center justify-center gap-4 my-6">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
                >
                  Prev
                </button>

                <span className="font-semibold">
                  Page {page} of {data?.totalPages}
                </span>

                <button
                  onClick={() =>
                    setPage((prev) =>
                      prev < data?.totalPages ? prev + 1 : prev
                    )
                  }
                  disabled={page === data?.totalPages}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>
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
      <Card className="w-full max-w-full p-6 text-center shadow-sm rounded-xl">
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
