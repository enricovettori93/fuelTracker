import {useMemo, useState} from "react";
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
import {useTranslation} from "react-i18next";

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
  fullScreen?: boolean
}

const RefuelsGraph = ({refuels, fullScreen = false, ...restProps}: LineGraphProps) => {
  const {t} = useTranslation();
  const [averageConsumption, setAverageConsumption] = useState<number>(0);
  const chartData = useMemo(() => {
    const labels: string[] = []
    const data: number[] = [];
    let sumConsumption: number = 0;

    if (refuels.length > 1) {
      refuels.forEach((refuel, index) => {
        labels.push(refuel.actualKm.toString());
        if (index > 0) {
          const consumption = (refuel.actualKm - refuels[index - 1].actualKm) / refuel.quantity;
          data.push(consumption);
          sumConsumption += consumption;
        }
      });
    }

    setAverageConsumption(sumConsumption / data.length);

    const datasets = [
      {
        data,
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
    <>
      <Line data={chartData} {...allProps}/>
      {
        !fullScreen && (
          <p className="font-bold mt-4 text-center">{t("chart-page.average-consumption")} - {averageConsumption.toFixed(2)} KM / L</p>
        )
      }
    </>
  )
}

export default RefuelsGraph;