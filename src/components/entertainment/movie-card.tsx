import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useNavigate } from "react-router-dom";

export default function MovieCard({ id, image, title, rating, genre, budget, collection }: { id: Number, image: string, title: string, rating: string, genre: string, budget: string, collection: string }) {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => { navigate(`/entertainment/${id}`) }}
            className="flex items-center justify-center bg-white w-[27%] h-full p-4 rounded-lg m-2 pr-8
            transition duration-300 ease-in-out transform hover:scale-105 hover:brightness-80 hover:shadow-xl hover:cursor-pointer"
        >
            <div className="flex items-center justify-center w-1/8 h-full">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <img src={image} alt={title} className="w-full h-full" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="p-0 bg-transparent border-none shadow-none">
                        <img src={image} alt={title} className="w-40 h-60 object-cover" />
                    </TooltipContent>
                </Tooltip>
            </div>
            <div className="flex flex-col justify-start bg-white w-7/8 h-1/2 p-0  pr-8 rounded-lg">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex w-full h-1/2 justify-start ml-10">
                            <h1 className="text-lg font-bold truncate">{title}</h1>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{title}</p>
                    </TooltipContent>
                </Tooltip>
                <div className="flex w-full h-1/2 justify-start ml-10">
                    <p className="text-sm text-gray-500">{genre}</p>
                </div>
                <div className="flex w-full h-1/2 justify-start ml-10">
                    <p className="text-sm text-gray-500">{rating}</p>
                </div>
                {/* <div className="flex w-1/4 items-center justify-center">
                    <p className="text-sm text-gray-500">{budget}</p>
                </div>
                <div className="flex w-1/4 items-center justify-center">
                    <p className="text-sm text-gray-500">{collection}</p>
                </div> */}
            </div>
        </div>
    );
}