import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Health() {
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchNutrition() {
            try {
                const foodData = await axios.get('http://localhost:5000/food-data/latest');

                const day = String(foodData.data.day).padStart(2, "0");
                const month = String(foodData.data.month).padStart(2, "0");
                const year = foodData.data.year;
                const formattedDate = `${day}-${month}-${year}`;

                navigate(`/health/${formattedDate}`);
            } catch (error) {
                console.error("Error fetching latest data:", error);
            }
        }
        fetchNutrition();
    }, [navigate]);

    // Return a loading state while navigating
    return (
        <div className="flex items-center justify-center h-screen">
            <div>Loading latest health data...</div>
        </div>
    );
}