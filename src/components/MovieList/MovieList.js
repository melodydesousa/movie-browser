import "./MovieList.css";

export function MovieList({ movieList, setSelectedId }) {
    const handleClick = (id) => {
        setSelectedId(id);
    }

    return (
        <div className="movie-list">
            {movieList && (
                <div className="movie-list">
                    {movieList.map((movie, id) => (
                        <button
                            key={movie.id}
                            onClick={() => handleClick(movie.id)}>{movie.title}</button>
                    ))}

                </div>
            )}
        </div>
    );
}