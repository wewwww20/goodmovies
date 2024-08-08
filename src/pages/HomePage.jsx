import Card from '../components/Card';
import { UpComingMovies, searchMovie } from '../api/api';
import { useEffect, useState } from 'react';
import NavbarComponent from '../components/Navbar';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  console.log(movies);

  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    // buat carousel
    const fetchCarousel = async () => {
      try {
        setIsloading(true);
        const data = await UpComingMovies('1');
        setMovies(data.results);
      } catch (e) {
        console.error(e);
      } finally {
        setIsloading(false);
      }
    };

    fetchCarousel();
  }, []);

  const search = async (params) => {
    if (params.length > 0) {
      const query = await searchMovie(params);
      setMovies(query.results);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="w-full h-[40vh] flex flex-col items-center justify-center pt-10 bg-[#DA7086]">
        <h1 className="mb-3 text-xl md:text-3xl font-bold  text-[#12101D]">
          <span className="text-[#DA7086] bg-[#12101D] px-4 py-2 rounded-full">Good Movies</span>
        </h1>
        <h2 className="text-center text-lg text-[#12101D] font-semibold ">
          Movies touch our hearts, awaken our vision,
          <br /> and change the way we see things
        </h2>
        <input
          placeholder="search movie"
          className="px-5 py-2 rounded-full mt-4"
          onChange={({ target }) => search(target.value)}
        />
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="-mt-2"
      >
        <path
          fill="#DA7086"
          fillOpacity="1"
          d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,192C672,171,768,85,864,64C960,43,1056,85,1152,117.3C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
      <div className="flex flex-wrap md:w-[85vw] mx-auto justify-around md:justify-start gap-4">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center w-full h-screen">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
              width="200"
              height="200"
              style={{
                shapeRendering: 'auto',
                display: 'block',
                background: 'transparent',
              }}
            >
              <g>
                <circle
                  strokeDasharray="164.93361431346415 56.97787143782138"
                  r="35"
                  strokeWidth="10"
                  stroke="#0ea5e9"
                  fill="none"
                  cy="50"
                  cx="50"
                >
                  <animateTransform
                    keyTimes="0;1"
                    values="0 50 50;360 50 50"
                    dur="1s"
                    repeatCount="indefinite"
                    type="rotate"
                    attributeName="transform"
                  ></animateTransform>
                </circle>
                <g></g>
              </g>
            </svg>
            <h1 className="text-3xl text-white">Loading</h1>
          </div>
        ) : (
          <div className="flex flex-wrap md:w-[85vw] mx-auto justify-around md:justify-start gap-4">
            {movies.map((movie, i) => (
              <Card
                key={i}
                id={movie.id}
                title={movie.title}
                year={movie.release_date.split('-')[0]}
                rating={movie.vote_average.toFixed(1)}
                poster={`${import.meta.env.VITE_APP_APIURLIMG}/${movie.poster_path}`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
