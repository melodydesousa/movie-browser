import { useEffect, useState } from "react";
import "./MovieData.css";
import Rating from "./Rating";
import axiosPrivate from "../../api/tmdb";

export function MovieData({ id }) {
    const [movieData, setMovieData] = useState({});

    useEffect(() => {
        getMovieData(id);
    }
        , [id]);

    const getMovieData = (id) => {
        axiosPrivate({
            url: `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`,
        })
            .then((res) => {
                setMovieData(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const getCurrency = (value) => {
        return value && value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    }

    return (
        <>
            <div className="movie-container">
                <div className="movie-poster">
                    {movieData.poster_path &&
                        <img src={"https://image.tmdb.org/t/p/original/" + movieData.poster_path} alt={movieData.title} />
                    }
                </div>
                <div className="movie-info">
                    {
                        id &&
                        <>
                            <h2>{movieData.title}</h2>
                            {movieData.release_date &&
                                <h3 style={{ color: "grey", opacity: "0.7" }}>({movieData.release_date.substring(0, 4)})</h3>}
                            <Rating note={movieData.vote_average} count={movieData.vote_count} />
                            <p><b>Runtime:</b> {movieData.runtime} minutes</p>
                            <p><b>Genres:</b>
                                {
                                    movieData.genres && movieData.genres.map((genre) => (
                                        <span key={genre.id}> {genre.name} </span>
                                    ))
                                }
                            </p>
                            <p><b>Original language:</b> {
                                movieData.spoken_languages && movieData.spoken_languages.map((language) =>
                                    <span key={language.name}> {language.english_name} </span>
                                )}</p>
                            <p><b>Budget: </b>
                                {movieData.budget === 0 || undefined ? "-" : getCurrency(movieData.budget)}</p>
                            <p><b>Revenue: </b>  {movieData.revenue === 0 || undefined ? ("-") : getCurrency(movieData.revenue)}</p>
                        </>
                    }
                </div>

            </div>
            <div className="movie-overview">
                <p><em><b>{movieData.tagline}</b></em></p>
                <p>{movieData.overview}</p>
            </div>
        </>
    );
}