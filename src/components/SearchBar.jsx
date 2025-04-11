import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Buscar filmes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-3 py-2 border rounded w-full text-black"
      />
      <button type="submit" className="bg-red-600 text-white px-4 rounded">
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
