import React, { useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { useLazyGetSuggestionQuery } from "@/features/api/courseApi";
import { useNavigate } from "react-router-dom";

const MobileSearch = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [getSuggestion] = useLazyGetSuggestionQuery();
  const navigate = useNavigate();

  let time;

  const handleInputChange = (e) => {
    const text = e.target.value;
    setSearchQuery(text);

    clearTimeout(time);

    time = setTimeout(async () => {
      if (!text.trim()) {
        setSuggestions([]);
        return;
      }
      const response = await getSuggestion(text);
      if (response?.data?.suggestion) {
        setSuggestions(response.data.suggestion);
      }
    }, 300);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;

    navigate(`/course/search?query=${searchQuery}`);
    setOpen(false);
    setSuggestions([]);
  };

  const handleSuggestionClick = (title) => {
    navigate(`/course/search?query=${title}`);
    setOpen(false);
    setSearchQuery("");
    setSuggestions([]);
  };

  return (
    <div className="md:hidden">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <Search size={22} className="text-gray-700 dark:text-gray-300" />
        </button>
      )}

      {open && (
        <div
          className="absolute top-0 left-0 right-0 bg-gray-50 dark:bg-[#141414] 
                        h-16 flex items-center gap-3 px-4 z-50 shadow-md"
        >
          <button onClick={() => setOpen(false)}>
            <ArrowLeft
              size={22}
              className="text-gray-700 dark:text-gray-300 cursor-pointer"
            />
          </button>

          <form onSubmit={handleSearchSubmit} className="flex-1">
            <input
              autoFocus
              value={searchQuery}
              onChange={handleInputChange}
              type="text"
              placeholder="Search courses..."
              className="w-full px-3 py-2 rounded-lg border border-gray-400 
                         dark:border-gray-700 dark:bg-[#1a1a1a] outline-none"
            />
          </form>
        </div>
      )}

      {open && searchQuery && suggestions.length > 0 && (
        <ul
          className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 
                       max-h-60 overflow-y-auto shadow-lg border border-gray-300 
                       dark:border-gray-700 z-50"
        >
          {suggestions.map((item) => (
            <li
              key={item._id}
              onClick={() => handleSuggestionClick(item.courseTitle)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {item.courseTitle}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MobileSearch;
