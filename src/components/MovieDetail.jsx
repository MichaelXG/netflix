import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDetails, fetchMainTrailer } from "../api/tmdb";
import RatingCircle from "./RatingCircle";
import RatingBadge from "./RatingBadge";

const MovieDetail = () => {
  const { id, type } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const movieData = await fetchDetails(id, type);
        setMovie(movieData);
        const trailer = await fetchMainTrailer(id, type);
        setTrailerUrl(trailer);
      } catch (err) {
        setError("Não foi possível carregar os detalhes do título.");
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [id, type]);

  if (loading)
    return (
      <div className="text-center p-8 text-white">Carregando detalhes...</div>
    );

  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  if (!movie)
    return (
      <div className="text-center p-8 text-white">Título não encontrado.</div>
    );

  // Dados derivados
  const title = movie.title || movie.name || "Sem título";
  const releaseDateRaw = movie.release_date || movie.first_air_date;
  const releaseYear = releaseDateRaw
    ? new Date(releaseDateRaw).getFullYear()
    : "N/A";
  const formattedDate = releaseDateRaw
    ? new Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(releaseDateRaw))
    : "Data desconhecida";
  const runtime = movie.runtime || movie.episode_run_time?.[0] || null;

  return (
    <div className="relative bg-black text-white">
      {/* Botão Voltar */}
      <span className="absolute top-12 left-4 z-10">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
        >
          Voltar
        </button>
      </span>

      {/* Imagem de fundo */}
      <div
        className="relative h-[80vh] bg-cover bg-center p-4 md:p-12"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/${
            movie.backdrop_path || "default_image.jpg"
          }')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>

        <div className="flex space-x-4 bg-center p-4 md:p-12 rounded-lg shadow-lg relative z-10 mx-auto">
          {/* Coluna 1: Capa */}
          <div className="flex-1 flex flex-col justify-center ml-4">
            <div className="relative">
              <img
                className="image-size"
                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
                alt={title}
              />
              <div className="absolute inset-0 rounded-lg"></div>
            </div>
          </div>

          {/* Coluna 2: Infos */}
          <div className="flex-1 flex flex-col justify-center ml-4">
            <div className="flex items-center mb-4">
              <h1 className="text-2xl sm:text-4xl font-bold text-white">
                {title} ({releaseYear})
              </h1>
            </div>

            <div className="flex items-center flex-wrap mb-4 space-x-6">
              <div className="flex items-center">
                <RatingBadge
                  rating={movie.vote_average}
                  className="flex text-white py-1 px-2 rounded-full"
                />
              </div>
              <div className="flex items-center">
                <span className="text-sm font-semibold text-white">
                  {formattedDate}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {movie.genres?.map((genre) => (
                  <li
                    key={genre.id}
                    className="text-sm font-semibold text-white hover:underline cursor-pointer"
                  >
                    {genre.name}
                  </li>
                ))}
              </div>
              {runtime && (
                <div className="flex items-center">
                  <li className="text-sm font-semibold text-white">
                    {Math.floor(runtime / 60)}h {runtime % 60}m
                  </li>
                </div>
              )}
            </div>

            <div className="flex items-center">
              <span className="text-1xl font-semibold">
                <div className="consensus tight flex items-center">
                  <div
                    className="outer_ring"
                    style={{
                      position: "relative",
                      width: "200px",
                      height: "80px",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <RatingCircle value={movie.vote_average * 10} size={55} />
                  </div>
                  <div className="ml-4 text-sm font-bold text-white flex justify-items-start">
                    {movie.vote_count} votos
                  </div>
                </div>
              </span>
            </div>

            <div className="flex items-center mb-4">
              <span>
                <h2 className="text-xl sm:text-1xl font-bold text-white">
                  Sinopse:
                </h2>
                <p className="mt-2 text-sm sm:text-base">{movie.overview}</p>
              </span>
            </div>

            <div className="flex items-center mb-4">
              <span>
                <h5 className="text-xl sm:text-1xl font-bold text-white">
                  Produção:
                </h5>
              </span>
            </div>

            <div className="flex items-center mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-white">
                {movie.production_companies?.map((company) => (
                  <li
                    key={company.id}
                    className="hover:underline cursor-pointer"
                  >
                    {company.name}
                  </li>
                ))}
              </div>
            </div>

            <div className="flex items-center mb-4">
              <span>
                <h5 className="text-xl sm:text-1xl font-bold text-white">
                  Linguagem:
                </h5>
              </span>
            </div>

            <div className="flex items-center mb-4">
              <span className="text-sm sm:text-base text-white">
                {movie.spoken_languages?.map((language) => (
                  <li
                    key={language.iso_639_1}
                    className="hover:underline cursor-pointer"
                  >
                    {language.name}
                  </li>
                ))}
              </span>
            </div>
          </div>

          {/* Coluna 3: Trailer */}
          <div className="flex-1 flex flex-col justify-center ml-4">
            {trailerUrl && (
              <div className="mt-8">
                <h3 className="text-xl text-white font-bold mb-4">Trailer</h3>
                <iframe
                  width="100%"
                  height="315"
                  src={trailerUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Elenco Principal */}
      <div className="mt-12 p-4 md:p-12">
        <h3 className="text-2xl font-semibold">Elenco Principal</h3>
        <ul className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-15 lg:grid-cols-8 xl:grid-cols-10 gap-4 mt-4">
          {movie.credits?.cast?.slice(0, 10).map((person) => (
            <li key={person.id} className="text-center group">
              <a href={`/person/${person.id}`} className="block">
                <div className="relative">
                  <img
                    loading="lazy"
                    className="w-32 h-48 mx-auto rounded-lg transition-transform transform group-hover:scale-105"
                    src={`https://image.tmdb.org/t/p/w138_and_h175_face/${person.profile_path}`}
                    alt={person.name}
                    onError={(e) => (e.target.src = "/fallback-person.jpg")}
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 rounded-lg transition-opacity duration-300"></div>
                </div>
              </a>
              <p className="mt-2 text-sm font-semibold text-white">
                {person.name}
              </p>
              <p className="text-sm text-gray-400">{person.character}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieDetail;
