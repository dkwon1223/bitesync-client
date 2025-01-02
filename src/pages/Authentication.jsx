import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogin } from '../hooks/useLogin';
import { ToastContainer } from 'react-toastify';

const Authentication = () => {
    const { user } = useAuthContext();
    const { signupUser, signupLoading } = useSignup();
    const { loginUser, loginLoading } = useLogin();
    const [signingup, setSigningup] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        e.target.id === "loginForm" ? loginUser(formData) : signupUser(formData);
    };

  return (
    <section className='flex flex-col justify-center items-center w-full h-full'>
        {signingup ? 
        <form className='flex flex-col items-center h-1/2' id='signupForm' onSubmit={handleSubmit}>
            <ToastContainer />
            <h1 className='font-bold text-xl'>Sign Up</h1>
            <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="email" className='border'/>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="password" className='border'/>
            <button type='submit' className='border bg-blue-100' disabled={signupLoading}>Sign Up</button>
        </form>
        :
        <form className='flex flex-col items-center h-1/2' id='loginForm' onSubmit={handleSubmit}>
            <ToastContainer />
            <h1 className='font-bold text-xl'>Log In</h1>
            <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="email" className='border'/>
            <input type="password" name="password" value={formData.password} onChange={handleChange}  placeholder="password" className='border'/>
            <p>Don't have an account? <button type='button' className='border bg-blue-100' onClick={() => setSigningup(true)} disabled={loginLoading}>Sign Up</button></p>
            <button type='submit' className='border bg-blue-100'>Log In</button>
        </form>
        }
    </section>
  )
}

export default Authentication