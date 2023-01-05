import React from "react";
import {NavLink, NavLinkProps} from "react-router-dom";
import {routes} from "@router";
import AddIcon from "@components/icons/add";
import SettingsIcon from "@components/icons/settings";
import ListIcon from "@components/icons/list";
import ChartIcon from "@components/icons/chart";

interface MenuLinkProps extends NavLinkProps {
  children: React.ReactNode
}

const MenuLink = ({ children, ...restProps }: MenuLinkProps) => {
  return (
    <NavLink {...restProps} className={({ isActive }) => {
      const commonClasses = "transition-all text-center p-4 rounded-full";
      if (isActive) {
        return `${commonClasses} bg-orange-100 text-orange-100`;
      }
      return commonClasses;
    }}>
      {children}
    </NavLink>
  )
}

const Navbar = () => {
  return (
    <div className="fixed w-screen h-28 bottom-0 left-0 right-0 bg-white flex p-6 items-center justify-between rounded-t-3xl">
      <MenuLink to={routes.ADD_REFUEL}>
        <AddIcon/>
      </MenuLink>
      <MenuLink to={routes.LIST_REFUELS}>
        <ListIcon/>
      </MenuLink>
      <MenuLink to={routes.CHART_REFUELS}>
        <ChartIcon/>
      </MenuLink>
      <MenuLink to={routes.SETTINGS}>
        <SettingsIcon/>
      </MenuLink>
    </div>
  )
}

export default Navbar;