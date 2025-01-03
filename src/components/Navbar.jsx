import { NavLink, useNavigate } from "react-router-dom";
import { authNavLinks, noAuthNavLinks } from "../data/navLinks";
import { useAuthContext } from "../hooks/useAuthContext";
import { AuthContext } from "../auth/AuthContext";
import { useLogout } from "../hooks/useLogout";
import AppIcon from "../assets/icon.svg";
import "react-toastify/dist/ReactToastify.css";
import logoutIcon from "../assets/logout-icon.svg";

const Navbar = () => {
  const { token } = useAuthContext(AuthContext);
  const { logoutUser } = useLogout();
  const navigate = useNavigate();

  return (
    <nav className="h-full w-full flex flex-col justify-start items-start space-y-6 pt-4 text-white font-sans">
      <div
        className="flex justify-center items-center h-12 w-[90%] cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={AppIcon} alt="BiteSync logo" className="w-1/4" />
        <h1 className="font-extrabold text-xl w-3/4 text-center">BiteSync</h1>
      </div>
      <>
        {token
          ? authNavLinks.map((link) => {
              return (
                <NavLink
                  to={link.route}
                  key={link.label}
                  className="flex items-center space-x-2 py-2 text-white hover:bg-[#432C54] rounded-md w-full"
                >
                  <img
                    src={link.icon} 
                    alt={`${link.label} icon`}
                    className="w-6 h-6 object-contain" 
                  />
                  <span className="text-sm">{link.label}</span>
                </NavLink>
              );
            })
          : noAuthNavLinks.map((link) => {
              return (
                <NavLink
                  to={link.route}
                  className="flex items-center space-x-2 py-2 text-white hover:bg-[#432C54] rounded-md w-full"
                  key={link.label}
                >
                  <img
                    src={link.icon} 
                    alt={`${link.label} icon`}
                    className="w-6 h-6 object-contain" 
                  />
                  <span className="text-sm">{link.label}</span>
                </NavLink>
              );
            })}
      </>
      {token && (
        <NavLink
          to="/"
          className="flex items-center space-x-2 py-2 text-white hover:bg-[#432C54] rounded-md w-full"
          key="logout"
          onClick={logoutUser}
        >
          <img
            src={logoutIcon} 
            alt={`logout icon`}
            className="w-6 h-6 object-contain" 
          />
          <span className="text-sm">Log Out</span>
        </NavLink>
      )}
    </nav>
  );
};

export default Navbar;
