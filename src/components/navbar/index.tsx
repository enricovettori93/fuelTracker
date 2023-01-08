import React from "react";
import {NavLink, NavLinkProps} from "react-router-dom";
import {routes} from "@router";

interface MenuLinkProps extends NavLinkProps {
  children: React.ReactNode
}

const MenuLink = ({ children, ...restProps }: MenuLinkProps) => {
  return (
    <NavLink {...restProps} className={({ isActive }) => {
      const commonClasses = "transition-all text-center p-4 rounded-full";
      if (isActive) {
        return `${commonClasses} bg-orange-100 text-orange-600`;
      }
      return commonClasses;
    }}>
      {children}
    </NavLink>
  )
}

const Navbar = () => {
  return (
    <nav className="navbar fixed w-screen h-28 bottom-0 left-0 right-0 bg-white flex p-6 items-center justify-between rounded-t-3xl">
      <MenuLink to={routes.ADD_REFUEL}>
        <i className="ci-add_to_queue"/>
      </MenuLink>
      <MenuLink to={routes.LIST_REFUELS}>
        <i className="ci-list_checklist"/>
      </MenuLink>
      <MenuLink to={routes.CHART_REFUELS}>
        <i className="ci-line_chart_up"/>
      </MenuLink>
      <MenuLink to={routes.SETTINGS}>
        <i className="ci-settings_filled"/>
      </MenuLink>
    </nav>
  )
}

export default Navbar;