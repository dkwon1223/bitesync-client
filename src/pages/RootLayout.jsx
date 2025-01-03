import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <section className="w-screen h-screen flex">
      <header className="w-[15%] h-full px-4 py-4 bg-[#171115]">
        <Navbar />
      </header>
      <main className="w-[85%] h-full px-4 py-4">
        <Outlet/>
      </main>
    </section>
  )
}

export default RootLayout