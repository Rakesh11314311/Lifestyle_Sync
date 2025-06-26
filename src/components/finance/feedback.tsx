import DoughnutChart from '../../shared_components/doughnut_chart/doughnut_chart';
import { useSelector } from 'react-redux'
import type { RootState } from '../home/main';
import type { ChartData } from 'chart.js';
import type { finObject } from '../../states/finance-data/demo-data';

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

    return (
        <>
            <h1 className='Heading text-3xl font-bold'>Finance</h1>
            <div className="bg-white rounded-xl shadow-md p-1 w-full max-w-md ml-5">
                <DoughnutChart data={generateChartData(finance[0])} />
            </div>
            <div>
            </div>
        </>
    )
}

export default Finance
