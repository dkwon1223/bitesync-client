import { NavLink, Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <section className="w-screen h-screen flex bg-green-200">
      <header className="bg-red-100 w-[15%] h-full">
        <nav className="flex flex-col">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/inventory">Inventory</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/analytics">Analytics</NavLink>
        </nav>
      </header>

      <main className="bg-blue-100 w-[85%] h-full">
        <Outlet/>
      </main>
    </section>
  )
}

export default RootLayout