import SelectRangeDate from "@forms/selectRangeDate";
import {useState} from "react";
import Card from "@components/card";
import useSearchRefuel from "@views/auth/chartRefuels/hooks/useSearchRefuel";
import {useTranslation} from "react-i18next";
import RefuelsGraph from "@views/auth/chartRefuels/components/refuelsGraph";
import FullScreenOverlay from "@components/fullScreenOverlay";

const fullScreenChartOptions = {
  responsive: false
};

const ChartRefuelsPage = () => {
  const {t} = useTranslation();
  const [showChart, setShowChart] = useState<boolean>(false);
  const [showChartFullScreen, setShowChartFullScreen] = useState<boolean>(false);
  const {refuels, loading, getData} = useSearchRefuel();

  const handleSelectRangeDate = async ({from, to}: {from: string, to: string}) => {
    // show the cart at the first user's interaction
    setShowChart(true);
    await getData({from, to});
  }

  const toggleFullScreenOverlay = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setShowChartFullScreen(prev => !prev);
  }

  return (
    <div>
      <Card className={`mb-10 transition-all ${showChart ? 'opacity-100' : 'opacity-0'} relative`}>
        <i className="ci-expand absolute top-3 right-3 cursor:pointer" onClick={toggleFullScreenOverlay}/>
        {
          refuels.length === 0 && (
            <span>{t("common.no-data-available")}</span>
          )
        }
        {
          refuels.length > 0 && (
            <RefuelsGraph refuels={refuels}/>
          )
        }
      </Card>
      {
        showChartFullScreen && (
          <FullScreenOverlay className="flex justify-center items-center">
            <Card className="relative w-[80vw] h-[90vh]">
              <i className="ci-shrink absolute bottom-3 right-3 cursor:pointer" onClick={toggleFullScreenOverlay}/>
              <div className="w-full h-full inset-0 relative flex justify-center items-center">
                <RefuelsGraph refuels={refuels} options={fullScreenChartOptions} className="portrait:rotate-90 scale-[1.7]"/>
              </div>
            </Card>
          </FullScreenOverlay>
        )
      }
      <SelectRangeDate isLoading={loading} onSelect={handleSelectRangeDate}/>
    </div>
  )
}

export default ChartRefuelsPage;