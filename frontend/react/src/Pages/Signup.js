import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSignup } from "../hooks/useSignup"; 

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
    if (!error) {
      history.push('/'); 
    }
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Form and inputs updated */}
      <form className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8" onSubmit={handleSubmit}>
        {/* Other parts remain the same */}
        <input
          type="email"
          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          disabled={isLoading}
        >
          Sign up
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default SignUp;
