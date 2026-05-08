// /services/imdb.js
import axios from "axios";

const API_KEY = "7a1fa92218bf9b13ad3307650087ab96";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

// بيانات احتياطية
const MOCK_MOVIES = [
  {
    id: "550",
    title: "Fight Club",
    year: "1999",
    rating: "8.8",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    overview: "An insomniac office worker...",
  },
  {
    id: "155",
    title: "The Dark Knight",
    year: "2008",
    rating: "9.0",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    overview: "When the menace known as the Joker...",
  },
];

export const getMovies = async (searchQuery = "") => {
  try {
    let endpoint;
    let params = { api_key: API_KEY, language: "en-US", page: 1 };

    if (searchQuery && searchQuery.trim().length > 0) {
      endpoint = "/search/movie";
      params.query = searchQuery;
    } else {
      endpoint = "/movie/popular";
    }

    const response = await axios.get(`${BASE_URL}${endpoint}`, { params });

    const movies = response.data.results.map((item) => ({
      id: item.id.toString(),
      title: item.title,
      year: item.release_date ? item.release_date.split("-")[0] : "N/A",
      image: item.poster_path ? `${IMAGE_BASE}${item.poster_path}` : null,
      rating: item.vote_average.toFixed(1),
      plot: item.overview || "No description available.",
      genre: "Action",
    }));

    return movies.length > 0 ? movies : MOCK_MOVIES;
  } catch (error) {
    console.error("TMDB API Error:", error.message);
    return MOCK_MOVIES;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "credits",
      },
    });

    const data = response.data;
    return {
      title: data.title,
      year: data.release_date ? data.release_date.split("-")[0] : "N/A",
      rating: data.vote_average.toFixed(1),
      runtime: data.runtime
        ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
        : "N/A",
      plot: data.overview,
      director:
        data.credits?.crew?.find((p) => p.job === "Director")?.name || "N/A",
      stars:
        data.credits?.cast
          ?.slice(0, 5)
          .map((a) => a.name)
          .join(", ") || "N/A",
      genres: data.genres?.map((g) => g.name).join(", ") || "N/A",
      poster: data.poster_path ? `${IMAGE_BASE}${data.poster_path}` : null,
      backdrop: data.backdrop_path
        ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
        : null,
    };
  } catch (error) {
    console.error("Details API Error:", error.message);
    return null;
  }
};

export const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${IMAGE_BASE}${path}`;
};
