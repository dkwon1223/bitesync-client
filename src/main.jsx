import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./auth/AuthContext";
import Dashboard from "./pages/Dashboard.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import Inventory from "./pages/Inventory.jsx";
import Menu from "./pages/Menu.jsx";
import Orders from "./pages/Orders.jsx";
import Analytics from "./pages/Analytics.jsx";
import Authentication from "./pages/Authentication.jsx";
import Hero from "./pages/Hero.jsx";
import Profile from "./pages/Profile.jsx";
import { ToastContainer } from "react-toastify";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Hero />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/inventory" element={<Inventory />}/>
      <Route path="/menu" element={<Menu />}/>
      <Route path="/orders" element={<Orders />}/>
      <Route path="/analytics" element={<Analytics />}/>
      <Route path="/authenticate" element={<Authentication />}/>
      <Route path="/profile" element={<Profile />}/>
    </Route>
  )
)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthContextProvider>
  </StrictMode>
);
