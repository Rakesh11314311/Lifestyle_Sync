export default function MovieCard({ image, title, rating, genre }: { image: string, title: string, rating: string, genre: string }) {
    return (
        <div className="flex items-center justify-center bg-white w-1/2 h-1/2 p-4 rounded-lg m-2">
            <img src={image} alt={title} className="w-1/2 h-1/2" />
            <div className="flex flex-col items-center justify-center bg-white w-1/2 h-1/2 p-4 rounded-lg">
                <div className="flex items-center justify-center">
                    <h1>{title}</h1>
                    <p>{rating}</p>
                    <p>{genre}</p>
                </div>
            </div>
        </div>
    );
}