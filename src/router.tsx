import React from 'react'
import {
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import CommonLayout from "@layouts/commonLayout";
import AuthLayout from "@layouts/authLayout";
import FullScreenLoader from "@components/fullScreenLoader";
const Wizard = React.lazy(() => import("@views/auth/wizard"));
const AddRefuel = React.lazy(() => import("@views/auth/addRefuel"));
const ListRefuels = React.lazy(() => import("@views/auth/listRefuels"));
const Settings = React.lazy(() => import("@views/auth/settings"));
const ChartRefuels = React.lazy(() => import( "@views/auth/chartRefuels"));
const Login = React.lazy(() => import( "@views/login"));
const NotFound = React.lazy(() => import( "@views/notFound"));
const ProtectedRoute = React.lazy(() => import( "@components/protectedRoute"));

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
      throw redirect(routes.ADD_REFUEL);
    }
  },
  {
    path: routes.LOGIN,
    element:
      <CommonLayout>
        <React.Suspense fallback={<FullScreenLoader show={true}/>}>
          <Login />
        </React.Suspense>
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
            <React.Suspense fallback={<FullScreenLoader show={true}/>}>
              <Wizard />
            </React.Suspense>
          </AuthLayout>,
      },
      {
        path: routes.ADD_REFUEL,
        element:
          <AuthLayout titleKey="add-refuel.title">
            <React.Suspense fallback={<FullScreenLoader show={true}/>}>
              <AddRefuel />
            </React.Suspense>
          </AuthLayout>,
      },
      {
        path: routes.LIST_REFUELS,
        element:
          <AuthLayout titleKey="list-refuels.title">
            <React.Suspense fallback={<FullScreenLoader show={true}/>}>
              <ListRefuels />
            </React.Suspense>
          </AuthLayout>,
      },
      {
        path: routes.CHART_REFUELS,
        element:
          <AuthLayout titleKey="chart-refuels.title">
            <React.Suspense fallback={<FullScreenLoader show={true}/>}>
              <ChartRefuels />
            </React.Suspense>
          </AuthLayout>,
      },
      {
        path: routes.SETTINGS,
        element:
          <AuthLayout titleKey="settings.title">
            <React.Suspense fallback={<FullScreenLoader show={true}/>}>
              <Settings />
            </React.Suspense>
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