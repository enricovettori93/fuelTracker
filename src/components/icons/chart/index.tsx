import Chart from "@assets/line_chart_up.svg";
import React from "react";

const ChartIcon = () => {
  return (
    <img src={Chart} alt="chart-icon"/>
  )
}

export default React.memo(ChartIcon);