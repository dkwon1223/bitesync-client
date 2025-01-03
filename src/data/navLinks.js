import dashboardIcon from "../assets/dashboard-icon.svg";

export const authNavLinks = [
    {
        label: "Dashboard",
        route: "/dashboard",
        icon: dashboardIcon
      },
      {
        label: "Inventory",
        route: "/inventory",
        icon: dashboardIcon
      },
      {
        label: "Products",
        route: "/products",
        icon: dashboardIcon
      },
      {
        label: "Orders",
        route: "/orders",
        icon: dashboardIcon
      },
      {
        label: "Analytics",
        route: "/analytics",
        icon: dashboardIcon
      },
      {
        label: "Profile",
        route: "/profile",
        icon: dashboardIcon
      },
]

export const noAuthNavLinks = [
    {
        label: "Explore",
        route: "/",
        icon: dashboardIcon
    },
    {
        label: "Log In",
        route: "/authenticate",
        icon: dashboardIcon
    }
]