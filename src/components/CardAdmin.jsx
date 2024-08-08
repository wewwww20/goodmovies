/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CardAdmin = ({ id, title, year, rating, poster }) => {
  const [isHovered, setIsHovered] = useState(false);
  console.log(poster);

  return (
    <Link
      to={`/details/${id}`}
      className="relative w-[80px] h-[130px] overflow-hidden rounded-lg mb-5 group"
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
      <div className="absolute top-0 items-center gap-1 bg-yellow-600 px-2 py-1 mt-2 hidden text-[10px] group-hover:flex rounded-lg ml-2 shadow-lg">{rating}</div>
      {isHovered && (
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-75 text-white p-2 animate__animated animate__slideInUp">
          <p className="text-[10px] font-semibold">{title}</p>
          <p className="text-[10px]">{year}</p>
        </div>
      )}
    </Link>
  );
};

export default CardAdmin;
