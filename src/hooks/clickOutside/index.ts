import React, {useEffect} from "react";

type Handler = (event: MouseEvent) => void;

const useClickOutside = (ref: React.RefObject<any>, handler: Handler) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }

      handler(e);
    }

    document.addEventListener("click", handleClick);
    return(() => {
      document.removeEventListener("click", handleClick);
    });
  }, [ref, handler]);
}

export default useClickOutside;