import { useAuth } from "@/context/AuthContext";
import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ContentList from "../components/ContentList";
import debounce from "../utils/debounce";

const Home: React.FC = () => {
  const [filterValue, setFilterValue] = useState<string>("");
  const [filterType, setFilterType] = useState<"category" | "theme" | "content">(
    "category"
  );
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilterValue(event.target.value);
    },
    []
  );

  const debouncedHandleFilterChange = useMemo(
    () => debounce(handleFilterChange, 300),
    [handleFilterChange]
  );

  const handleFilterTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterType(event.target.value as "category" | "theme" | "content");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4 font-extrabold">Home Page</h1>
      <div className="flex gap-4">
        <button
          className="bg-blue-500 text-white p-2 mb-4"
          onClick={() => navigate("/create/content")}
        >
          Create new content +
        </button>
        {user?.role === "admin" && (
          <>
            <button
              className="bg-green-500 text-white p-2 mb-4"
              onClick={() => navigate("/create/category")}
            >
              Create new category +
            </button>
            <button
              className="bg-orange-500 text-white p-2 mb-4"
              onClick={() => navigate("/create/theme")}
            >
              Create new theme +
            </button>
          </>
        )}
      </div>
      <div className="mb-4 flex items-center">
        <label className="mr-2">Search by:</label>
        <select
          onChange={handleFilterTypeChange}
          className="mr-4 p-2 border rounded"
        >
          <option value="category">Category</option>
          <option value="theme">Theme</option>
          <option value="content">Content</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${filterType}`}
          onChange={debouncedHandleFilterChange}
          className="p-2 border rounded flex-1"
        />
      </div>
      <ContentList filterType={filterType} filterValue={filterValue} />
    </div>
  );
};

export default Home;
