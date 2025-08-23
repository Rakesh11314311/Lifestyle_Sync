import type { nutritionPair } from "@/states/health-data/types";
import { convertNutritionData, fetchTotalNutrition } from "./find-nutrition-data";
import { useEffect, useState } from "react";
import { NutrientsTable } from "./health-table";
import axios from "axios";

export default function Health() {
    const [nutritionData, setNutritionData] = useState<nutritionPair[] | null>(null);
    useEffect(() => {
        async function fetchNutrition() {
            const foodData = await axios.get('http://localhost:5000/food-data/latest');
            const nutritionData = await axios.get(`http://localhost:5000/nutrition-data/get?year=${foodData.data.year}&month=${foodData.data.month}&day=${foodData.data.day}`);
            // console.log(nutritionData.data[0].items);
            setNutritionData(nutritionData.data[0].items);
        }
        fetchNutrition();
    }, []);

    return (
        <>
            {nutritionData && <NutrientsTable nutrients={nutritionData} />}
        </>
    );
}