import type { finObject } from "@/states/finance-data/demo-data";

export function generateTextInsights(fin: finObject): string[] {
    const insights: string[] = [];

    // Making sure the total is not zero or negative
    if (fin.total <= 0) {
        return ["Total income is zero or negative. Insights cannot be generated."];
    }

    let savingsAmount = 0;
    let maxAmount = -1;
    let mostSpentTag = "";

    let totalSpent = 0;

    for (const item of fin.data) {
        if (item.tag.toLowerCase() === "savings") {
            savingsAmount = item.amount;
        } else {
            totalSpent += item.amount;
        }

        if (item.amount > maxAmount) {
            maxAmount = item.amount;
            mostSpentTag = item.tag;
        }
    }

    const savingsPercentage = (savingsAmount / fin.total) * 100;
    const spendingPercentage = (totalSpent / fin.total) * 100;

    insights.push(
        `Total income is ₹${fin.total}.`,
        `You saved ₹${savingsAmount}, which is ${savingsPercentage.toFixed(2)}% of your income.`,
        `You spent ₹${totalSpent}, accounting for ${spendingPercentage.toFixed(2)}% of your income.`,
        `The highest spending was on "${mostSpentTag}" with ₹${maxAmount}.`
    );

    return insights;
}
