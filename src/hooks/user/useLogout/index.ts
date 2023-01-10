import getFirebase from "@firebase/firebase";
import {useNavigate} from "react-router-dom";
import {routes} from "@router";

const useLogout = () => {
  const {auth} = getFirebase();
  const navigate = useNavigate();

  const logout = async () => {
    await auth.signOut();
    navigate(routes.LOGIN);
  }

  return {
    logout
  }
}

export default useLogout;
