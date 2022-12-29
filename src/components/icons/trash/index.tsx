import Trash from "@assets/trash.svg";
import React from "react";

const TrashIcon = () => {
  return (
    <img src={Trash} alt="trash-icon"/>
  )
}

export default React.memo(TrashIcon);