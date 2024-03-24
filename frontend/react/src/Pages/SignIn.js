import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import React, { useState, useContext } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate(); 
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  if (user) {
    navigate("/");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, {
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
      alert("User Logged in Sucsessfully");
      dispatch({ type: "LOGIN", payload: response.data });
    } catch (err) {
      console.error(
        "Login failed:",
        err.response ? err.response.data : err.message
      );
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-40 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Welcome Back!
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          RemEz is excited to get back at helping you remember those long Q and
          As.
        </p>

        <form
          onSubmit={handleSubmit}
          action="#"
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">
            Sign in to your account
          </p>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Sign in
          </button>

          <p className="text-center text-sm text-gray-500">
            No account?{" "}
            <Link to="/signup" className="underline decoration-gray-700">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
