import type { TMDBMovie, MovieDetail } from "@/states/entertainment-data/types";
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
import type { MovieDetailPageProps } from "./movie-detail-page";

export const GENRE_MAP: { [key: number]: string } = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
};


//console.log("API KEY:", apiKey);

export async function findMovie(movie: string): Promise<TMDBMovie[]> {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie}`);
    const data = await response.json();
    return data.results; // array of matching movies
}

export async function findMovieDetails(movie_id: number): Promise<MovieDetail> {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`);
    const data = await response.json();
    return {
        budget: data.budget,
        revenue: data.revenue
    }; // array of matching movies
}

export async function fetchAllMovieDetails(movie_ids: number[]): Promise<MovieDetail[]> {
    const allMovieDetails = await Promise.all(movie_ids.map(id => findMovieDetails(id)));

    return allMovieDetails;
}

export function minutesToHours(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return (hours > 0) ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}m`;
}

export async function giveSingleMovieDetails(movie_id: number = 597): Promise<MovieDetailPageProps> {
    const movieDetails = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`);
    const mv = await movieDetails.json();

    return {
        title: mv.title,
        poster: `https://image.tmdb.org/t/p/w500${mv.poster_path}`,
        rating: mv.vote_average,
        genre: mv.genres.map((genre: { id: number; name: string }) => GENRE_MAP[genre.id]).join(', '),
        budget: mv.budget,
        collection: mv.revenue,
        description: mv.overview,
        tagline: mv.tagline,
        year: mv.release_date.split("-")[0],
        duration: minutesToHours(mv.runtime),
    }
}

export async function giveCastCrew(movie_id: number = 597): Promise<any> {
    const castCrew = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${apiKey}`);
    const mv = await castCrew.json();

    console.log("QWERTY***** : ", mv.cast.map(
        (el: any) => {
            return {
                name: el.name,
                picture: `https://image.tmdb.org/t/p/w500${el.profile_path}`,
                role: el.character,
            }
        }
    ));

    return mv.cast.map(
        (el: any) => {
            return {
                name: el.name,
                picture: `https://image.tmdb.org/t/p/w500${el.profile_path}`,
                role: el.character,
            }
        }
    );
}

export function makeCommaSeparated(number: number): string {
    return number.toLocaleString('en-US');
}