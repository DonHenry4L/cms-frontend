import React, { useEffect, useState } from "react";
import requests from "../../apiRequest/requests";
import axios from "../../apiRequest/axios";

import "./Banner.css";
import { Link, useNavigate } from "react-router-dom";
import AppSearchForm from "../form/AppSearchForm";
import { useAuth } from "../../hooks";
import { GoThreeBars } from "react-icons/go";

function Banner() {
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const handleSearchSubmit = (query) => {
    navigate("/movie/search?title=" + query);
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div>
      <header
        className='banner'
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundPosition: "center center",
        }}
      >
        <div className='banner__contents'>
          <h1 className='banner__title'>
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className='banner__buttons'>
            <button className='banner__button'>Play</button>

            <button
              className='banner__button'
              onClick={() => navigate("/series")}
            >
              Series
            </button>
          </div>
          <h1 className='banner__description'>
            {truncate(movie?.overview, 150)}
          </h1>
        </div>

        <div className='banner__fadeButton' />
      </header>
      <div className='pt-12 '>
        <AppSearchForm
          placeholder='Search...'
          inputClassName='form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none hover:bg-blue '
          onSubmit={handleSearchSubmit}
        />
      </div>
    </div>
  );
}

export default Banner;
