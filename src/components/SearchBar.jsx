import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useLazyGetSuggestionQuery } from "@/features/api/courseApi";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
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
    if (!searchQuery.trim()) return;
    navigate(`/course/search?query=${searchQuery}`);
    setSuggestions([]);
  };

  const handleSuggestionClick = (title) => {
    navigate(`/course/search?query=${title}`);
    setSearchQuery("");
    setSuggestions([]);
  };

  return (
    <div className="relative w-64 md:w-80 lg:w-96">
      <form onSubmit={handleSearchSubmit}>
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
          size={18}
        />

        <Input
          value={searchQuery}
          onChange={handleInputChange}
          type="text"
          placeholder="Search courses..."
          className="pl-10 rounded-xl border border-gray-400 dark:border-gray-700 dark:bg-[#1a1a1a]
                     focus-visible:ring-2 focus-visible:ring-blue-500 transition"
        />
      </form>

      {searchQuery && suggestions.length > 0 && (
        <ul
          className="absolute w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl mt-2 
                     max-h-60 overflow-y-auto z-50 border border-gray-300 dark:border-gray-700"
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

export default SearchBar;
