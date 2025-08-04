import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import axios from 'axios'

type ExpenseItem = {
    tag: string;
    amount: number;
};

interface FinanceAddProps {
    header: string;
}

function FinanceAdd({ header }: FinanceAddProps) {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const cardHeader = location.state?.header || header;

    // Parse month and year from id (format: mm-yyyy)
    let month: number | null = null;
    let year: number | null = null;
    if (id) {
        const match = id.match(/^(\d{2})-(\d{4})$/);
        if (match) {
            month = parseInt(match[1], 10);
            year = parseInt(match[2], 10);
        }
    }

    const [expenses, setExpenses] = useState<ExpenseItem[]>([
        { tag: '', amount: 0 }
    ]);
    const [total, setTotal] = useState<number>(0);

    const addExpense = () => {
        setExpenses([...expenses, { tag: '', amount: 0 }]);
    };

    const removeExpense = (index: number) => {
        if (expenses.length > 1) {
            const newExpenses = expenses.filter((_, i) => i !== index);
            setExpenses(newExpenses);
            updateTotal(newExpenses);
        }
    };

    const updateExpense = (index: number, field: 'tag' | 'amount', value: string | number) => {
        const newExpenses = [...expenses];
        newExpenses[index] = {
            ...newExpenses[index],
            [field]: field === 'amount' ? Number(value) || 0 : value
        };
        setExpenses(newExpenses);
        updateTotal(newExpenses);
    };

    const updateTotal = (expenseList: ExpenseItem[]) => {
        const sum = expenseList.reduce((acc, expense) => acc + expense.amount, 0);
        setTotal(sum);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!month || !year) {
            alert('Invalid month/year');
            return;
        }

        // Validate that all expenses have tags and amounts
        const validExpenses = expenses.filter(expense =>
            expense.tag.trim() !== '' && expense.amount > 0
        );

        if (validExpenses.length === 0) {
            alert('Please add at least one valid expense');
            return;
        }

        axios.post('http://localhost:5000/finance/new', { year, month, total, data: validExpenses })
            .then(() => {
                navigate(`/finance/${month}-${year}`);
            })
            .catch(err => console.log(err))
    };

    const handleBack = () => {
        navigate(`/finance/${id}`);
    };

    if (!month || !year) {
        return (
            <Card className="w-full max-w-4xl mx-auto my-8">
                <CardContent className="flex items-center justify-center h-32">
                    <p className="text-muted-foreground">Invalid month/year format</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-4xl mx-auto my-8">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={handleBack}>
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <div>
                        <CardTitle>{cardHeader}</CardTitle>
                        <CardDescription>
                            Add your expenses for {new Date(year, month - 1).toLocaleDateString('en-US', {
                                month: 'long',
                                year: 'numeric'
                            })}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-lg font-medium">Expenses</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addExpense}
                                className="flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add Expense
                            </Button>
                        </div>

                        {expenses.map((expense, index) => (
                            <div key={index} className="flex gap-4 items-end">
                                <div className="flex-1">
                                    <Label htmlFor={`tag-${index}`}>Category</Label>
                                    <Input
                                        id={`tag-${index}`}
                                        placeholder="e.g., Housing, Food, Transportation"
                                        value={expense.tag}
                                        onChange={(e) => updateExpense(index, 'tag', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <Label htmlFor={`amount-${index}`}>Amount (₹)</Label>
                                    <Input
                                        id={`amount-${index}`}
                                        type="number"
                                        placeholder="0"
                                        value={expense.amount || ''}
                                        onChange={(e) => updateExpense(index, 'amount', e.target.value)}
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                </div>
                                {expenses.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeExpense(index)}
                                        className="text-destructive hover:text-destructive"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                            <Label className="text-lg font-medium">Total Amount</Label>
                            <span className="text-2xl font-bold">₹{total.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button type="button" variant="outline" onClick={handleBack}>
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1">
                            Save Finance Data
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export default FinanceAdd; 