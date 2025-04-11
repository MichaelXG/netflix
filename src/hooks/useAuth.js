import { useEffect, useState } from 'react';

const USER_KEY = 'tmdb_user';

export function useAuth() {
  const [user, setUser] = useState(null);

  // Carrega o usuário salvo no localStorage ao iniciar
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem(USER_KEY));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Realiza login salvando o usuário
  const login = (username) => {
    const newUser = { username };
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    setUser(newUser);
  };

  // Faz logout limpando o localStorage
  const logout = () => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  // Verifica se está logado
  const isLoggedIn = !!user;

  return { user, login, logout, isLoggedIn };
}
