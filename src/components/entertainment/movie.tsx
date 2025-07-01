import MovieCard from "./movie-card";
import { useSelector } from 'react-redux'
import type { RootState } from '../home/main';
import type { movieObject } from '../../states/entertainment-data/demo-data';

export default function Movie() {

    const movies = useSelector((state: RootState) => state.entertainment);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full pt-30">
            {movies.map((movie: movieObject) => (
                <MovieCard key={movie.title} image={movie.image} title={movie.title} rating={movie.rating} genre={movie.genre.join(", ")} />
            ))}
        </div>
    );
}
