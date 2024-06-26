import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
  // useState hooks for name, email, and password
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, dispatch } = useAuthContext();
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.data.name,
          token: response.data.token,
          email: response.data.email,
        })
      );
      alert("User registerd Sucsessfully");
      dispatch({ type: "LOGIN", payload: response.data });
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  return (
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-lg">
        <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Get Started!
        </h1>

        <p class="mx-auto mt-4 max-w-md text-center text-gray-500">
          RemEz helps you remember those boring long Questions and Answers.
        </p>

        <form
          onSubmit={handleSubmit}
          action="#"
          class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p class="text-center text-lg font-medium">
            Enter your details to Sign Up
          </p>

          <div>
            <label for="name" class="sr-only">
              Name
            </label>

            <div class="relative">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter name"
              />
            </div>
          </div>

          <div>
            <label for="email" class="sr-only">
              Email
            </label>

            <div class="relative">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
              />

              <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label for="password" class="sr-only">
              Password
            </label>

            <div class="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
              />

              <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Sign up
          </button>

          <p class="text-center text-sm text-gray-500">
            Have an account?{" "}
            <Link to="/signin" className="underline decoration-gray-700">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
