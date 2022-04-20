import React, { useState, useEffect } from 'react';
import './style.css';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg';

const API_URL = 'https://www.omdbapi.com?apikey=9f125bd0';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState('');
  const [page, setPage] = useState(1);

  const searchMovies = async (title, page) => {
    const resp = await fetch(`${API_URL}&s=${title}&page=${page}`);
    const data = await resp.json();
    setMovies(data.Search);
    console.log(data);
  };

  useEffect(() => {
    searchMovies('Avengers', 1);
  }, []);

  useEffect(() => {
    if (searchMovie !== '') {
      searchMovies(searchMovie, page);
    }
  }, [page]);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchMovie}
          onChange={(e) => {
            setSearchMovie(e.target.value);
            setPage(1);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              searchMovies(searchMovie, page);
            }
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            searchMovies(searchMovie, page);
          }}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">No movies found</div>
      )}
      {page > 1 ? (
        <button
          className="button"
          onClick={() => {
            setPage((p) => p - 1);
          }}
        >
          <span>Prev</span>
        </button>
      ) : (
        <></>
      )}
      <span className="pageColor">{page}</span>
      <button
        className="button"
        onClick={() => {
          if (movies?.length === 10) {
            setPage((p) => p + 1);
          }
        }}
      >
        {movies?.length === 10 ? <span>Next</span> : <span>Last page</span>}
      </button>
    </div>
  );
}
