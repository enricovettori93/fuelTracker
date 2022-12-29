import React from 'react'
import {
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Wizard from "@views/auth/wizard";
import AddConsumption from "@views/auth/addConsumption";
import ListConsumption from "@views/auth/listConsumption";
import Settings from "@views/auth/settings";
import CommonLayout from "@layouts/commonLayout";
import AuthLayout from "@layouts/authLayout";
import ChartConsumption from "@views/auth/chartConsumption";
import Login from "@views/login";

export const routes = {
  ROOT: "/",
  LOGIN: "/login",
  WIZARD: "/app/wizard",
  ADD_CONSUMPTION: "/app/add",
  LIST_CONSUMPTIONS: "/app/list",
  CHART_CONSUMPTIONS: "/app/chart",
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
    element: <Login />,
  },
  {
    path: routes.WIZARD,
    element:
      <CommonLayout titleKey="wizard.title">
        <Wizard />
      </CommonLayout>,
  },
  {
    path: routes.ADD_CONSUMPTION,
    element:
      <AuthLayout titleKey="add-consumption.title">
        <AddConsumption />
      </AuthLayout>,
  },
  {
    path: routes.LIST_CONSUMPTIONS,
    element:
      <AuthLayout titleKey="list-consumption.title">
        <ListConsumption />
      </AuthLayout>,
  },
  {
    path: routes.CHART_CONSUMPTIONS,
    element:
      <AuthLayout titleKey="chart-consumption.title">
        <ChartConsumption />
      </AuthLayout>,
  },
  {
    path: routes.SETTINGS,
    element:
      <AuthLayout titleKey="settings.title">
        <Settings />
      </AuthLayout>,
  }
]);

export default router;