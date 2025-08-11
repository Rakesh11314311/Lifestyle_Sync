import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function NotFound() {
    return (
        <Card style={{ maxWidth: 400, width: "100%" }}>
            <CardHeader>
                <CardTitle>404 - Page Not Found</CardTitle>
                <CardDescription>
                    Sorry, the page you are looking for does not exist or has been moved.
                </CardDescription>
            </CardHeader>
            <CardContent style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
                <Button asChild variant="default">
                    <a href="/">Go Home</a>
                </Button>
            </CardContent>
        </Card>
    )
}