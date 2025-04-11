import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import RatingCircle from "./RatingCircle";
import RatingBadge from "./RatingBadge";
import { isFavorite, toggleFavorite } from "../utils/favoritesUtils";

const MovieCard = ({ movie, type = "movie" }) => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [favorite, setFavorite] = useState(() =>
    isFavorite({ id: movie.id, type })
  );

  const title = movie.name || movie.title || "Sem título";
  const releaseDateRaw = movie.first_air_date || movie.release_date;
  const releaseDate = releaseDateRaw
    ? new Date(releaseDateRaw).getFullYear()
    : "Data desconhecida";

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`
    : "/fallback.jpg";

  const handleCardClick = (e) => {
    if (e.ctrlKey || e.metaKey) {
      window.open(`/details/${type}/${movie.id}`, "_blank");
    } else {
      navigate(`/details/${type}/${movie.id}`);
    }
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite({ ...movie, type });
    setFavorite((prev) => !prev);
  };

  return (
    <div
      className="card style_1 w-full mx-auto cursor-pointer bg-[#141414] hover:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105"
      onClick={handleCardClick}
      style={{
        position: "relative",
        display: "flex",
        flexWrap: "wrap",
        alignContent: "flex-start",
        border: "1px solid #e3e3e3",
        borderRadius: "8px",
        marginTop: "30px",
        width: "400px",
        height: "370px",
        boxSizing: "border-box",
      }}
    >
      <div className="relative" style={{ height: "273px", width: "180px" }}>
        <img
          loading="lazy"
          className="poster w-full rounded-t-lg"
          src={posterUrl}
          alt={title}
          style={{
            width: "180px",
            height: "273px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />

        {/* Botão de favorito */}
        <button
          onClick={handleFavorite}
          className="absolute top-2 right-2 z-10 bg-black/70 p-1 rounded-full text-white hover:scale-110"
          title="Favoritar"
        >
          {favorite ? "💖" : "🤍"}
        </button>

        {/* Rating */}
        <div className="consensus tight mt-2">
          <div
            className="outer_ring"
            style={{
              position: "absolute",
              left: "90%",
              transform: "translate(-50%, -50%)",
              width: "35px",
              height: "35px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RatingCircle value={movie.vote_average * 10} size={35} />
          </div>
        </div>
      </div>

      <div
        className="content p-3"
        style={{
          height: "127px",
          width: "180px",
          paddingBottom: "10px",
        }}
      >
        <h2
          className="text-lg font-semibold text-white truncate"
          style={{
            wordWrap: "break-word",
            whiteSpace: "normal",
            fontWeight: "800",
            fontSize: "0.9em",
            margin: "0",
            color: "#fff",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {title}
        </h2>
        <p className="text-sm text-gray-400">{releaseDate}</p>
      </div>

      <RatingBadge rating={movie.vote_average} />

      <div className="hover absolute inset-0 bg-black opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
    </div>
  );
};

export default MovieCard;
