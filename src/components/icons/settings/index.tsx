import Setting from "@assets/settings_filled.svg";
import React from "react";

const SettingsIcon = () => {
  return (
    <img src={Setting} alt="add-icon"/>
  )
}

export default React.memo(SettingsIcon);