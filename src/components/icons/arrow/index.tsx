import Arrow from "@assets/arrow.svg";
import React from "react";

const ArrowIcon = () => {
  return (
    <img src={Arrow} alt="arrow-icon"/>
  )
}

export default React.memo(ArrowIcon);