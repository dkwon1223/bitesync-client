import { NavLink } from "react-router-dom";
import { authNavLinks, noAuthNavLinks } from "../data/navLinks";
import { useAuthContext } from "../hooks/useAuthContext";
import { AuthContext } from "../auth/AuthContext";
import { useLogout } from "../hooks/useLogout";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { token } = useAuthContext(AuthContext);
  const { logoutUser } = useLogout();
  
  return (
    <nav className="h-full flex flex-col justify-evenly">
      <>
      {token
        ? authNavLinks.map((link) => {
            return (
              <NavLink to={link.route} key={link.label}>
                {link.label}
              </NavLink>
            );
          })
        : noAuthNavLinks.map((link) => {
            return (
              <NavLink to={link.route} key={link.label}>
                {link.label}
              </NavLink>
            );
          })}
      </>
      {token && <NavLink onClick={logoutUser}>Logout</NavLink>}
    </nav>
  );
};

export default Navbar;
