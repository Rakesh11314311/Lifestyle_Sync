import type { nutritionPair } from "@/states/health-data/types";
import { convertNutritionData, fetchTotalNutrition } from "./find-nutrition-data";
import { useEffect, useState } from "react";
import { NutrientsTable } from "./health-table";
import { demoFoodItems } from "@/states/health-data/types";

export default function Health() {
    const [nutritionData, setNutritionData] = useState<nutritionPair[] | null>(null);
    useEffect(() => {
        async function fetchNutrition() {
            const data = await fetchTotalNutrition(demoFoodItems);
            setNutritionData(convertNutritionData(data));
        }
        fetchNutrition();
    }, []);

    return (
        <>
            {nutritionData && <NutrientsTable nutrients={nutritionData} />}
        </>
    );
}