import React from "react";
import {ICurrentCarContext} from "@layouts/authLayout/contexts/currentCar/CurrentCarContext";
import useCurrentCar from "@hooks/car/useCurrentCar";

export const CurrentCarContext = React.createContext<ICurrentCarContext>({
  currentCarId: null
});

const CurrentCarContextProvider = (props: React.PropsWithChildren<any>) => {
  const {children} = props;
  const {currentCar} = useCurrentCar();

  return (
    <CurrentCarContext.Provider value={{currentCarId: currentCar}}>
      {children}
    </CurrentCarContext.Provider>
  )
}

export default CurrentCarContextProvider;