import {useNavigate} from "react-router-dom";
import {routes} from "@router";
import {useContext} from "react";
import {FirebaseContext} from "@contexts/firebase.context";

const useLogout = () => {
  const {auth} = useContext(FirebaseContext);
  const navigate = useNavigate();

  const logout = async () => {
    await auth?.signOut();
    navigate(routes.LOGIN);
  }

  return {
    logout
  }
}

export default useLogout;
