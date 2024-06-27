
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentList from '../components/ContentList';
import SearchBar from '../components/SearchBar';

const HomePage: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <button className="bg-blue-500 text-white p-2" onClick={() => navigate("/create-content")}>Create new content +</button>
      <ContentList />
    </div>
  );
};

export default HomePage;
