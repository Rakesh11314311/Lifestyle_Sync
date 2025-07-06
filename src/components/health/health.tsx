import type { Nutrients } from "@/states/health-data/types";
import { fetchTotalNutrition } from "./find-nutrition-data";
import { useEffect, useState } from "react";
import { NutrientsTable } from "./health-table";
import { demoFoodItems } from "@/states/health-data/types";
import Navbar from "../navbar/navbar";

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
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen mt-12" style={{ backgroundColor: '#81b9d7' }}>
                {nutritionData && <NutrientsTable nutrients={nutritionData} />}
            </div>
        </>
    );
}