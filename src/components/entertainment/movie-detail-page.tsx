import { FaUserCircle } from 'react-icons/fa';
import { giveSingleMovieDetails, giveCastCrew, makeCommaSeparated } from "./movie-find";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { HeartCrack } from 'lucide-react';
import { Heart } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ListPlus } from "lucide-react";

export interface MovieDetailPageProps {
    title: string;
    poster: string;
    rating: number;
    genre: string;
    budget: number;
    collection: number;
    description: string;
    tagline?: string;
    year: number;
    duration: string;
}

export interface Cast {
    name: string;
    picture: string;
    role: string;
}

export default function MovieDetailPage() {
    const movieId = useParams().id;
    const [mv, setMv] = useState<MovieDetailPageProps | null>(null);
    const [castCrew, setCastCrew] = useState<Cast[] | null>(null);
    const [isFav, setIsFav] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await giveSingleMovieDetails(Number(movieId));
            setMv(data);
        }
        fetchData();

        const fetchCast = async () => {
            const data = await giveCastCrew(Number(movieId));
            setCastCrew(data);
        }
        fetchCast();
    }, [])

    return (
        <div className="flex flex-col w-full h-full">
            {
                (mv === null) ?
                    (<div>Loading</div>) :

                    (
                        <div className="flex flex-col">
                            <div className="flex w-full h-full p-10 justify-start items-start">
                                <div className="flex p-3 mr-10 bg-gradient-to-br from-rose-400 via-yellow-300 to-violet-500 rounded-2xl border-3 border-fuchsia-300 shadow-lg">
                                    <img src={mv.poster} alt={mv.title} className="w-80 h-120 object-cover rounded-2xl border-3 border-rose-300 shadow-md" />
                                </div>


                                <div className="flex flex-col">
                                    <div className='flex'>
                                        <div>
                                            <div className="flex items-end">
                                                <h1 className="text-4xl font-bold mr-8">{mv.title}</h1>
                                                {(mv.year) && <div className="bold text-2xl mb-1">[{mv.year}]</div>}
                                            </div>

                                            {(!!mv.tagline) && (<div className="font-cinzel text-xl italic tracking-wide mt-5">"{mv.tagline}"</div>)}

                                            <div className="mt-5 mb-5 text-xl">{mv.duration}</div>

                                            <div className="bg-gray-400 w-fit border border-black rounded-2xl px-2 text-xl">Genre : {mv.genre}</div>
                                        </div>

                                        <div className='flex w-60 h-20 items-center justify-center p-2 bg-green-300 rounded-2xl border-3 border-gray-600 mt-5 ml-60'>
                                            <div className='flex w-full h-full items-center justify-center m-1 p-2 bg-blue-200 rounded-tl-2xl rounded-bl-2xl border-3 border-gray-600'>
                                                <Heart
                                                    size={48}
                                                    fill={(isFav) ? "pink" : "white"}
                                                    stroke="#4B5563"
                                                    strokeWidth={1}
                                                    className="transition-transform duration-200 hover:scale-110 hover:drop-shadow-lg"
                                                    onClick={() => { setIsFav(isFav => (!isFav)) }}
                                                />
                                            </div>
                                            <div className='flex w-full h-full items-center justify-center m-1 p-2 bg-blue-200 rounded-tr-2xl rounded-br-2xl border-3 border-gray-600'>
                                                <ListPlus
                                                    size={48}
                                                    fill="pink"
                                                    stroke="#4B5563"
                                                    strokeWidth={2}
                                                    className="transition-transform duration-200 hover:scale-110 hover:drop-shadow-lg"
                                                />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="flex flex-col mt-8">
                                        <h3 className="text-xl font-semibold mr-8">Cast</h3>

                                        <div className="flex items-center p-5 pr-0 w-[800px] h-[250px] overflow-x-scroll overflow-y-hidden bg-green-400 rounded-2xl">
                                            {(castCrew === null) && (
                                                <div className="flex w-full h-full justify-center items-start">
                                                    <h1 className="text-xl font-medium">Fetching the Cast</h1>
                                                    <Loader2 className="animate-spin ml-5" />
                                                </div>
                                            )}

                                            {(castCrew !== null) && (castCrew.length === 0) && (
                                                <div className="flex w-full h-full justify-center items-center">
                                                    <h1 className="text-xl font-medium mr-5">Cast Details not available</h1>
                                                    <HeartCrack />
                                                </div>
                                            )}

                                            {(castCrew !== null) && (castCrew.length > 0) && (
                                                castCrew.slice(0, Math.min(20, castCrew.length)).map((el, i) => (
                                                    <div key={i} className="flex-col justify-center items-center flex-shrink-0 w-[130px] h-[235px] mr-5 bg-green-100 rounded-2xl">

                                                        {(el.picture.slice(-3) === "jpg") ?
                                                            (<img src={el.picture} alt={`Picture of ${el.name}`} className="w-[120px] h-[180px] rounded-xl ml-1" />) :
                                                            (
                                                                <div className='mt-[30px] mb-[30px] ml-1'>
                                                                    <FaUserCircle size={120} color="#ccc" />
                                                                </div>
                                                            )
                                                        }


                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <div>
                                                                    <h4 className="text-md truncate ml-2">{el.name}</h4>
                                                                    <h4 className="text-md truncate ml-2 opacity-60 italic font-semibold">{el.role}</h4>
                                                                </div>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <div>
                                                                    <h4 className="text-md ml-2">{el.name}</h4>
                                                                    <h4 className="text-md ml-2 opacity-60 italic font-semibold">{el.role}</h4>
                                                                </div>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="px-10 py-5 justify-start items-start bg-amber-200 m-10 mt-0 rounded-2xl ">
                                <h3 className="text-xl italic font-semibold opacity-80 underline">Movie Overview :</h3>
                                <span className="ml-10 block text-justify">{mv.description}</span>
                            </div>

                            <div className="flex items-center justify-center bg-[#c1bceb] m-10 mt-0 rounded-2xl ">
                                <div className='flex flex-col w-full items-center justify-center bg-amber-100 m-5 p-5 rounded-2xl'>
                                    <h3 className="text-xl italic font-semibold">
                                        Rating
                                    </h3>
                                    <span>
                                        {mv.rating}
                                    </span>
                                </div>
                                <div className='flex flex-col w-full items-center justify-center bg-amber-100 m-5 p-5 rounded-2xl'>
                                    <h3 className="text-xl italic font-semibold">
                                        Budget
                                    </h3>
                                    <span>
                                        ${makeCommaSeparated(mv.budget)}
                                    </span>
                                </div>
                                <div className='flex flex-col w-full items-center justify-center bg-amber-100 m-5 p-5 rounded-2xl'>
                                    <h3 className="text-xl italic font-semibold">
                                        Revenue
                                    </h3>
                                    <span>
                                        ${makeCommaSeparated(mv.collection)}
                                    </span>
                                </div>
                            </div>

                        </div>
                    )
            }
        </div >
    )
}