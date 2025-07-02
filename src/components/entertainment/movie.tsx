import MovieCard from "./movie-card";
import { useSelector } from 'react-redux'
import type { RootState } from '../home/main';
import type { movieObject } from '../../states/entertainment-data/demo-data';
import findMovie from "./movie-find";
import { useEffect, useState } from "react";
import { GENRE_MAP } from "./movie-find";
import SearchBar from "@/shared_components/search-bar/search-bar";

export default function Movie() {
    const [movies, setMovies] = useState<movieObject[]>([]);
    const [searchText, setSearchText] = useState<string>("");

    useEffect(() => {
        async function fetchMovies() {
            const data = await findMovie(searchText);
            setMovies(data.map((movie) => ({
                title: movie.title,
                image: (movie.poster_path) ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "",
                rating: movie.vote_average.toString(),
                genre: movie.genre_ids.map((genre) => GENRE_MAP[genre])
            })));
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
                            <MovieCard key={movie.title} image={movie.image} title={movie.title} rating={movie.rating} genre={movie.genre.join(", ")} />
                        ))}
                    </div>}
                </div>
            </div>
        </>
    );
}
