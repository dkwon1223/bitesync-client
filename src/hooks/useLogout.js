import { toast, Slide } from "react-toastify";
import { AuthContext } from "../auth/AuthContext";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { token, dispatch } = useAuthContext(AuthContext);
  const navigate = useNavigate();
  const logoutUser = () => {
    toast.success("Logging out 👋", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
    });
    setTimeout(() => {
        navigate("/");
    }, 2000);
    dispatch({ type: "LOGOUT" });
    localStorage.setItem("token", token);
  };
  return { logoutUser };
};
