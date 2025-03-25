import { useAuthContext } from "./useAuthContext";
import { toast, Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../auth/AuthContext";
import { jwtDecode } from "jwt-decode";

export const useLogin = () => {
  const { dispatch } = useAuthContext(AuthContext);
  const navigate = useNavigate();

  const loginUser = async (userCredentials) => {
    try {
      const response = await fetch(
        "https://bitesync-v2.onrender.com:8080/user/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userCredentials),
        }
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }
      const tokenExtraction = response.headers.get("Authorization").replace("Bearer ", "");
      const decodedToken = jwtDecode(tokenExtraction);
      toast.success("Logged in successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });
      setTimeout(() => {
        localStorage.setItem("authToken", tokenExtraction);
        dispatch({
          type: "LOGIN",
          payload: tokenExtraction,
          userId: decodedToken.userId, 
        });
        navigate("/");
      }, 2000);
    } catch (err) {
      toast.error(await err.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });
    }
  };
  return { loginUser };
};
