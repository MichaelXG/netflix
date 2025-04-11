import { useEffect, useState } from 'react';

export function useFavorites() {
  const user = localStorage.getItem('user') || 'anon';
  const KEY = `favorites_${user}`;
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(KEY)) || [];
    setFavorites(stored);
  }, [KEY]);

  const toggleFavorite = (movie) => {
    const exists = favorites.some((m) => m.id === movie.id);
    const updated = exists
      ? favorites.filter((m) => m.id !== movie.id)
      : [...favorites, movie];

    setFavorites(updated);
    localStorage.setItem(KEY, JSON.stringify(updated));
  };

  const isFavorite = (id) => favorites.some((m) => m.id === id);

  return { favorites, toggleFavorite, isFavorite };
}
