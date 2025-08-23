import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { nutritionPair } from "@/states/health-data/types";
import { NutrientsTable } from "./health-table";
import { Button } from "../ui/button";

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

    return (
        <>
            {nutritionData && <NutrientsTable nutrients={nutritionData} />}
        </>
    );
}