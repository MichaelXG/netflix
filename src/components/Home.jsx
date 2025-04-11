import { useEffect, useState, useCallback } from "react";
import BillboardRow from "./BillboardRow";
import {
  fetchPopular,
  fetchGenres,
  fetchAllVideos,
  fetchTopRated10,
} from "../api/tmdb";
import MovieRowAuto from "./MovieRowAuto";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [movieGenres, setMovieGenres] = useState([]);
  const [seriesGenres, setSeriesGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topMovies, setTopMovies] = useState([]);
  const [topSeries, setTopSeries] = useState([]);

  useEffect(() => {
    const loadTopRated = async () => {
      try {
        const { topMovies, topSeries } = await fetchTopRated10();
        setTopMovies(topMovies);
        setTopSeries(topSeries);
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

      const seriesData = await fetchPopular("tv", 1);
      setSeries(seriesData.results);

      const random =
        movieData.results[Math.floor(Math.random() * movieData.results.length)];
      setFeatured(random);

      const videos = await fetchAllVideos(random.id, "movie");
      const trailer = videos.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      setTrailerKey(trailer ? trailer.key : null);

      const fetchedMovieGenres = await fetchGenres("movie");
      const fetchedSeriesGenres = await fetchGenres("tv");
      setMovieGenres(fetchedMovieGenres);
      setSeriesGenres(fetchedSeriesGenres);
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
          title={featured.title || featured.name}
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

        <MovieRowAuto
          title="Top 10 Séries Mais Bem Avaliadas"
          genreId={null}
          type="tv"
          items={topSeries}
        />
        <MovieRowAuto
          title="Populares na Netflix - Séries"
          genreId={null}
          type="tv"
        />

        {movieGenres.map((genre) => (
          <MovieRowAuto
            key={genre.id}
            title={`Filmes de ${genre.name}`}
            genreId={genre.id}
            type="movie"
          />
        ))}

        {seriesGenres.map((genre) => (
          <MovieRowAuto
            key={genre.id}
            title={`Séries de ${genre.name}`}
            genreId={genre.id}
            type="tv"
          />
        ))}
      </section>
    </div>
  );
}
