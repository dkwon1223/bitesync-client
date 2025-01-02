import React, { useState } from 'react';
import { signupUser, loginUser } from '../api/userRequests';

const Authentication = () => {
    const [signup, setSignup] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
    };

  return (
    <section className='flex flex-col justify-center items-center w-full h-full'>
        {signup ? 
        <form className='flex flex-col items-center h-1/2'>
            <h1 className='font-bold text-xl'>Sign Up</h1>
            <input type="text" value="" placeholder="email" className='border'/>
            <input type="text" value="" placeholder="password" className='border'/>
            <button type='submit' className='border bg-blue-100'>Sign Up</button>
        </form>
        :
        <form className='flex flex-col items-center h-1/2'>
            <h1 className='font-bold text-xl'>Log In</h1>
            <input type="text" value="" placeholder="email" className='border'/>
            <input type="text" value="" placeholder="password" className='border'/>
            <p>Don't have an account? <button type='button' className='border bg-blue-100' onClick={() => setSignup(true)}>Sign Up</button></p>
            <button type='submit' className='border bg-blue-100'>Log In</button>
        </form>
        }
    </section>
  )
}

export default Authentication