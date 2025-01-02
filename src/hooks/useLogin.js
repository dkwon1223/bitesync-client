import { useState } from "react"
import { useAuthContext } from "./useAuthContext";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useLogin = () => {
    const { dispatch } = useAuthContext();
    const [loginLoading, setLoginLoading] = useState(null);
    const [token, setToken] = useState(null);

    const loginUser = async (userCredentials) => {
        try {
            const response = await fetch("http://localhost:8080/api/user/authenticate", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userCredentials)
            });
            if(response.status === 401) {
                const data = await response.json();
                throw Error(data.error);
            } 
            const token = response.headers.get("Authorization").replace("Bearer ", "");
            setToken(token);
            localStorage.setItem('token', token)
            dispatch({ type: 'LOGIN', payload: token })
            setLoginLoading(false);
            toast.success("Logged in ✅", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                transition: Slide,
            });
        } catch (err) {
            toast.error(await err.message, {
                position: "top-center",
            });
        }
    }
    return { loginUser, loginLoading }
}