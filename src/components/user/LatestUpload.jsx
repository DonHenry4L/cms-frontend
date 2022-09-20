import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMovies } from "../../hooks";
import { getPoster } from "../../utils/helper";

const trimTitle = (text = "") => {
  if (text.length <= 20) return text;
  return text.substring(0, 20) + "...";
};

export default function LatestUpload() {
  const { fetchLatestUploads, latestUploads } = useMovies();

  useEffect(() => {
    fetchLatestUploads();
  }, []);

  return (
    <div className='flex justify-end bg-transparent shadow dark:shadow p-5 rounded'>
      <div className=' mt-4'>
        <span className='text-highlight dark:text-highlight-dark uppercase text-xs font-bold'>
          latest Uploads
        </span>
        {/* <p className='flex justify-center text-2xl font-extrabold mb-4'>
          Latest
        </p> */}
        <div className=' bg-background bg-light-card w-56 rounded-3xl'>
          {latestUploads.map((movie) => {
            return <MovieCard movie={movie} key={movie.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

const MovieCard = ({ movie }) => {
  const { id, poster, title, responsivePosters } = movie;
  return (
    <div className='w-full p-2'>
      <div className=''>
        <div>
          <div>
            <div className='flex w-[160px] ml-6'>
              <img
                className='w-full aspect-video h-30 rounded-lg mt-2'
                src={getPoster(responsivePosters) || poster}
                alt={title}
              />
            </div>
            <Link to={"/movie/" + id}>
              <p className='font-bold text-xs text-center hover:text-highlight-dark'>
                {trimTitle(title)}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
