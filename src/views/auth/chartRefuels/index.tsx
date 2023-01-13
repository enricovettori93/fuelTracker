import SelectRangeDateForm from "@forms/selectRangeDate";
import React, {useContext, useState} from "react";
import Card from "@components/card";
import useSearchRefuel from "@views/auth/chartRefuels/hooks/useSearchRefuel";
import {useTranslation} from "react-i18next";
import RefuelsGraph from "@views/auth/chartRefuels/components/refuelsGraph";
import FullScreenOverlay from "@components/fullScreenOverlay";
import {CurrentCarContext} from "@layouts/authLayout/contexts/currentCar/currentCar.context";
import Loader from "@components/loader";

const fullScreenChartOptions = {
  responsive: false
};

const ChartRefuelsPage = () => {
  const {t} = useTranslation();
  const [showChart, setShowChart] = useState<boolean>(false);
  const [showChartFullScreen, setShowChartFullScreen] = useState<boolean>(false);
  const {refuels, loading, getData} = useSearchRefuel();
  const {currentCarId} = useContext(CurrentCarContext);

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
        {
          loading && (
            <div className="flex">
              <Loader className="w-6 h-6 border-orange-500 mr-5"/>
              <span>{t("common.loading")}</span>
            </div>
          )
        }
        {
          refuels.length === 0 && !loading && (
            <span>{t("common.no-data-available")}</span>
          )
        }
        {
          refuels.length > 1 && !loading && (
            <>
              <i className="ci-expand absolute top-3 right-3 cursor:pointer" onClick={toggleFullScreenOverlay}/>
              <RefuelsGraph refuels={refuels}/>
            </>
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
      <SelectRangeDateForm
        isLoading={loading}
        isFormDisabled={!currentCarId}
        errorMessage={!currentCarId ? t("common.must-insert-car-first") : null}
        onSelect={handleSelectRangeDate}
      />
    </div>
  )
}

export default ChartRefuelsPage;