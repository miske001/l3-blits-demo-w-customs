export const URLS_API = {
  GET_MOVIES: "/discover/movie",
  GET_GENRES: "/genre/movie/list",
  GET_SEARCH: "/search/movie",
  GET_MOVIE_CREDITS: (id: number | string) => `/movie/${id}/credits`,
  GET_NOW_PLAYING: "/movie/now_playing",
  GET_POPULAR_TV: "/tv/popular",
  GET_MOVIE_DETAILS: (id: number | string) => `/movie/${id}`,
  GET_SIMILAR_MOVIES: (id: number | string) => `/movie/${id}/similar`,
  GET_TRENDING_MOVIES: (timeWindow: "day" | "week" = "day") =>
    `/trending/movie/${timeWindow}`,
} as const;
