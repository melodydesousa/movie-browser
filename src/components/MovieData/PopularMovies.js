import { useState, useEffect } from 'react';
import "./PopularMovies.css";
import axiosPrivate from "../../api/tmdb";

export function PopularMovies({ setSelectedId }) {
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        const getPopularMovies = () => {
            axiosPrivate({
                url: `https://api.themoviedb.org/3/movie/popular?include_adult=false&api_key=${process.env.REACT_APP_API_KEY}`,
            })
                .then((res) => {
                    setPopularMovies(res.data.results);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        getPopularMovies();
    }
        , []);

    const handleClick = (id) => {
        setSelectedId(id);
    }

    return (
        <div className="popular-movie-container">
            {
                popularMovies.map((movie) => (
                    <div key={movie.id} className="popular-movie-poster" onClick={() => setSelectedId(movie.id)}>
                        {movie.poster_path &&
                            <img src={"https://image.tmdb.org/t/p/original/" + movie.poster_path} onClick={() => handleClick(movie.id)} alt={movie.title} />
                        }
                        <div className="popular-movie-list">
                            <p>{movie.title}</p>
                            <p style={{ color: "grey" }}>({movie.release_date.substring(0, 4)})</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}