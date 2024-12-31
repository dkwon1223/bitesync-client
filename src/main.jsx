import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./auth/AuthContext";
import Dashboard from "./pages/Dashboard.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import Inventory from "./pages/Inventory.jsx";
import Products from "./pages/Products.jsx";
import Orders from "./pages/Orders.jsx";
import Analytics from "./pages/Analytics.jsx";
import Authentication from "./pages/Authentication.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />}/>
      <Route path="/inventory" element={<Inventory />}/>
      <Route path="/products" element={<Products />}/>
      <Route path="/orders" element={<Orders />}/>
      <Route path="/analytics" element={<Analytics />}/>
      <Route path="/authenticate" element={<Authentication />}/>
    </Route>
  )
)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
);
