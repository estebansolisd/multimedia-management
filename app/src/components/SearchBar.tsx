import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="py-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 mr-2"
        placeholder="Search..."
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
