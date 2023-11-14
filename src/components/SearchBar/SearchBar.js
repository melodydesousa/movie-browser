import React, { useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import { useState } from "react";
import axiosPrivate from "../../api/tmdb";

export function SearchBar({ setMovieList, setSelectedId, genres }) {
    const [genre, setGenre] = useState("0");
    const [selectedGenre, setSelectedGenre] = useState("0");
    const [movie, setMovie] = useState("");
    const [year, setYear] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [filterSelected, setFilterSelect] = useState(false);

    useEffect(() => {
        const getFilteredMovies = () => {
            axiosPrivate({
                url: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&query=${movie}&primary_release_year=${year}`,
            })
                .then((res) => {
                    const filteredMovies =
                        res.data.results.filter((movie) => {
                            return (genre === "0" || movie.genre_ids.includes(parseInt(genre)));
                        });
                    setMovieList(filteredMovies);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        getFilteredMovies();
    }, [movie, genre, year, setMovieList]);

    const handleChange = (movie) => {
        if (movie === "") {
            setSelectedId(null);
        }
        setMovie(movie);
    }

    const handleGenres = (e) => {
        setGenre(e.target.value);
        setSelectedGenre(e.target.value);
    }

    const handleYear = (e) => {
        if (e.target.value === "0")
            setYear("");
        else
            setYear(e.target.value);
        setSelectedYear(e.target.value);
    }

    const years = Array.from({ length: 100 }, (element, index) => {
        return (
            <option key={index} value={2023 - index}>{2023 - index}</option>
        );
    }
    );

    return (
        <div>
            <div className="search-box box">
                <FaSearch className="icon" />
                <input
                    type="text"
                    placeholder="Type to search"
                    value={movie}
                    onChange={(e) => { handleChange(e.target.value) }}
                />
            </div>
            <div className="filter-box box">
                Filters
                {!filterSelected ? (
                    <FaChevronDown style={{ cursor: "pointer", float: "right", color: "grey", alignItems: "center" }}
                        onClick={(e) => setFilterSelect(true)} />) : (
                    <>
                        <FaChevronUp style={{ cursor: "pointer", float: "right", color: "grey", alignItems: "center" }}
                            onClick={(e) => setFilterSelect(false)} />
                    </>
                )
                }
            </div>
            {filterSelected &&
                (<div className="filters box">
                    <div className="filter">
                        Genre:
                        <select className="filter select" onChange={handleGenres} value={selectedGenre}>
                            <option value="0" >All</option>
                            {genres.map((genre) => (
                                <option key={genre.id}
                                    value={genre.id}>
                                    {genre.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="filter">
                        Year:
                        <select className="filter select" onChange={handleYear} value={selectedYear}>
                            <option value="0" >All</option>
                            {years}
                        </select>
                    </div>
                </div>)}
        </div>
    )
}