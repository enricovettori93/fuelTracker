import {useMemo} from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';
import {ChartProps, Line} from 'react-chartjs-2';
import {Refuel} from "@models/refuel";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const chartOptions = {
  responsive: "true",
};

interface LineGraphProps extends Omit<ChartProps, "data" | "type"> {
  refuels: Refuel[]
}

const RefuelsGraph = ({refuels, ...restProps}: LineGraphProps) => {
  const chartData = useMemo(() => {
    const labels: string[] = []
    const averageConsumption: number[] = [];

    if (refuels.length > 1) {
      refuels.forEach((refuel, index) => {
        labels.push(refuel.actualKm.toString());
        if (index > 0) {
          averageConsumption.push((refuel.actualKm - refuels[index - 1].actualKm) / refuel.quantity);
        }
      });
    }

    const datasets = [
      {
        data: averageConsumption,
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
      }
    ];

    return {
      labels,
      datasets
    }
  }, [refuels]);

  const allProps = {
    ...chartOptions,
    ...restProps
  }

  return (
    <Line data={chartData} {...allProps}/>
  )
}

export default RefuelsGraph;