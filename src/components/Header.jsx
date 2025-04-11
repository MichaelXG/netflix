import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ theme, toggleTheme, onLogout }) => {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/" || location.pathname === "/login";

  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const avatarRef = useRef();

  useEffect(() => {
    const userRaw = localStorage.getItem("user");
    try {
      const user = JSON.parse(userRaw);
      setAvatarUrl(user?.avatar);
    } catch {
      setAvatarUrl(null);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setShowAvatarMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } px-6 py-3 flex items-center justify-between flex-wrap shadow fixed w-full z-50`}
    >
      {/* Logo sempre visível */}
      <Link to="/home" aria-label="Netflix">
        <span
          className={`text-2xl font-bold ${
            theme === "dark" ? "text-red-600" : "text-red-800"
          }`}
        >
          NETFLIX
        </span>
      </Link>

      {/* Se não for login, renderiza menu e ações */}
      {!isLoginPage && (
        <>
          {/* Botão mobile */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="sm:hidden ml-auto text-white"
            aria-label="Abrir menu"
          >
            ☰
          </button>

          {/* Navegação */}
          <nav
            className={`w-full sm:w-auto ${
              showMenu ? "block" : "hidden sm:flex"
            } gap-6 text-sm ml-0 sm:ml-6 mt-4 sm:mt-0`}
          >
            <Link to="/home">Início</Link>
            <Link to="/series">Séries</Link>
            <Link to="/filmes">Filmes</Link>
            <Link to="/bombando">Bombando</Link>
            <Link to="/my-list">Minha Lista</Link>
          </nav>

          {/* Ações do header */}
          <div className="flex items-center gap-3 mt-3 sm:mt-0 ml-auto sm:ml-0 relative">
            {/* Botão de busca */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Buscar"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 2a8 8 0 015.292 13.708l5 5-1.414 1.414-5-5A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z" />
              </svg>
            </button>

            {/* Campo de busca */}
            {showSearch && (
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-zinc-800 text-white px-2 py-1 rounded outline-none"
              />
            )}

            {/* Notificações */}
            <button aria-label="Notificações" className="relative">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a7 7 0 017 7v5.586l1.707 1.707a1 1 0 01-1.414 1.414L17 16H7l-2.293 2.293a1 1 0 01-1.414-1.414L5 14.586V9a7 7 0 017-7zm0 20a2 2 0 001.995-1.85L14 20h-4a2 2 0 001.85 1.995L12 22z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-600 text-xs px-1 rounded-full">
                11
              </span>
            </button>

            {/* Avatar e menu suspenso */}
            <div className="relative" ref={avatarRef}>
              <button onClick={() => setShowAvatarMenu((prev) => !prev)}>
                <img
                  src={avatarUrl || "/fallback.jpg"}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border border-white cursor-pointer"
                />
              </button>

              {showAvatarMenu && (
                <div className="absolute right-0 top-12 w-44 bg-zinc-800 text-white rounded shadow-md py-2 z-50">
                  <Link
                    to="/my-list"
                    className="block px-4 py-2 hover:bg-zinc-700 transition"
                    onClick={() => setShowAvatarMenu(false)}
                  >
                    Minha Lista
                  </Link>
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-700 transition text-red-400"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
