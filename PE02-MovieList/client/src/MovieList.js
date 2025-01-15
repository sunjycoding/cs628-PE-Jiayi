import React, { useState } from "react";

const MovieList = () => {
    // Initial movie data
    const movies = [
        { title: "Inception", genre: "Science Fiction", releaseYear: 2010 },
        { title: "The Shawshank Redemption", genre: "Drama", releaseYear: 1994 },
        { title: "The Dark Knight", genre: "Action", releaseYear: 2008 },
    ];

    // State management
    const [selectedGenre, setSelectedGenre] = useState("All Genres");

    // Extract unique genres for the dropdown
    const genres = ["All Genres", ...new Set(movies.map((movie) => movie.genre))];

    // Filtered movies based on selected genre
    const filteredMovies =
        selectedGenre === "All Genres"
            ? movies
            : movies.filter((movie) => movie.genre === selectedGenre);

    // Handle movie click
    const handleMovieClick = (title) => {
        alert(`You clicked on "${title}"`);
    };

    return (
        <div style={{ padding: "10px 350px" }}>
            <h1>Movie List</h1>
            <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                style={{ marginBottom: "20px", padding: "10px", fontSize: "16px" }}
            >
                {genres.map((genre) => (
                    <option key={genre} value={genre}>
                        {genre}
                    </option>
                ))}
            </select>

            {/* Render movie cards */}
            <div>
                {filteredMovies.map((movie, index) => (
                    <div
                        key={index}
                        style={{
                            border: "1px solid #ddd",
                            padding: "15px",
                            marginBottom: "10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        onClick={() => handleMovieClick(movie.title)}
                    >
                        <h2>{movie.title}</h2>
                        <p>
                            <strong>Genre:</strong> {movie.genre}
                        </p>
                        <p>
                            <strong>Released:</strong> {movie.releaseYear}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;