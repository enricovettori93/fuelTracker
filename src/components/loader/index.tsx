import React from "react";

const Loader = () => {
  return (
    <div className="w-6 h-6 rounded-full animate-spin border border-solid border-white border-t-transparent"></div>
  )
}

export default React.memo(Loader);