import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Nutrients } from "@/states/health-data/types";

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

export function NutrientsTable({ nutrients }: NutrientsTableProps) {
    return (
        <Table className="w-[40%] h-[80%] mx-auto bg-white rounded-lg shadow-lg">
            <TableHeader>
                <TableRow className="border-b-2 border-black">
                    <TableHead className="border-r-2 border-black">Nutrient</TableHead>
                    <TableHead>Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Object.entries(nutrients).map(([key, value]) =>
                    value !== undefined ? (
                        <TableRow key={key} className="border-b-2 border-black">
                            <TableCell className="border-r-2 border-black">{nutrientDisplayNames[key] ?? key}</TableCell>
                            <TableCell>{value.toFixed(4)}</TableCell>
                        </TableRow>
                    ) : null
                )}
            </TableBody>
        </Table>
    );
}
