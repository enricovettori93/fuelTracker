import Add from "@assets/add_to_queue.svg";
import React from "react";

const AddIcon = () => {
  return (
    <img src={Add} alt="add-icon"/>
  )
}

export default React.memo(AddIcon);