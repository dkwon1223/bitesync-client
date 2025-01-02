import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [signupLoading, setSignupLoading] = useState(null);

  const signupUser = async (userCredentials) => {
    try {
      const response = await fetch("http://localhost:8080/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });
      if (!response.ok) {
        const data = await response.json();
        const message = await data.message[0];
        throw new Error(message);
      }
      toast.success("Signed up successfully ✅", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });
      setTimeout(() => {
        location.reload();
      }, 3000);
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
      });
    }
  };
  return { signupUser, signupLoading };
};
