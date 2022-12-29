import Car from "@assets/car.svg";
import React from "react";

const CarIcon = () => {
  return (
    <img src={Car} alt="car-icon"/>
  )
}

export default React.memo(CarIcon);