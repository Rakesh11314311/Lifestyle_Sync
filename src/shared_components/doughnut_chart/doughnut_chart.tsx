import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import type { ChartData } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// const data = {
//     labels: [
//         'Red',
//         'Blue',
//         'Yellow'
//     ],
//     datasets: [{
//         label: 'My First Dataset',
//         data: [300, 50, 100],
//         backgroundColor: [
//             'rgb(255, 99, 132)',
//             'rgb(54, 162, 235)',
//             'rgb(255, 205, 86)'
//         ],
//         hoverOffset: 30
//     }]
// };

type DoughnutChartProps = {
    data: ChartData<'doughnut'>;
};


export default function DoughnutChart({ data }: DoughnutChartProps) {
    return <Doughnut data={data} />;
}