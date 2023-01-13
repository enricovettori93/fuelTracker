import React from 'react'
import {
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Wizard from "@views/auth/wizard";
import AddRefuel from "@views/auth/addRefuel";
import ListRefuels from "@views/auth/listRefuels";
import Settings from "@views/auth/settings";
import CommonLayout from "@layouts/commonLayout";
import AuthLayout from "@layouts/authLayout";
import ChartRefuels from "@views/auth/chartRefuels";
import Login from "@views/login";
import NotFound from "@views/notFound";
import ProtectedRoute from "@components/protectedRoute";

export const routes = {
  ROOT: "/",
  LOGIN: "/login",
  APP: "/app",
  WIZARD: "/app/wizard",
  ADD_REFUEL: "/app/add",
  LIST_REFUELS: "/app/list",
  CHART_REFUELS: "/app/chart",
  SETTINGS: "/app/settings"
}

const router = createBrowserRouter([
  {
    path: routes.ROOT,
    element: null,
    loader: function () {
      throw redirect(routes.WIZARD);
    }
  },
  {
    path: routes.LOGIN,
    element:
      <CommonLayout>
        <Login />
      </CommonLayout>,
  },
  {
    path: routes.APP,
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: null,
        loader: function () {
          throw redirect(routes.ADD_REFUEL);
        }
      },
      {
        path: routes.WIZARD,
        element:
          <AuthLayout titleKey="wizard.title" withNavbar={false}>
            <Wizard />
          </AuthLayout>,
      },
      {
        path: routes.ADD_REFUEL,
        element:
          <AuthLayout titleKey="add-refuel.title">
            <AddRefuel />
          </AuthLayout>,
      },
      {
        path: routes.LIST_REFUELS,
        element:
          <AuthLayout titleKey="list-refuels.title">
            <ListRefuels />
          </AuthLayout>,
      },
      {
        path: routes.CHART_REFUELS,
        element:
          <AuthLayout titleKey="chart-refuels.title">
            <ChartRefuels />
          </AuthLayout>,
      },
      {
        path: routes.SETTINGS,
        element:
          <AuthLayout titleKey="settings.title">
            <Settings />
          </AuthLayout>,
      },
    ],
  },
  {
    path: "*",
    element:
      <NotFound />
  }
]);

export default router;