import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="h-full flex flex-col justify-evenly">
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/inventory">Inventory</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/orders">Orders</NavLink>
      <NavLink to="/analytics">Analytics</NavLink>
      <NavLink to="/authenticate">Sign Up / Log In</NavLink>
    </nav>
  );
};

export default Navbar;
