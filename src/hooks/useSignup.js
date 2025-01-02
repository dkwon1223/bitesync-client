import { useState } from "react"
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const { dispatch } = useAuthContext();
    const [signupLoading, setSignupLoading] = useState(null);
    const [signupError, setSignupError] = useState(null);

    const signupUser = async (userCredentials) => {
        try {
            const response = await fetch("http://localhost:8080/api/user/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userCredentials)
            });
            const data = await response.json();
            if(!response.ok) {
                throw Error(data.message[0]);
            } 
            localStorage.setItem('token', "wow")
            dispatch({ type: 'LOGIN', payload: "wow" })
            setSignupLoading(false);
        } catch (err) {
            setSignupError(await err.message);
        }
    }
    return { signupUser, signupLoading, signupError }
}