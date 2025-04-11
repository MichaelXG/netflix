import { useEffect, useState, useCallback } from "react";
import BillboardRow from "./BillboardRow";
import {
  fetchPopular,
  fetchGenres,
  fetchAllVideos,
  fetchTopRated10,
} from "../api/tmdb";
import MovieRowAuto from "./MovieRowAuto";

export default function Filmes() {
  const [movies, setMovies] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [movieGenres, setMovieGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    const loadTopRated = async () => {
      try {
        const { topMovies } = await fetchTopRated10();
        setTopMovies(topMovies);
      } catch (error) {
        console.error("Erro ao carregar Top 10:", error);
      }
    };

    loadTopRated();
  }, []);

  // Carrega filmes/séries populares, destaque e gêneros
  const loadFeaturedData = useCallback(async () => {
    try {
      const movieData = await fetchPopular("movie", 1);
      setMovies(movieData.results);

      const random =
        movieData.results[Math.floor(Math.random() * movieData.results.length)];
      setFeatured(random);

      const videos = await fetchAllVideos(random.id, "movie");
      const trailer = videos.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      setTrailerKey(trailer ? trailer.key : null);

      const fetchedMovieGenres = await fetchGenres("movie");
      setMovieGenres(fetchedMovieGenres);

      setLoading(false);
    } catch (err) {
      console.error("Erro ao carregar dados em destaque:", err);
    }
  }, []);

  useEffect(() => {
    loadFeaturedData();
  }, [loadFeaturedData]);

  if (loading) return <div className="text-center p-8">Carregando...</div>;

  return (
    <div className="bg-[#141414] text-white min-h-screen font-sans text-[0.75vw] leading-[1.2] select-none antialiased">
      {featured && (
        <BillboardRow
          title={featured.title}
          movie={featured}
          trailerKey={trailerKey}
        />
      )}

      <section className="px-6 md:px-12 pt-12">
        {/* 🎯 Top 10 Avaliados */}
        <MovieRowAuto
          title="Top 10 Filmes Mais Bem Avaliados"
          genreId={null}
          type="movie"
          items={topMovies}
        />

        {/* Populares */}
        <MovieRowAuto
          title="Populares na Netflix - Filmes"
          genreId={null}
          type="movie"
        />

        {movieGenres.map((genre) => (
          <MovieRowAuto
            key={genre.id}
            title={`Filmes de ${genre.name}`}
            genreId={genre.id}
            type="movie"
          />
        ))}
      </section>
    </div>
  );
}
