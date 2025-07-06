import DoughnutChart from '../../shared_components/doughnut_chart/doughnut_chart';
import { useSelector } from 'react-redux'
import type { RootState } from '../home/main';
import InsightBox from '../../shared_components/insight-box/insight-box';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import { generateTextInsights } from './functionalities';
import { generateChartData } from '../../shared_components/utils/util';
import Navbar from '../navbar/navbar';

function FinanceInd() {
    const finance = useSelector((state: RootState) => state.finance);
    const { id } = useParams();
    const navigate = useNavigate();

    // id is of the format mm-yyyy
    let month: number | null = null;
    let year: number | null = null;
    let isValidId = false;

    if (id) {
        const match = id.match(/^(\d{2})-(\d{4})$/);
        if (match) {
            month = parseInt(match[1], 10);
            year = parseInt(match[2], 10);
            isValidId = true;
        } else {
            navigate('/not-found');
            return;
        }
    }

    // Find the index of the finance entry matching month and year
    const idx = finance.findIndex(f => f.month === month && f.year === year);
    const finEntry = idx !== -1 ? finance[idx] : null;

    // For navigation, get previous and next entries
    const isFirst = idx <= 0;
    const isLast = idx === finance.length - 1;
    const prevId = !isFirst && finance[idx - 1] ? `${String(finance[idx - 1].month).padStart(2, '0')}-${finance[idx - 1].year}` : null;
    const nextId = !isLast && finance[idx + 1] ? `${String(finance[idx + 1].month).padStart(2, '0')}-${finance[idx + 1].year}` : null;

    const handlePrev = () => {
        if (prevId) navigate(`/finance/${prevId}`);
    };
    const handleNext = () => {
        if (nextId) navigate(`/finance/${nextId}`);
    };

    const handleAddData = () => {
        navigate(`/finance/${id}/add`);
    };

    // If ID is valid but no data exists, show the "No data available" message
    if (isValidId && !finEntry) {
        return (
            <>
                <Navbar />
                <Card className="w-full max-w-4xl mx-auto my-8">
                    <CardHeader>
                        <CardTitle>Monthly Finance Overview</CardTitle>
                        <CardDescription>
                            {new Date(year!, month! - 1).toLocaleDateString('en-US', {
                                month: 'long',
                                year: 'numeric'
                            })}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center py-16 space-y-6">
                            <div className="text-center space-y-4">
                                <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
                                    <Plus className="w-12 h-12 text-muted-foreground" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">No data available for this month</h3>
                                    <p className="text-muted-foreground">
                                        Start tracking your expenses by adding data for this month.
                                    </p>
                                </div>
                            </div>
                            <Button onClick={handleAddData} className="flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Add Data for This Month
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <Card className="w-full max-w-4xl mx-auto mt-24">
                <CardHeader>
                    <CardTitle>Monthly Finance Overview</CardTitle>
                    <CardDescription>
                        Visualize your monthly expenses and get actionable insights.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Chart Section */}
                        <div className="lg:w-1/2 w-full flex items-start justify-start">
                            <div className="relative aspect-square max-w-[350px] w-full bg-muted rounded-lg shadow-sm p-4">
                                {finEntry ? <DoughnutChart data={generateChartData(finEntry)} /> : <div>Invalid month/year</div>}
                            </div>
                        </div>
                        {/* Divider for large screens */}
                        <div className="hidden lg:block w-px bg-border mx-2" />
                        {/* Description Section */}
                        <div className="lg:w-1/2 w-full flex items-center justify-center">
                            <div className="w-full bg-muted rounded-lg shadow-sm p-4">
                                {finEntry ? <InsightBox insights={generateTextInsights(finEntry)} /> : null}
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <div className="flex justify-center gap-4 w-full">
                        <Button variant="secondary" onClick={handlePrev} disabled={isFirst} className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Prev Month
                        </Button>
                        <Button variant="secondary" onClick={handleNext} disabled={isLast} className="flex items-center gap-2">
                            Next Month <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </>
    );
}



export default FinanceInd