export default function MovieCard({ image, title, rating, genre, budget, collection }: { image: string, title: string, rating: string, genre: string, budget: string, collection: string }) {
    return (
        <div className="flex items-center justify-center bg-white w-1/2 h-1/2 p-4 rounded-lg m-2 pr-0">
            <div className="flex items-center justify-center w-1/8 h-1/2">
                <img src={image} alt={title} className="w-full h-full" />
            </div>
            <div className="flex items-center justify-center w-full bg-white w-7/8 h-1/2 p-0  pr-8 rounded-lg">
                <div className="flex w-1/2 items-left ml-0">
                    <h1 className="text-lg font-bold ml-10">{title}</h1>
                </div>
                <div className="flex w-1/4 items-center justify-center">
                    <p className="text-sm text-gray-500">{rating}</p>
                </div>
                <div className="flex w-1/4 items-center justify-center">
                    <p className="text-sm text-gray-500">{genre}</p>
                </div>
                <div className="flex w-1/4 items-center justify-center">
                    <p className="text-sm text-gray-500">{budget}</p>
                </div>
                <div className="flex w-1/4 items-center justify-center">
                    <p className="text-sm text-gray-500">{collection}</p>
                </div>
            </div>
        </div>
    );
}