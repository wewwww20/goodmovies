/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Card = ({ id, title, year, rating, poster }) => {
  const [isHovered, setIsHovered] = useState(false);
  console.log(poster);

  return (
    <Link
      to={`/details/${id}`}
      className="relative w-[150px] h-[250px] md:w-[200px] md:h-[300px] overflow-hidden rounded-lg mb-5 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-full rounded-lg">
        <img
          src={poster}
          alt={title}
          className="w-full h-full bg-cover rounded-lg"
        />
      </div>
      <div className="absolute top-0 items-center gap-1 bg-yellow-600 px-2 py-1 mt-2 hidden  group-hover:flex rounded-lg ml-2 shadow-lg">{rating}</div>
      {isHovered && (
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-75 text-white p-2 animate__animated animate__slideInUp">
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-sm">{year}</p>
        </div>
      )}
    </Link>
  );
};

export default Card;
