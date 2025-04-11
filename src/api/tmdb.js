import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: apiKey,
    language: "pt-BR",
  },
});

// Função utilitária para determinar tipo: 'movie' ou 'tv'
const validateType = (type) => (type === "tv" ? "tv" : "movie");

/**
 * 🎬 Itens populares (filmes ou séries)
 */
export const fetchPopular = async (type = "movie", page = 1) => {
  const mediaType = validateType(type);
  const { data } = await api.get(`/${mediaType}/popular`, { params: { page } });
  return data;
};

/**
 * 🔍 Buscar por título (filmes ou séries)
 */
export const searchMedia = async (query, type = "movie", page = 1) => {
  const mediaType = validateType(type);
  const { data } = await api.get(`/search/${mediaType}`, {
    params: { query, page },
  });
  return data;
};

/**
 * 🔢 Buscar por gênero
 */
export const fetchByGenre = async (genreId, type = "movie", page = 1) => {
  const mediaType = validateType(type);
  const { data } = await api.get(`/discover/${mediaType}`, {
    params: { with_genres: genreId, page },
  });
  return data;
};

/**
 * 🎞️ Detalhes do item (filme ou série)
 */
export const fetchDetails = async (id, type = "movie") => {
  if (!id) throw new Error("ID não fornecido.");
  if (!type) throw new Error("Tipo não fornecido.");
  if (isNaN(id)) throw new Error("ID inválido.");
  if (typeof type !== "string") throw new Error("Tipo inválido.");

  const mediaType = validateType(type);

  try {
    const [detailsRes, creditsRes] = await Promise.all([
      api.get(`/${mediaType}/${id}`),
      api.get(`/${mediaType}/${id}/credits`),
    ]);

    const details = detailsRes.data;
    const credits = creditsRes.data;

    return {
      ...details,
      rating: details.vote_average,
      voteCount: details.vote_count,
      credits,
    };
  } catch (err) {
    console.error("Erro ao buscar detalhes:", err);
    throw new Error("Não foi possível carregar os detalhes.");
  }
};

/**
 * 🎬 Trailer principal
 */
export const fetchMainTrailer = async (id, type = "movie") => {
  const mediaType = validateType(type);
  const { data } = await api.get(`/${mediaType}/${id}/videos`);
  const trailer = data.results.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );
  return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
};

/**
 * 🎥 Todos os vídeos (trailers, teasers etc)
 */
export const fetchAllVideos = async (id, type = "movie") => {
  const mediaType = validateType(type);
  const { data } = await api.get(`/${mediaType}/${id}/videos`);
  return data.results;
};

/**
 * 🧑‍🤝‍🧑 Elenco principal
 */
export const fetchCast = async (id, type = "movie") => {
  const mediaType = validateType(type);
  const { data } = await api.get(`/${mediaType}/${id}/credits`);
  return data.cast?.slice(0, 10) || [];
};

/**
 * 📚 Buscar todos os gêneros disponíveis (filmes ou séries)
 */
export const fetchGenres = async (type = "movie") => {
  const mediaType = validateType(type);
  const { data } = await api.get(`/genre/${mediaType}/list`);
  return data.genres; // [{ id: 28, name: "Ação" }, ...]
};

/**
 * 📦 Buscar todos os dados combinados (detalhes + trailer)
 */
export const fetchAllData = async (type, id) => {
  const details = await fetchDetails(id, type);
  const trailer = await fetchMainTrailer(id, type);

  return {
    ...details,
    trailerUrl: trailer,
  };
};

/**
 * 🏆 Buscar os top 10 filmes e séries com melhores avaliações usando /top_rated
 */
export const fetchTopRated10 = async () => {
  const filterValid = (list) =>
    list
      .filter(
        (item) =>
          item.vote_average >= 7 &&
          item.poster_path &&
          item.overview?.length > 30 &&
          item.vote_count >= 100
      )
      .slice(0, 10);

  try {
    const [moviesRes, seriesRes] = await Promise.all([
      api.get("/movie/top_rated", { params: { page: 1 } }),
      api.get("/tv/top_rated", { params: { page: 1 } }),
    ]);

    const topMovies = filterValid(moviesRes.data.results);
    const topSeries = filterValid(seriesRes.data.results);

    return { topMovies, topSeries };
  } catch (err) {
    console.error("❌ Erro ao buscar Top 10 real:", err);
    throw new Error("Não foi possível carregar os Top 10 reais.");
  }
};
