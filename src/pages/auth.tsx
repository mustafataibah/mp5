import React, { useState } from "react";
import { ChevronLeft } from "react-feather";
import Link from "next/link";

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(isSignUp ? "Signing up..." : "Signing in...");
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 h-fill">
        <div className="flex text-black items-center mb-4">
          <Link href="/">
            <span className="inline-flex items-center mr-2">
              <ChevronLeft />
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-center flex-grow">{isSignUp ? "Sign Up" : "Sign In"}</h1>
        </div>
        <div className="flex justify-center border-b">
          <button
            onClick={() => setIsSignUp(false)}
            className={`py-2 px-4 ${!isSignUp ? "text-Blueberry-Blue" : "text-black"}`}>
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`py-2 px-4 ${isSignUp ? "text-Blueberry-Blue" : "text-black"}`}>
            Sign Up
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {isSignUp && (
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-Blueberry-Blue hover:bg-Blackberry-Blue text-white font-bold py-2 px-4 rounded w-full">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
