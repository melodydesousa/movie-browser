import './App.css';
import { SearchBar } from './components/SearchBar/SearchBar';
import { MovieData } from './components/MovieData/MovieData'
import { MovieList } from './components/MovieList/MovieList';
import { PopularMovies } from './components/MovieData/PopularMovies';
import { useState, useEffect } from 'react';
import axiosPrivate from "./api/tmdb";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenres = () => {
      axiosPrivate({
        url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`,
      })
        .then((res) => {
          setGenres(res.data.genres);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    getGenres();
  }
    , []);


  return (
    <header className="App-header">
      <div className="App">
        <h1>What will you<br></br>watch tonight?</h1>
        <p>No inspiration yet?</p>
        <button className="popular-button" onClick={() => setSelectedId(null)}>See Popular movies</button>
        <div className='grid'>
          <div className="search-bar">
            <SearchBar
              setMovieList={setMovieList}
              setSelectedId={setSelectedId}
              genres={genres}
            />
            <MovieList
              movieList={movieList}
              setSelectedId={setSelectedId} />
          </div>

          <div className="movie-data">
            {
              selectedId ? (
                <MovieData id={selectedId} />)
                : (
                  <PopularMovies setSelectedId={setSelectedId} />
                )
            }
          </div>
        </div>
      </div>
    </header>
  );
}

export default App;
