import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./components/Login";
import Home from "./components/Home";
import FavoritesPage from "./components/FavoritesPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MovieDetail from "./components/MovieDeTail";
import Series from "./components/Series";
import Filmes from "./components/Filmes";
import Bombando from "./components/Bombando";

// Componente que acessa a rota atual
function AppContent({ loggedIn, setLoggedIn, theme, toggleTheme }) {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/";

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
  };

  const RequireAuth = ({ children }) => {
    return loggedIn ? children : <Login onLogin={() => setLoggedIn(true)} />;
  };

  return (
    <>
      {!isLoginPage && (
        <Header
          loggedIn={loggedIn}
          onLogout={handleLogout}
          toggleTheme={toggleTheme}
          theme={theme}
        />
      )}

      <main className="main-content">
        <Routes>
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home
                  onLogout={handleLogout}
                  theme={theme}
                  toggleTheme={toggleTheme}
                />
              </RequireAuth>
            }
          />
          <Route
            path="/favoritos"
            element={
              <RequireAuth>
                <FavoritesPage />
              </RequireAuth>
            }
          />
          <Route
            path="/details/:type/:id"
            element={
              <RequireAuth>
                <MovieDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/series"
            element={
              <RequireAuth>
                <Series />
              </RequireAuth>
            }
          />
          <Route
            path="/filmes"
            element={
              <RequireAuth>
                <Filmes />
              </RequireAuth>
            }
          />
          <Route
            path="/bombando"
            element={
              <RequireAuth>
                <Bombando />
              </RequireAuth>
            }
          />
          <Route
            path="/my-list"
            element={
              <RequireAuth>
                <FavoritesPage />
              </RequireAuth>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={<Login onLogin={() => setLoggedIn(true)} />}
          />
        </Routes>
      </main>

      {!isLoginPage && <Footer />}
    </>
  );
}

export default function AppWrapper() {
  const [loggedIn, setLoggedIn] = useState(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return !!user?.name;
    } catch {
      return false;
    }
  });

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <BrowserRouter>
      <AppContent
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </BrowserRouter>
  );
}
