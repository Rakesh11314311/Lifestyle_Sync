import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function MovieCard({ image, title, rating, genre, budget, collection }: { image: string, title: string, rating: string, genre: string, budget: string, collection: string }) {
    return (
        <div className="flex items-center justify-center bg-white w-[27%] h-full p-4 rounded-lg m-2 pr-8">
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
                    <TooltipTrigger>
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