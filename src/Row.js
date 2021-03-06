import axiosCustom from "./axios";
import React, { useEffect, useState } from "react";
import "./Row.css";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axiosCustom.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  console.log(movies);

  // ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) &&

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => {
          return (
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <>
                <img
                  className={`row__poster ${
                    isLargeRow && "row__posterLarge box"
                  } `}
                  key={movie.id}
                  src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt="title tiles"
                />
                {/* <h2>{movie.name ? movie.name : movie.title}</h2> */}
              </>
            )
          );
        })}
      </div>
    </div>
  );
}

export default Row;
