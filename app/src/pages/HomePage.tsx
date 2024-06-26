
import React, { useState } from 'react';
import ContentList from '../components/ContentList';
import SearchBar from '../components/SearchBar';

const HomePage: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ContentList />
    </div>
  );
};

export default HomePage;
