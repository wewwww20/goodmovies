import axios from "axios";

// eslint-disable-next-line no-undef

// eslint-disable-next-line no-undef
// const apiKey = process.env.REACT_APP_APIKEY;

// FUNC BUAT NGAMBIL DATA MOVIES
// eslint-disable-next-line react-refresh/only-export-components
export const getMovies = async (page) => {
  const movie = await axios.get(
    `${import.meta.env.VITE_APP_APIBASEURL}/movie/popular?api_key=${
      import.meta.env.VITE_APP_APIKEY
    }&language=en-US&page=${page}`
  );
  return movie.data;
};

export const NowPlayingMovies = async (page) => {
  const movie = await axios.get(
    `${import.meta.env.VITE_APP_APIBASEURL}/movie/now_playing?api_key=${
      import.meta.env.VITE_APP_APIKEY
    }&language=en-US&page=${page}`
  );
  return movie.data;
};
export const UpComingMovies = async (page) => {
  const movie = await axios.get(
    `${import.meta.env.VITE_APP_APIBASEURL}/movie/upcoming?api_key=${
      import.meta.env.VITE_APP_APIKEY
    }&language=en-US&page=${page}`
  );
  return movie.data;
};

// FUNC BUAT HANDLE SEARCH
// eslint-disable-next-line react-refresh/only-export-components
export const searchMovie = async (params) => {
  // eslint-disable-next-line no-unused-vars
  const search = await axios.get(
    `${
      import.meta.env.VITE_APP_APIBASEURL
    }/search/movie?query=${params}&api_key=${import.meta.env.VITE_APP_APIKEY}`
  );
  return search.data;
};

export const Details = async (movie_id) => {
  const detail = await axios.get(
    `${import.meta.env.VITE_APP_APIBASEURL}/movie/${movie_id}?api_key=${
      import.meta.env.VITE_APP_APIKEY
    }`
  );
  return detail.data;
};
export const DetailCredits = async (movie_id) => {
  const credits = await axios.get(
    `${import.meta.env.VITE_APP_APIBASEURL}/movie/${movie_id}/credits?api_key=${
      import.meta.env.VITE_APP_APIKEY
    }`
  );

  return credits.data;
};
export const DetailVideos = async (movie_id) => {
  const videos = await axios.get(
    `${
      import.meta.env.VITE_APP_APIBASEURL
    }/movie/${movie_id}/videos?language=en-US&api_key=${
      import.meta.env.VITE_APP_APIKEY
    }`
  );
  return videos.data;
};
export const WatchProviders = async (movie_id) => {
  const providers = await axios.get(
    `${
      import.meta.env.VITE_APP_APIBASEURL
    }/movie/${movie_id}/watch/providers?api_key=${
      import.meta.env.VITE_APP_APIKEY
    }`
  );
  return providers.data.results;
};
