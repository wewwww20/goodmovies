import { getMovies } from "../api/api";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../components/Card";
import NavbarComponent from "../components/Navbar";
import CarouselComponent from "../components/Carousel";
import { Carousel } from "@material-tailwind/react";

const PopularPage = () => {
  const [carousel, setCarousel] = useState([]);
  const [popular, setPopular] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsloading(true);
      try {
        const data = await getMovies(currentPage);
        setPopular(data.results);
        setTotalPages(data.total_pages);
      } catch (e) {
        console.error(e);
      } finally {
        setIsloading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  useEffect(() => {
    // buat carousel
    const fetchCarousel = async () => {
      try {
        setIsloading(true);
        const data = await getMovies("1");
        setCarousel(data.results);
      } catch (e) {
        console.error(e);
      } finally {
        setIsloading(false);
      }
    };

    fetchCarousel();
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams({ page });
      setCurrentPage(page);
    }
  };

  function PaginationControls() {
    return (
      <div className="flex gap-4 w-full justify-center mb-20">
        <button
          className="px-3 py-1 bg-yellow-600 text-xl text-white font-bold"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {currentPage > 1 && (
          <span
            className="px-3 py-1 text-xl hover:bg-blue-gray-900 cursor-pointer text-white"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {currentPage - 1}
          </span>
        )}
        <button
          className="px-3 py-1 text-xl bg-yellow-500 hover:bg-blue-gray-900 cursor-pointer text-white font-bold"
          onClick={() => handlePageChange(currentPage)}
        >
          {currentPage}
        </button>
        {currentPage < totalPages && (
          <>
            <span
              className="px-3 py-1 text-xl hover:bg-blue-gray-900 cursor-pointer text-white"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              {currentPage + 1}
            </span>
            <span className="px-3 py-1 text-xl text-white">...</span>
            <span
              className="px-3 py-1 text-xl hover:bg-blue-gray-900 cursor-pointer text-white "
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </span>
          </>
        )}
        <button
          className="px-3 py-1 bg-yellow-600 text-xl text-white font-bold"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    );
  }

  return (
    <>
      <NavbarComponent />
      <h1 className="border-b-2 py-4 mb-10 w-[90vw] md:w-[85vw] mx-auto text-2xl md:text-3xl text-white">
        Popular Movies
      </h1>
      {currentPage === 1 && (
        <div className="w-[90vw] md:w-[80vw] h-[75vh]  flex justify-center mx-auto mb-10">
          <Carousel className="rounded-xl overflow-hidden">
            {carousel.slice(0, 10).map((movie, i) => (
              <CarouselComponent
                key={i}
                id={movie.id}
                title={movie.title}
                year={movie.release_date.split("-")[0]}
                rating={movie.vote_average}
                backdrop={movie.backdrop_path}
                overview={movie.overview}
              />
            ))}
          </Carousel>
        </div>
      )}
      {isLoading ? (
        <div className="flex flex-col justify-center items-center w-full h-screen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            width="200"
            height="200"
            style={{
              shapeRendering: "auto",
              display: "block",
              background: "transparent",
            }}
            // eslint-disable-next-line react/no-unknown-property
            xmlns:xlink="http://www.w3.org/1999/xlink"
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
        <div className="flex flex-wrap w-[90vw] md:w-[85vw] mx-auto justify-start gap-4">
          {popular.map((movie, i) => (
            <Card
              key={i}
              id={movie.id}
              title={movie.title}
              year={movie.release_date.split("-")[0]}
              rating={movie.vote_average.toFixed(1)}
              poster={`${import.meta.env.VITE_APP_APIURLIMG}/${
                movie.poster_path
              }`}
            />
          ))}
        </div>
      )}
      <PaginationControls />
    </>
  );
};

export default PopularPage;
