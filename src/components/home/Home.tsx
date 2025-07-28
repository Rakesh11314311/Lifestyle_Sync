import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export const cardList: { name: string; description: string; route: string }[] = [
    {
        name: "Finance",
        description: "Track your monthly Financial Expenses",
        route: "/finance",
    },
    {
        name: "Entertainment",
        description: "Weekend Entertainment Recommendations",
        route: "/entertainment",
    },
    {
        name: "Health",
        description: "Track your daily Intake calories",
        route: "/health",
    },
];

export default function Home() {
    return (
        <>
            <div className="flex flex-col items-center justify-center py-12 pt-12" style={{ backgroundColor: '#81b9d7' }}>
                <h1 className="text-4xl font-bold mb-10 text-center">Hey There, What Do You Want to Focus on Today?</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-4">
                    {cardList.map((card, index) => (
                        <Link key={index} to={card.route} className="group">
                            <Card className="transition-transform hover:scale-105 hover:shadow-lg cursor-pointer h-full">
                                <CardHeader>
                                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">{card.name}</CardTitle>
                                    <CardDescription>{card.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {/* Optionally add an icon or illustration here */}
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}