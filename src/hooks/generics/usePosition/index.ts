import {useEffect, useState} from "react";

const usePosition = () => {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [error, setError] = useState<boolean>(false);

  const onChange = (position: GeolocationPosition) => {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  }

  const onError = () => {
    setError(true);
  }

  useEffect(() => {
    const geolocation = navigator.geolocation;
    if (!geolocation) {
      setError(true);
      return;
    }

    const watch = geolocation.watchPosition(onChange, onError);

    return () => geolocation.clearWatch(watch);
  }, []);

  return {lat, lng, error};
}

export default usePosition;