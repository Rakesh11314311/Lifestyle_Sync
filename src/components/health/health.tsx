import type { Nutrients } from "@/states/health-data/types";
import { fetchTotalNutrition } from "./find-nutrition-data";
import { useEffect, useState } from "react";
import { NutrientsTable } from "./health-table";
import { demoFoodItems } from "@/states/health-data/types";

export default function Health() {
    const [nutritionData, setNutritionData] = useState<Nutrients | null>(null);
    useEffect(() => {
        async function fetchNutrition() {
            const data = await fetchTotalNutrition(demoFoodItems);
            setNutritionData(data);
        }
        fetchNutrition();
    }, []);

    return (
        <>
            {nutritionData && <NutrientsTable nutrients={nutritionData} />}
        </>
    );
}