/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Details, DetailCredits, DetailVideos, WatchProviders } from '../api/api';
import NavbarComponent from '../components/Navbar';

const DetailsPage = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [credit, setCredit] = useState(null);
  const [video, setVideo] = useState(null);
  const [watchProviders, setWatchProviders] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await Details(id);
        const credits = await DetailCredits(id);
        const movieVideos = await DetailVideos(id);
        const providers = await WatchProviders(id);

        setMovieDetails(details);
        setCredit(credits);
        setVideo(movieVideos);
        setWatchProviders(providers.ID);
      } catch (error) {
        console.error('Failed to fetch movie details:', error.message);
      }
    };

    const fetchWatchlist = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/watchlist/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const watchlist = response.data;

        const movieInWatchlist = watchlist.some((item) => item.movie_id === parseInt(id));
        setIsInWatchlist(movieInWatchlist);
      } catch (error) {
        console.error('Failed to check watchlist:', error.message);
      }
    };

    fetchDetails();
    if (userId) {
      fetchWatchlist();
    }
  }, [id]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        setIsAuth(true);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        setIsAuth(false);
      }
    };

    fetchUserData();
  }, []);

  const handleAddToWatchlist = async () => {
    const watchlistData = {
      movie_id: movieDetails.id,
      movie_name: movieDetails.title,
      movie_poster_url: movieDetails.poster_path,
      year: movieDetails.release_date.split('-')[0],
      vote_average: movieDetails.vote_average.toFixed(1),
      userId: userId,
    };

    if (isInWatchlist) {
      try {
        await axios.delete(`${import.meta.env.VITE_APP_BACKEND}/watchlist`, {
          data: {
            userId: userId,
            movie_id: id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsInWatchlist(false);
      } catch (error) {
        console.error('Failed to remove movie from watchlist:', error.message);
      }
    } else {
      try {
        await axios.post(`${import.meta.env.VITE_APP_BACKEND}/add-watchlist`, watchlistData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsInWatchlist(true);
      } catch (error) {
        console.log(error);

        console.error('Failed to add movie to watchlist:', error.message);
      }
    }
  };

  if (!movieDetails || !credit || !video) {
    return (
      <div>
        <h1>Something went wrong</h1>
        <Link to="/">Go back</Link>
      </div>
    );
  }

  const trailer = video.results?.find((item) => item.type === 'Trailer');

  return (
    <>
      <NavbarComponent />
      <div className="w-full mb-20">
        <div className="w-full h-[30vh] md:h-[50vh]">
          {movieDetails.poster_path && (
            <img
              src={`${import.meta.env.VITE_APP_APIURLIMG}/${movieDetails.backdrop_path}`}
              alt={movieDetails.title}
              className="w-full h-full bg-cover"
            />
          )}
        </div>
        <div className="w-[90vw] md:w-[85vw] mx-auto flex">
          <div className="w-[25%] h-[200px] md:h-[350px] py-2">
            {movieDetails.poster_path && (
              <img
                src={`${import.meta.env.VITE_APP_APIURLIMG}/${movieDetails.poster_path}`}
                alt={movieDetails.title}
                className="w-full h-full bg-cover"
              />
            )}
          </div>
          <div className="w-[75%] px-5 py-2 flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-white text-xl md:text-2xl xl:text-3xl">{movieDetails.title}</h1>
              {isAuth && (
                <div className="flex flex-col items-center">
                  <button onClick={handleAddToWatchlist}>
                    <svg
                      fill={isInWatchlist ? '#ffffff' : '#12101D'}
                      className="w-[40px]"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 26.514 26.515"
                      xmlSpace="preserve"
                      stroke={isInWatchlist ? '#12101D' : '#ffffff'}
                    >
                      <g
                        id="SVGRepo_bgCarrier"
                        strokeWidth="0"
                      ></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <path d="M23.649,1.501l-0.002,23.514c0,0.56-0.312,1.072-0.809,1.331c-0.494,0.257-1.095,0.219-1.554-0.104l-8.028-5.618 l-8.031,5.618c-0.257,0.182-0.56,0.271-0.86,0.271c-0.236,0-0.475-0.056-0.692-0.169c-0.495-0.259-0.808-0.771-0.808-1.331 L2.868,1.5c0-0.829,0.672-1.5,1.5-1.5h2.451v13.258c0,0.828,0.672,1.5,1.5,1.5s1.5-0.672,1.5-1.5V0.001h12.33 c0.396,0,0.779,0.158,1.061,0.439C23.492,0.721,23.649,1.103,23.649,1.501z"></path>
                        </g>
                      </g>
                    </svg>
                  </button>
                  <h3 className="text-gray-100">{isInWatchlist ? 'remove from watchlist' : 'Add to Watchlist'}</h3>
                </div>
              )}
            </div>
            <h1 className="text-white text-lg md:text-xl">{movieDetails.release_date.split('-')[0]}</h1>
            <div className="flex items-center justify-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-star-fill text-yellow-500 text-3xl"
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
              <h1 className="text-white font-bold text-lg md:text-xl">{movieDetails.vote_average.toFixed(1)} / 10</h1>
            </div>
            <p className="text-white text-lg md:text-xl font-bold">Director: {credit.crew.find(({ job }) => job === 'Director')?.name}</p>
            <div className="flex gap-2 mt-3 w-full flex-wrap">
              {movieDetails.genres.map((genre) => (
                <div
                  key={genre.id}
                  className="border border-black text-white bg-blue-gray-900 px-3 py-1 bg-slate-800 rounded-full hover:bg-[#DA7086] hover:text-[#12101D] ease-in-out duration-300 cursor-pointer"
                >
                  {genre.name}
                </div>
              ))}
            </div>
            <p className="px-3 py-1 md:px-6 md:py-2 bg-[#DA7086] font-bold rounded-lg mt-8 text-[#12101D]">{movieDetails.overview}</p>
          </div>
        </div>
        <div className="w-[90vw] md:w-[85vw] mx-auto h-[30vh] md:h-[50vh] mt-10">
          {trailer && (
            <iframe
              className="w-full md:w-[60%] mx-auto h-full bg-cover"
              title="Trailer"
              sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
              src={`https://youtube.com/embed/${trailer.key}?autoplay=0`}
            ></iframe>
          )}
        </div>
        <div className="w-[90vw] md:w-[85vw] mx-auto mt-10">
          <h1 className="text-2xl md:text-3xl text-white py-1 border-b-2 border-white">Streaming</h1>
          {watchProviders ? (
            <div className="mt-5 flex flex-wrap gap-4">
              {watchProviders.flatrate?.map((provider, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center"
                >
                  <img
                    src={`${import.meta.env.VITE_APP_APIURLIMG}${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="w-16 h-16"
                  />
                  <p className="text-white text-center mt-2">{provider.provider_name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white">Not available for streaming</p>
          )}
        </div>
        <h1 className="w-[90vw] md:w-[85vw] mx-auto mt-10 text-2xl md:text-3xl text-white py-1 border-b-2 border-white">Cast</h1>
        <div className="w-[90vw] md:w-[85vw] mx-auto mt-10 flex flex-wrap">
          {credit.cast
            .filter((actor) => actor.order < 19)
            .map((actor, i) => (
              <div
                key={i}
                className="w-[150px] h-[200px] flex flex-col  items-center py-5"
              >
                <div className="w-[100px] h-[100px] rounded-full">
                  <img
                    src={`${import.meta.env.VITE_APP_APIURLIMG}/${actor.profile_path}`}
                    alt={actor.name}
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-white font-semibold text-center">{actor.name}</h1>
                  <h2 className="text-center text-gray-500">{actor.character}</h2>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
