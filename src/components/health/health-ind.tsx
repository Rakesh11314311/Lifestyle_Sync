import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { nutritionPair } from "@/states/health-data/types";
import { NutrientsTable } from "./health-table";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function HealthInd() {
    const { id } = useParams();
    const navigate = useNavigate();
    // id is of the format dd-mm-yyyy
    let day: number | null = null;
    let month: number | null = null;
    let year: number | null = null;

    const [currentId, setCurrentId] = useState<string | null>(null);
    const [foodItems, setFoodItems] = useState<string[] | null>(null);
    const [nutritionData, setNutritionData] = useState<nutritionPair[] | null>(null);

    useEffect(() => {
        if (id !== currentId) {
            setFoodItems(null);
            setNutritionData(null);
            setCurrentId(id ?? null);
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            const match = id.match(/^(\d{2})-(\d{2})-(\d{4})$/);
            if (match) {
                day = parseInt(match[1], 10);
                month = parseInt(match[2], 10);
                year = parseInt(match[3], 10);
            } else {
                navigate('/not-found');
            }
        }

        if (foodItems === null) {
            axios.get(`http://localhost:5000/food-data/get?year=${year}&month=${month}&day=${day}`)
                .then(res => {
                    console.log(res.data[0].items)
                    console.log("Ended up here in first half")
                    setFoodItems(res.data[0].items);
                    console.log("foodItems state updated:", foodItems);
                })
                .catch(err => {
                    console.log("Ended up here")
                    console.log(err);
                })

            axios.get(`http://localhost:5000/nutrition-data/get?year=${year}&month=${month}&day=${day}`)
                .then(res => {
                    console.log(res.data[0].items)
                    console.log("Ended up here in first half")
                    setNutritionData(res.data[0].items);
                    console.log("nutritionData state updated:", nutritionData);
                })
                .catch(err => {
                    console.log("Ended up here")
                    console.log(err);
                })
        }
    }, [currentId]);

    // useEffect(() => {
    //     console.log("foodItems state updated:", foodItems);
    //     console.log("nutritionData state updated:", nutritionData);
    // }, [foodItems, nutritionData]);

    if (foodItems === null || nutritionData === null) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <div>No data found for this day, please add data by clicking the button below</div>
                <Button onClick={() => navigate(`/health/${id}/add`)}>Add Data</Button>
            </div>
        );
    }

    // Helper function to parse dd-mm-yyyy into a Date object
    function parseDate(dateStr: string): Date {
        const [day, month, year] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day); // month is 0-based in JS
    }

    // Helper function to format Date object back to dd-mm-yyyy
    function formatDate(date: Date): string {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    function getNextDate(dateStr: string): string {
        const date = parseDate(dateStr);
        date.setDate(date.getDate() + 1);
        return formatDate(date);
    }

    function getPreviousDate(dateStr: string): string {
        const date = parseDate(dateStr);
        date.setDate(date.getDate() - 1);
        return formatDate(date);
    }

    const prevId = getPreviousDate(id ?? "");
    const nextId = getNextDate(id ?? "");

    const handlePrev = () => {
        if (prevId) navigate(`/health/${prevId}`);
    };
    const handleNext = () => {
        if (nextId) navigate(`/health/${nextId}`);
    };

    return (
        <>
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Daily Food Intake Overview</CardTitle>
                    <CardDescription>
                        Get insights on your nutrition intake for {id}.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-[10%]">
                        <div className="flex flex-col w-[45%] gap-4">
                            <h1 className="text-xl font-bold">
                                Daily Nutrition Summary
                            </h1>

                            <section className="border-2 border-gray-300 rounded-md p-4">
                                {nutritionData && <NutrientsTable nutrients={nutritionData} />}
                            </section>
                        </div>

                        <div className="flex flex-col w-[45%] gap-8">
                            <div className="flex flex-col gap-4">
                                <h1 className="text-xl font-bold">
                                    What You Ate on {id}
                                </h1>

                                <section className="border-2 border-gray-300 rounded-md p-4">
                                    {foodItems && (
                                        <div className="space-y-2">
                                            {foodItems.map((item, index) => (
                                                <div key={index} className="p-2 bg-gray-50 rounded">
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </section>
                            </div>

                            <div className="flex flex-col gap-4">
                                <h1 className="text-xl font-bold">
                                    AI Agent's Review
                                </h1>

                                <section className="border-2 border-gray-300 rounded-md p-4">
                                    {/* TODO: Add AI Agent's Review, following is a placeholder */}
                                    ✅ Good balance of fiber and vitamins from the fruit salad.

                                    🍵 Green tea provides antioxidants and helps with metabolism.

                                    🌾 Wheat rotis and dal together form a complete protein source, which is great for vegetarians.

                                    ⚖️ The meal is relatively low in fat and supports digestive health.

                                    💡 You may consider adding a source of healthy fats (e.g., nuts or seeds) to make the meal more balanced.
                                </section>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <div className="flex justify-center gap-4 w-full">
                        <Button variant="secondary" onClick={handlePrev} className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Prev Day
                        </Button>
                        <Button variant="secondary" onClick={handleNext} className="flex items-center gap-2">
                            Next Day <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </>
    );
}