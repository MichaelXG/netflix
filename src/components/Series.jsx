import { useEffect, useState, useCallback } from "react";
import BillboardRow from "./BillboardRow";
import {
  fetchPopular,
  fetchGenres,
  fetchAllVideos,
  fetchTopRated10,
} from "../api/tmdb";
import MovieRowAuto from "./MovieRowAuto";

export default function Series() {
  const [series, setSeries] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [seriesGenres, setSeriesGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topSeries, setTopSeries] = useState([]);

  useEffect(() => {
    const loadTopRated = async () => {
      try {
        const { topSeries } = await fetchTopRated10();
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
      const seriesData = await fetchPopular("tv", 1);
      setSeries(seriesData.results);

      const validFeatured = seriesData.results.filter(
        (item) =>
          (item.name && item.name.trim().length > 0) ||
          (item.title && item.title.trim().length > 0)
      );

      const random =
        validFeatured[Math.floor(Math.random() * validFeatured.length)];

      setFeatured(random);

      const videos = await fetchAllVideos(random.id, "tv");
      const trailer = videos.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      setTrailerKey(trailer ? trailer.key : null);

      const fetchedSeriesGenres = await fetchGenres("tv");
      setSeriesGenres(fetchedSeriesGenres);
      setLoading(false);
    } catch (err) {
      console.error("Erro ao carregar dados em destaque:", err);
    }
  }, []);

  useEffect(() => {
    loadFeaturedData();
  }, [loadFeaturedData]);

  const title = series.name || "Sem título";

  if (loading) return <div className="text-center p-8">Carregando...</div>;

  return (
    <div className="bg-[#141414] text-white min-h-screen font-sans text-[0.75vw] leading-[1.2] select-none antialiased">
      {featured && (
        <BillboardRow
          title={title}
          movie={featured}
          trailerKey={trailerKey}
        />
      )}

      <section className="px-6 md:px-12 pt-12">
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
