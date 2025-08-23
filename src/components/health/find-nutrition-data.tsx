const NUTRITIONIX_APP_ID = import.meta.env.VITE_NUTRITIONIX_APP_ID;
const NUTRITIONIX_APP_KEY = import.meta.env.VITE_NUTRITIONIX_APP_KEY;
import type { Nutrients, nutritionPair } from "@/states/health-data/types";

export async function fetchNutritionData(query: string): Promise<Nutrients> {
    const response = await fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-app-id": NUTRITIONIX_APP_ID,  // OR use your string directly
            "x-app-key": NUTRITIONIX_APP_KEY,
        },
        body: JSON.stringify({
            query: query,
        }),
    });

    const data = await response.json();
    //console.log(JSON.stringify(data));

    //the following function is used to get micronutrient details
    const find = (id: number) => data.foods[0].full_nutrients.find((n: any) => n.attr_id === id)?.value ?? 0;

    return {
        calories: data.foods[0].nf_calories,
        protein: data.foods[0].nf_protein,
        fat: data.foods[0].nf_total_fat,
        carbohydrate: data.foods[0].nf_total_carbohydrate,
        fiber: data.foods[0].nf_dietary_fiber,
        sugars: data.foods[0].nf_sugars,
        vitamin_a: find(318),
        vitamin_b: find(415),
        vitamin_c: find(401),
        vitamin_d: find(324),
        potassium: data.foods[0].nf_potassium,
        sodium: data.foods[0].nf_sodium,
        calcium: find(301),
        iron: find(303),
        magnesium: find(304),
        zinc: find(309),
    };
};

export function convertNutritionData(nutritionData: Nutrients): nutritionPair[] {
    return Object.entries(nutritionData).map(([key, value]) => ({
        nutrient: key,
        amount: value ?? 0
    }));
}

export async function fetchTotalNutrition(queries: string[]): Promise<Nutrients> {
    const allNutrients = await Promise.all(queries.map(query => fetchNutritionData(query)));

    // Sum up all nutrients
    const total: Nutrients = {
        calories: 0,
        protein: 0,
        fat: 0,
        carbohydrate: 0,
        fiber: 0,
        sugars: 0,
        vitamin_a: 0,
        vitamin_b: 0,
        vitamin_c: 0,
        vitamin_d: 0,
        potassium: 0,
        sodium: 0,
        calcium: 0,
        iron: 0,
        magnesium: 0,
        zinc: 0,
    };

    for (const item of allNutrients) {
        for (const key in item) {
            if (item[key] !== undefined) {
                total[key] = (total[key] ?? 0) + item[key]!;
            }
        }
    }

    return total;
}