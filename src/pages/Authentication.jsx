import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useLogin } from "../hooks/useLogin";
import AppIconPurple from "../assets/icon-purple.svg";

const Authentication = () => {
  const { signupUser } = useSignup();
  const { loginUser } = useLogin();
  const [signingUp, setSigningUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.id === "loginForm" ? loginUser(formData) : signupUser(formData);
  };

  return (
    <section className="flex min-h-full w-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        {signingUp ?
            <div className="w-full max-w-sm space-y-10">
                <div>
                <img
                    alt="BiteSync logo"
                    src={AppIconPurple}
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Sign Up
                </h2>
                </div>
                <form className="space-y-6" id="signupForm" onSubmit={handleSubmit}>
                <div>
                    <div className="col-span-2">
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        required
                        placeholder="Email address"
                        autoComplete="email"
                        aria-label="Email address"
                        className="block w-full rounded-t-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        onChange={handleChange}
                    />
                    </div>
                    <div className="-mt-px">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="Password"
                        autoComplete="current-password"
                        aria-label="Password"
                        className="block w-full rounded-b-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        onChange={handleChange}
                    />
                    </div>
                </div>
                <div>
                    <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Sign up
                    </button>
                </div>
                </form>

                <p className="text-center text-sm/6 text-gray-500">
                Already a member?{" "}
                <a
                    onClick={() => setSigningUp(false)}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                    Log in
                </a>
                </p>
            </div>
            :
            <div className="w-full max-w-sm space-y-10">
                <div>
                <img
                    alt="BiteSync logo"
                    src={AppIconPurple}
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Log In
                </h2>
                </div>
                <form className="space-y-6" id="loginForm" onSubmit={handleSubmit}>
                <div>
                    <div className="col-span-2">
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        required
                        placeholder="Email address"
                        autoComplete="email"
                        aria-label="Email address"
                        className="block w-full rounded-t-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        onChange={handleChange}
                    />
                    </div>
                    <div className="-mt-px">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="Password"
                        autoComplete="current-password"
                        aria-label="Password"
                        className="block w-full rounded-b-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        onChange={handleChange}
                    />
                    </div>
                </div>
                <div>
                    <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Log In
                    </button>
                </div>
                </form>

                <p className="text-center text-sm/6 text-gray-500">
                Not a member?{" "}
                <a
                    onClick={() => setSigningUp(true)}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                    Sign up
                </a>
                </p>
            </div>
        }
    </section>
  );
};

export default Authentication;
