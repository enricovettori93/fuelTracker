import {RouterProvider} from "react-router-dom";
import router from "@router";
import {Toaster} from 'react-hot-toast';
import {useContext} from "react";
import {FirebaseContext} from "@contexts/firebase.context";
import FullScreenLoader from "@components/fullScreenLoader";

const App = () => {
  const {bootstrapped} = useContext(FirebaseContext);

  return (
    <>
      {
        bootstrapped && (
          <RouterProvider router={router}/>
        )
      }
      <FullScreenLoader show={!bootstrapped}/>
      <Toaster/>
    </>
  )
}

export default App;