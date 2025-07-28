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


import type { TMDBMovie, MovieDetail } from "@/states/entertainment-data/types";
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

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