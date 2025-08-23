import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Nutrients, nutritionPair } from "@/states/health-data/types";

interface NutrientsTableProps {
    nutrients: Nutrients;
}

const nutrientDisplayNames: Record<string, string> = {
    calories: "Calories (kcal)",
    protein: "Protein (g)",
    fat: "Fat (g)",
    carbohydrate: "Carbohydrate (g)",
    fiber: "Fiber (g)",
    sugars: "Sugars (g)",
    vitamin_a: "Vitamin A (IU)",
    vitamin_b: "Vitamin B6 (mg)",
    vitamin_c: "Vitamin C (mg)",
    vitamin_d: "Vitamin D (IU)",
    potassium: "Potassium (mg)",
    sodium: "Sodium (mg)",
    calcium: "Calcium (mg)",
    iron: "Iron (mg)",
    magnesium: "Magnesium (mg)",
    zinc: "Zinc (mg)",
};

export function NutrientsTable({ nutrients }: { nutrients: nutritionPair[] }) {
    return (
        <Table className="w-[40%] h-[80%] mx-auto bg-white rounded-lg shadow-lg">
            <TableHeader>
                <TableRow className="border-b-2 border-black">
                    <TableHead className="border-r-2 border-black">Nutrient</TableHead>
                    <TableHead>Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {nutrients.map((nutrient) =>
                    nutrient.amount !== undefined ? (
                        <TableRow key={nutrient.nutrient} className="border-b-2 border-black">
                            <TableCell className="border-r-2 border-black">{nutrientDisplayNames[nutrient.nutrient] ?? nutrient.nutrient}</TableCell>
                            <TableCell>{nutrient.amount.toFixed(4)}</TableCell>
                        </TableRow>
                    ) : null
                )}
            </TableBody>
        </Table>
    );
}
