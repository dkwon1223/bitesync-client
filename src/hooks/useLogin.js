import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { toast, Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../auth/AuthContext";

export const useLogin = () => {
  const { dispatch } = useAuthContext(AuthContext);
  const [loginLoading, setLoginLoading] = useState(null);
  const navigate = useNavigate();

  const loginUser = async (userCredentials) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/user/authenticate",
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
        localStorage.setItem("token", tokenExtraction);
        dispatch({ type: "LOGIN", payload: tokenExtraction });
        setLoginLoading(false);
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
  return { loginUser, loginLoading };
};
