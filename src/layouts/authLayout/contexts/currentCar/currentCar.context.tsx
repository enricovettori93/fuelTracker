import React from "react";
import useCurrentCar from "@hooks/car/useCurrentCar";

interface ICurrentCarContext {
  currentCarId: string | null
}

export const CurrentCarContext = React.createContext<ICurrentCarContext>({
  currentCarId: null
});

const CurrentCarProvider = (props: React.PropsWithChildren<any>) => {
  const {children} = props;
  const {currentCar} = useCurrentCar();

  return (
    <CurrentCarContext.Provider value={{currentCarId: currentCar}}>
      {children}
    </CurrentCarContext.Provider>
  )
}

export default CurrentCarProvider;