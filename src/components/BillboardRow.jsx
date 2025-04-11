import { useState } from "react";
import { Link } from "react-router-dom";

const BillboardRow = ({ title, movie, trailerKey }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative">
      {/* Imagem de fundo */}
      <section
        className="relative h-[75vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        }}
      >
        {/* Sobreposição com efeito de gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>

        {/* Conteúdo com informações sobre o filme */}
        <div className="relative z-10 max-w-4xl p-8 pt-40">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
            {movie.title}
          </h1>
          <p className="text-lg text-zinc-200 mb-6 line-clamp-4 drop-shadow-md">
            {movie.overview}
          </p>

          {/* Botões para assistir ou obter mais informações */}
          <div className="flex gap-4">
            {trailerKey && (
              <a
                href={`https://www.youtube.com/watch?v=${trailerKey}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow"
              >
                ▶ Assistir Trailer
              </a>
            )}
            {/* Link para página de detalhes */}
            <Link
              to={`/details/${movie.id}`} // Redireciona para a página de detalhes com o ID do filme
              className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-5 py-2 rounded-lg shadow"
            >
              Mais informações
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BillboardRow;
