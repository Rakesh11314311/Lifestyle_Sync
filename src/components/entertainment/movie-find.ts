// import dotenv from 'dotenv';
// dotenv.config({ path: '../../../.env' });

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
type TMDBMovie = {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};


//console.log("API KEY:", apiKey);

export default async function findMovie(movie: string): Promise<TMDBMovie[]> {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie}`);
    const data = await response.json();
    return data.results; // array of matching movies
}


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
