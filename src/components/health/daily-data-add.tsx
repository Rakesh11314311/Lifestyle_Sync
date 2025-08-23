import { useState } from "react";
// import type { dayInfo } from "@/states/health-data/types";
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import { convertNutritionData, fetchTotalNutrition } from "./find-nutrition-data";

function DailyDataAdd() {
    const { id } = useParams();
    const navigate = useNavigate();
    // id is of the format dd-mm-yyyy
    let day: number = 0;
    let month: number = 0;
    let year: number = 0;

    const [foodItems, setFoodItems] = useState<string[]>([
        "",
    ]);

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


    const addFoodItem = () => {
        setFoodItems([...foodItems, ""]);
    };

    const removeFoodItem = (index: number) => {
        if (foodItems.length > 1) {
            const newFoodItems = foodItems.filter((_, i) => i !== index);
            setFoodItems(newFoodItems);
        }
    };

    const updateFoodItems = (index: number, newValue: string) => {
        const newFoodItems = [...foodItems];
        newFoodItems[index] = newValue;
        setFoodItems(newFoodItems);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validFoodItems = foodItems.filter(food => food.trim() !== '');

        if (validFoodItems.length === 0) {
            alert('Please add at least one food intake item');
        }
        else {
            const data = await axios.post('http://localhost:5000/food-data/new', {
                year: year,
                month: month,
                day: day,
                items: foodItems
            })
            console.log("Food Intake Data : ", data)

            const nutritionData = await fetchTotalNutrition(validFoodItems);
            console.log("Nutrition Data : ", nutritionData);

            const nutritionDataList = convertNutritionData(nutritionData);

            console.log("Nutrition Data List : ", nutritionDataList);

            const savedNutritionData = await axios.post('http://localhost:5000/nutrition-data/new', {
                year: year,
                month: month,
                day: day,
                items: nutritionDataList
            })
            console.log("Nutrition Data : ", savedNutritionData)
            navigate(`/health/${id}`);
        }
    };

    const handleBack = () => {
    };

    return (
        <Card className="w-full max-w-4xl mx-auto my-8">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={handleBack}>
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <div>
                        <CardTitle>Add Food Intake Data</CardTitle>
                        <CardDescription>
                            Add your Food Intake Details for {"0".repeat(2 - day.toString().length) + day}/{"0".repeat(2 - month.toString().length) + month}/{year}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-lg font-medium">Food Intakes</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addFoodItem}
                                className="flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add Food Item
                            </Button>
                        </div>

                        {foodItems.map((foodItem, index) => (
                            <div key={index} className="flex gap-4 items-end">
                                <div className="flex-1">
                                    <Label htmlFor={`food-item-${index}`}>Food Item {index + 1}</Label>
                                    <Input
                                        id={`food-item-${index}`}
                                        placeholder="Enter a Food Item"
                                        value={foodItem}
                                        onChange={(e) => updateFoodItems(index, e.target.value)}
                                        required
                                    />
                                </div>
                                {foodItems.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeFoodItem(index)}
                                        className="text-destructive hover:text-destructive"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button type="button" variant="outline" onClick={handleBack}>
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1">
                            Save Food Intake Data
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export default DailyDataAdd; 