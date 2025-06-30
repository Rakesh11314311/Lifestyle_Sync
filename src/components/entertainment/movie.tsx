import MovieCard from "./movie-card";

export default function Movie() {

    const movies = [
        {
            image: "https://via.placeholder.com/150",
            title: "Movie 1",
            rating: "PG-13",
            genre: "Action"
        },
        {
            image: "https://via.placeholder.com/150",
            title: "Movie 2",
            rating: "PG-13",
            genre: "Action"
        },
    ];

    return (
        <div className="flex flex-col items-center justify-center w-full h-full pt-30">
            {movies.map((movie) => (
                <MovieCard key={movie.title} image={movie.image} title={movie.title} rating={movie.rating} genre={movie.genre} />
            ))}
        </div>
    );
}