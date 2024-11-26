import React, { createContext, useContext, useState, useEffect } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import DarkNavbar from "components/Navbars/AuthNavbar.js";
import { useRouter } from 'next/router';  // Import useRouter
import { useAuth, login, logout } from "../api/handleAuthenticated"; // Import authenticated

// added resilientdb stuff
import Loader from 'components/ResilientDB/Loader.js';
// layout for page
import Auth from "layouts/Auth.js";

export default function Login() {
    const router = useRouter();  // Use the router hook

    const Login = dynamic(() => import('components/ResilientDB/Login.js'), { ssr: false });

    const { isAuthenticated, login, logout } = useAuth();
    const [token, setToken] = useState(null);
    const [isLoadingAfterLogin, setIsLoadingAfterLogin] = useState(false);

    useEffect(() => {
      const storedToken = sessionStorage.getItem("token");
      if (storedToken) {
        login();
      }
    }, [login]);

    const handleLogin = (authToken) => {
      setIsLoadingAfterLogin(true);
      setToken(authToken);
      sessionStorage.setItem('token', authToken);
      login();
      setIsLoadingAfterLogin(false);
  };

  const handleLogout = () => {
      logout();
      setToken(null);
      sessionStorage.removeItem('token');
  };

    return (
      <>
      <DarkNavbar />
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="text-blueGray-700 text-center mt-10 mb-3 font-bold text-2xl">
                    {isAuthenticated ? (
                      <p>Welcome to your Dashboard</p>  
                    ) : (
                      <p>Sign in with ResVault</p>  
                    )}
                  </div>

                  {/* Conditional rendering */}
                  {isAuthenticated ? (
                    <div>
                      {/* Display your dashboard components */}
                     
                      <div className="options flex flex-col items-center justify-center mt-10">
                      <Link href="/auth/new-artifact">
                          <button className="option-button bg-blueGray-700 mb-4 hover:bg-blueGray-400 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-200 ease-in-out transform hover:scale-105 ">
                            Add New Artifact</button>
                        </Link>
                        <Link href="/auth/transaction">
                          <button className="option-button bg-blueGray-700 mb-4 hover:bg-blueGray-400 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-200 ease-in-out transform hover:scale-105 ">
                            Create Transaction</button>
                        </Link>
                        <Link href="/auth/retrieve">
                          <button className="option-button bg-blueGray-700 mb-4 hover:bg-blueGray-400 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-200 ease-in-out transform hover:scale-105">
                            Search Artifacts</button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    // Login form
                    <form>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Email"
                        />
                      </div>

                      <div className="relative w-full mb-6">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Password"
                        />
                      </div>

                      <div className="flex justify-center">
                        {isLoadingAfterLogin && <Loader />}
                        {!isLoadingAfterLogin && <Login onLogin={handleLogin} />}
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Links for forgot password and sign up */}
              {!isAuthenticated ? (
                <div className="flex flex-wrap mt-6 relative">
                  <div className="w-1/2">
                    <a
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      className="text-blueGray-200"
                    >
                      <small>Forgot password?</small>
                    </a>
                  </div>
                  <div className="w-1/2 text-right">
                    <Link href="/auth/register" className="text-blueGray-200">
                      <small>Create new account</small>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap mt-6 relative">
                  <div className="w-1/2">
                    <a
                      href="#pablo"
                      onClick={handleLogout}
                      className="text-blueGray-200 option-button"
                    >
                      <small>Log Out</small>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
}

Login.layout = Auth;

