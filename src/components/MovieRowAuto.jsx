import { useRef, useState, useEffect } from "react";
import { fetchByGenre, fetchPopular } from "../api/tmdb";
import MovieCard from "./MovieCard";

const MovieRowAuto = ({ title, genreId = null, type = "movie", items: externalItems = null }) => {
  const scrollRef = useRef();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const addUniqueItems = (newItems) => {
    setItems((prev) => {
      const existingIds = new Set(prev.map((item) => item.id));
      const filtered = newItems.filter((item) => !existingIds.has(item.id));
      return [...prev, ...filtered];
    });
  };

  const loadItems = async () => {
    if (loading || externalItems) return; // ⛔ não carrega se já veio por prop
    setLoading(true);
    try {
      const response = genreId
        ? await fetchByGenre(genreId, type, page)
        : await fetchPopular(type, page);
      addUniqueItems(response.results);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Erro ao carregar itens:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!externalItems) {
      loadItems();
    } else {
      setItems(externalItems); // ✅ usa os dados fixos se vierem por prop
    }
  }, [externalItems]);

  useEffect(() => {
    if (externalItems) return; // ⛔ sem scroll dinâmico se fixo
    const container = scrollRef.current;
    const handleScroll = () => {
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 50
      ) {
        loadItems();
      }
    };
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [items, externalItems]);

  const scroll = (offset) => {
    scrollRef.current.scrollLeft += offset;
  };

  return (
    <div className="mb-12">
      {/* Título */}
      <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
      </div>

      {/* Carrossel com botões */}
      <div className="relative">
        {/* Botão Esquerda */}
        <button
          onClick={() => scroll(-scrollRef.current.clientWidth / 6)}
          className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 h-full w-10 bg-gradient-to-r from-black/80 to-transparent flex items-center justify-center text-white hover:scale-110 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Lista */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide p-4 md:p-12"
          style={{ scrollBehavior: "smooth" }}
        >
          {items.map((item) => (
            <MovieCard key={`${type}-${item.id}`} movie={item} type={type} />
          ))}
        </div>

        {/* Botão Direita */}
        <button
          onClick={() => scroll(300)}
          className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2 h-full w-10 bg-gradient-to-l from-black/80 to-transparent flex items-center justify-center text-white hover:scale-110 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MovieRowAuto;
