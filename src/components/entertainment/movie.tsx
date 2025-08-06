import MovieCard from "./movie-card";
import type { movieObject } from '../../states/entertainment-data/types';
import { fetchAllMovieDetails, findMovie } from "./movie-find";
import { useEffect, useState } from "react";
import { GENRE_MAP } from "./movie-find";
import SearchBar from "@/shared_components/search-bar/search-bar";


export default function Movie() {
    const [movies, setMovies] = useState<movieObject[]>([]);
    const [searchText, setSearchText] = useState<string>("");

    useEffect(() => {
        setSearchText("The Dark Knight");
    }, []);

    useEffect(() => {
        setMovies([]);
        async function fetchMovies() {
            const data = await findMovie(searchText);
            const movie_ids = data.map((movie) => movie.id);
            const movie_details = await fetchAllMovieDetails(movie_ids);
            const details: movieObject[] = [];
            const list_length = movie_details.length;
            for (let i = 0; i < list_length; i++) {
                details.push({
                    id: data[i].id,
                    image: (data[i].poster_path) ? `https://image.tmdb.org/t/p/w500${data[i].poster_path}` : "",
                    title: data[i].title,
                    rating: data[i].vote_average.toString(),
                    genre: data[i].genre_ids.map((genre) => GENRE_MAP[genre]),
                    budget: movie_details[i].budget,
                    collection: movie_details[i].revenue
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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    return (
        <div className="flex flex-col mx-auto items-center justify-center w-full h-full flex-shrink-0">
            <div className="w-[60%] h-full justify-center items-center flex-shrink-0">
                <SearchBar value={searchText} onChange={handleSearchChange} onKeyDown={handleKeyDown} />
            </div>

            <div className="w-[100%] h-full justify-center flex-shrink-0">
                {(movies.length === 0) && <div className="flex flex-col items-center justify-center w-full h-full pt-8">
                    <h1 className="text-2xl font-bold">No movies found yet</h1>
                </div>}


                {(movies.length > 0) && <div className="flex flex-wrap items-center justify-center w-full h-[100%] pt-8 flex-shrink-0">
                    {movies
                        .filter((movie: movieObject) => (movie.image && movie.image.trim() !== "") && (movie.rating && Number(movie.rating) > 0) && (movie.genre.length > 0))
                        .map((movie: movieObject) => (
                            <MovieCard key={movie.title} image={movie.image} title={movie.title} rating={movie.rating} genre={movie.genre.join(", ")} budget={movie.budget.toString()} collection={movie.collection.toString()} />
                        ))}
                </div>}
            </div>
        </div>
    );
}
