import FullScreenOverlay from "@components/fullScreenOverlay";
import React from "react";
import Loader from "@components/loader";

interface FullScreenLoaderProps {
  show: boolean
}

const FullScreenLoader = ({show}: FullScreenLoaderProps) => {
  return (
    <FullScreenOverlay className={`flex justify-center items-center transition-all delay-100 ${show ? "opacity-1 visible" : "opacity-0 invisible"}`}>
      <Loader className="w-24 h-24 border-orange-500"/>
    </FullScreenOverlay>
  )
}

export default FullScreenLoader;