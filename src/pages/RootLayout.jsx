import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";

const RootLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="w-screen h-screen flex">
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-indigo-950 p-2 rounded-md text-white focus:outline-none"
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>
      <header
        className={`${
          isMenuOpen ? "block w-[35%]" : "hidden"
        } lg:block w-[15%] lg:w-[15%] h-full px-4 py-4 bg-indigo-950`}
      >
        <Navbar />
      </header>
      <main
        className={`${
          isMenuOpen ? "w-full lg:w-[85%]" : "w-full lg:w-[85%]"
        } h-full bg-[#F6FAFE] transition-all duration-300`}
      >
        <Outlet />
      </main>
    </section>
  );
};

export default RootLayout;

