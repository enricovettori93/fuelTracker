import SelectRangeDate from "@forms/selectRangeDate";
import {useMemo, useState} from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import Card from "@components/card";
import useSearchRefuel from "@views/auth/chartRefuels/hooks/useSearchRefuel";
import {useTranslation} from "react-i18next";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

const ChartRefuelsPage = () => {
  const {t} = useTranslation();
  const [showChart, setShowChart] = useState<boolean>(false);
  const {refuels, loading, getData} = useSearchRefuel();

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

  const handleSelectRangeDate = async ({from, to}: {from: string, to: string}) => {
    // show the cart at the first user's interaction
    setShowChart(true);
    await getData({from, to});
  }

  return (
    <div>
      <Card className={`mb-10 transition-all ${showChart ? 'opacity-100' : 'opacity-0'}`}>
        {
          refuels.length === 0 && (
            <span>{t("common.no-data-available")}</span>
          )
        }
        {
          refuels.length > 0 && (
            <Line data={chartData} options={chartOptions}/>
          )
        }
      </Card>
      <SelectRangeDate isLoading={loading} onSelect={handleSelectRangeDate}/>
    </div>
  )
}

export default ChartRefuelsPage;