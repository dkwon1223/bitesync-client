import dashboardIcon from "../assets/dashboard-icon.svg";
import inventoryIcon from "../assets/inventory-icon.svg";
import menuIcon from "../assets/menu-icon.svg";
import orderIcon from "../assets/order-icon.svg";
import analyticsIcon from "../assets/analytics-icon.svg";
import profileIcon from "../assets/profile-icon.svg";
import homeIcon from "../assets/home.svg";


export const authNavLinks = [
    {
        label: "Dashboard",
        route: "/dashboard",
        icon: dashboardIcon
      },
      {
        label: "Inventory",
        route: "/inventory",
        icon: inventoryIcon
      },
      {
        label: "Menu",
        route: "/menu",
        icon: menuIcon
      },
      {
        label: "Orders",
        route: "/orders",
        icon: orderIcon
      },
      {
        label: "Analytics",
        route: "/analytics",
        icon: analyticsIcon
      },
      {
        label: "Profile",
        route: "/profile",
        icon: profileIcon
      },
]

export const noAuthNavLinks = [
    {
        label: "Explore",
        route: "/",
        icon: homeIcon
    },
    {
        label: "Log In",
        route: "/authenticate",
        icon: profileIcon
    }
]