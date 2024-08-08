/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CarouselComponent = ({ id, title, year, rating, backdrop, overview }) => {
  return (
    <>
      <div className="w-full h-full brightness-95">
        <img
          src={`https://image.tmdb.org/t/p/original/${backdrop}`}
          alt={`Movie ${title}`}
          className="w-full h-full object-cover object-center "
        />
        <div className="p-4 absolute top-0 w-full h-full flex flex-col justify-center ">
          <div className="mt-60">
            <h1 className="text-3xl font-bold text-white  outline-1">
              {title}
            </h1>
            <h2 className="mb-3 text-white text-xl">{year}</h2>
            <div className="flex items-center gap-5 mb-3">
              <div className="flex items-center border border-white w-20 hover:bg-red-700 rounded pointer justify-center gap-2">
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-star-fill text-yellow-500 text-2xl"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                </div>
                <p className="text-white text-2xl  text-center">
                  {rating.toFixed(1)}
                </p>
              </div>
              <Link
                to={`/details/${id}`}
                className="bg-red-700 px-5 py-1 rounded text-white"
              >
                View
              </Link>
            </div>
            <div>
              <p className="text-white line-clamp-4">{overview}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarouselComponent;
