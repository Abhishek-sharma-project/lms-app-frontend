import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLazyGetSuggestionQuery } from "@/features/api/courseApi";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [getSuggestion] = useLazyGetSuggestionQuery();
  const navigate = useNavigate();

  let time;

  //Autocomplete logic with debounce
  const handleInputChange = (e) => {
    const text = e.target.value;
    setSearchQuery(text);

    clearTimeout(time);

    time = setTimeout(async () => {
      if (text.trim().length === 0) {
        setSuggestions([]);
        return;
      }

      const response = await getSuggestion(text);
      if (response?.data?.suggestion) setSuggestions(response.data.suggestion);
    }, 300);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
    setSuggestions([]);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 py-24 px-6 text-center">
      {/* Subtle background accents */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-16 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
          Prepare for a{" "}
          <span className="text-blue-300 font-semibold">Brighter Future</span>
        </h1>

        <p className="text-gray-200 dark:text-gray-300 text-lg md:text-xl mb-12 leading-relaxed">
          Access world-class courses and build career-ready skills with our
          industry-focused learning platform.
        </p>

        {/* Search box */}
        <form
          onSubmit={searchHandler}
          className="flex items-stretch bg-white/95 dark:bg-gray-900 rounded-full shadow-2xl overflow-hidden max-w-2xl mx-auto mb-10 backdrop-blur"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search courses, topics or instructors"
            className="flex-grow bg-transparent border-none focus:outline-none px-6 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <Button
            type="submit"
            className="rounded-none cursor-pointer rounded-r-full bg-blue-600 dark:bg-blue-700 text-white px-8 hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors font-semibold"
          >
            Search
          </Button>
        </form>

        {/* Suggestions Dropdown */}
        {searchQuery && suggestions.length > 0 && (
          <ul
            className="absolute left-1/2 -translate-x-1/2 w-full max-w-2xl  
                 bg-white dark:bg-gray-800 shadow-lg rounded-xl 
                 max-h-60 overflow-y-auto z-50 text-left border border-gray-200 
                 dark:border-gray-700 -mt-6"
          >
            {suggestions.map((item) => (
              <li
                key={item._id}
                onClick={() => {
                  setSearchQuery(item.courseTitle);
                  navigate(`/course/search?query=${item.courseTitle}`);
                  setSuggestions([]);
                }}
                className="px-4 py-2 cursor-pointer 
                   hover:bg-gray-100 dark:hover:bg-gray-700
                   border-b border-gray-200 dark:border-gray-700 
                   last:border-none"
              >
                {item.courseTitle}
              </li>
            ))}
          </ul>
        )}

        <Button
          onClick={() => navigate("/course/search?query")}
          size="lg"
          className="bg-white dark:bg-gray-900 text-blue-700 font-medium rounded-full px-10 py-4 cursor-pointer shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          Browse All Courses
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
