import MovieCard from "./movie-card";
import type { movieObject } from '../../states/entertainment-data/types';
import { findMovie, findMovieDetails } from "./movie-find";
import { useEffect, useState } from "react";
import { GENRE_MAP } from "./movie-find";
import SearchBar from "@/shared_components/search-bar/search-bar";

export default function Movie() {
    const [movies, setMovies] = useState<movieObject[]>([]);
    const [searchText, setSearchText] = useState<string>("");

    useEffect(() => {
        setMovies([]);
        async function fetchMovies() {
            const data = await findMovie(searchText);
            const details: movieObject[] = [];

            for (const movie of data) {
                const movie_details = await findMovieDetails(movie.id);
                details.push({
                    id: movie.id,
                    image: (movie.poster_path) ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "",
                    title: movie.title,
                    rating: movie.vote_average.toString(),
                    genre: movie.genre_ids.map((genre) => GENRE_MAP[genre]),
                    budget: movie_details.budget,
                    collection: movie_details.revenue
                });
            }

            //console.log(data);
            // setMovies(data.map((movie) => ({
            //     title: movie.title,
            //     id: movie.id,
            //     image: (movie.poster_path) ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "",
            //     rating: movie.vote_average.toString(),
            //     genre: movie.genre_ids.map((genre) => GENRE_MAP[genre])
            // })));
            setMovies(details);
        }
        fetchMovies();
    }, [searchText]);

    //const movies = useSelector((state: RootState) => state.entertainment);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setSearchText(event.currentTarget.value);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="w-[60%] h-full justify-center items-center">
                    <SearchBar onKeyDown={handleKeyDown} />
                </div>

                <div>
                    {(movies.length === 0) && <div className="flex flex-col items-center justify-center w-full h-full pt-30">
                        <h1 className="text-2xl font-bold">No movies found yet</h1>
                    </div>}


                    {(movies.length > 0) && <div className="flex flex-col items-center justify-center w-full h-full pt-30">
                        {movies.map((movie: movieObject) => (
                            <MovieCard key={movie.title} image={movie.image} title={movie.title} rating={movie.rating} genre={movie.genre.join(", ")} budget={movie.budget.toString()} collection={movie.collection.toString()} />
                        ))}
                    </div>}
                </div>
            </div>
        </>
    );
}
