import { useSelector } from 'react-redux'
import type { RootState } from '../home/main';
import type { ChartData } from 'chart.js';
import type { finObject } from '../../states/finance-data/demo-data';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const defaultColors = [
    'rgb(255, 99, 132)',    // Red
    'rgb(54, 162, 235)',    // Blue
    'rgb(255, 205, 86)',    // Yellow
    'rgb(75, 192, 192)',    // Teal
    'rgb(153, 102, 255)',   // Purple
    'rgb(255, 159, 64)',    // Orange
    'rgb(201, 203, 207)',   // Gray
    'rgb(0, 200, 83)',      // Green
    'rgb(255, 87, 34)',     // Deep Orange
    'rgb(63, 81, 181)'      // Indigo
];


export function generateChartData(
    demoFinList: finObject,
    label = 'Expenses Breakdown',
    colors: string[] = defaultColors
): ChartData<'doughnut'> {
    return {
        labels: demoFinList.data.map(item => item.tag),
        datasets: [{
            label,
            data: demoFinList.data.map(item => item.amount),
            backgroundColor: colors.slice(0, demoFinList.data.length),
            hoverOffset: 30
        }]
    };
}



function Finance() {
    const finance = useSelector((state: RootState) => state.finance);
    const navigate = useNavigate();

    useEffect(() => {
        if (finance && finance.length > 0) {
            // Find the latest entry by year and month
            const latest = finance.reduce((a, b) => {
                if (a.year > b.year) return a;
                if (a.year < b.year) return b;
                return a.month > b.month ? a : b;
            });
            const id = `${String(latest.month).padStart(2, '0')}-${latest.year}`;
            navigate(`/finance/${id}`, { replace: true });
        }
    }, [finance, navigate]);

    return null;
}

export default Finance