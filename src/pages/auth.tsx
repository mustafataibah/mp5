import React, { useState } from "react";
import { ChevronLeft } from "react-feather";
import Link from "next/link";
import { SIGN_UP_MUTATION, SIGN_IN_MUTATION } from "../lib/queries";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useUser } from "../lib/UserContext";

const Auth: React.FC = () => {
  const [signUp] = useMutation(SIGN_UP_MUTATION);
  const [signIn] = useMutation(SIGN_IN_MUTATION);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userContext = useUser();
  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword?.value;

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters and at least 1 letter and 1 number");
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    console.log("Attempting to sign in with:", email, password);

    try {
      if (isSignUp) {
        await signUp({ variables: { email, password } });

        const { data } = await signIn({ variables: { email, password } });
        if (data.signIn.user) {
          userContext.signIn(
            data.signIn.token,
            data.signIn.user.id,
            data.signIn.user.email,
            data.signIn.user.companyName,
            data.signIn.user.companyCategory,
            data.signIn.user.companyDescription
          );
          router.push("/");
        }
      } else {
        const { data } = await signIn({ variables: { email, password } });
        if (data.signIn.user) {
          userContext.signIn(
            data.signIn.token,
            data.signIn.user.id,
            data.signIn.user.email,
            data.signIn.user.companyName,
            data.signIn.user.companyCategory,
            data.signIn.user.companyDescription
          );
          router.push("/");
        }
      }
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("email already taken")) {
          setError("Email already taken");
        } else if (error.message.includes("incorrect username or password")) {
          setError("Incorrect username or password");
        } else {
          setError(error.message);
        }
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError(null);
  };

  return (
    <div className="flex justify-center items-center h-fill min-h-[94vh]">
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

          {error && <div className="mb-4 text-center text-red-600">{error}</div>}

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
