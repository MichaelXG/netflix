import { getFavorites } from "../utils/favoritesUtils";
import MovieRowAuto from "./MovieRowAuto";

export default function FavoritesPage() {
  const favs = getFavorites();

  return (
    <div className="p-6 sm:p-8 text-white min-h-screen bg-[#141414]">
      <div className="flex items-center justify-between mb-6" />

      {favs.length === 0 ? (
        <div className="text-center text-zinc-400 mt-20">
          Você ainda não adicionou nada aos favoritos.
        </div>
      ) : (
        <MovieRowAuto
          title="❤️ Meus Favoritos"
          items={favs}
          type="movie" // ou omitir, já que cada item carrega o type individual
        />
      )}
    </div>
  );
}
