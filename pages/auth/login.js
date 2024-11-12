import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import LoginNavbar from "components/Navbars/LoginNavbar.js";
import { useRouter } from 'next/router';  // Import useRouter

// added resilientdb stuff
import Loader from 'components/ResilientDB/Loader.js';

// layout for page
import Auth from "layouts/Auth.js";

export default function Login() {
    const router = useRouter();  // Use the router hook

    const Login = dynamic(() => import('components/ResilientDB/Login.js'), { ssr: false });

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [isLoadingAfterLogin, setIsLoadingAfterLogin] = useState(false);

    useEffect(() => {
      const storedToken = sessionStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
      }
    }, []);

    const handleLogin = (authToken) => {
      setIsLoadingAfterLogin(true);
      setToken(authToken);
      sessionStorage.setItem('token', authToken);

      setTimeout(() => {
        setIsAuthenticated(true);
        setIsLoadingAfterLogin(false);
        // No need for redirection, just display the dashboard after login
      }, 2000);
    };

    const handleLogout = () => {
      setIsAuthenticated(false);
      setToken(null);
      sessionStorage.removeItem('token');
    };

    return (
      <>
      <LoginNavbar fixed />
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
                     
                      <div className="options flex space-x-4 mt-4">
                        <Link href="/TransactionForm">
                          <button className="option-button option-button bg-purple-500 hover:bg-blue-600 text-blue font-bold py-2 px-4 rounded shadow-lg transition duration-200 ease-in-out transform hover:scale-105 ">Add Artifacts</button>
                        </Link>
                        <Link href="/NewPage">
                          <button className="option-button option-button bg-purple-500 hover:bg-blue-600 text-blue font-bold py-2 px-4 rounded shadow-lg transition duration-200 ease-in-out transform hover:scale-105">Search Artifacts</button>
                        </Link>
                      </div>
                      <button className="option-button" onClick={handleLogout}>
                        Log Out
                      </button>
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
              {!isAuthenticated && (
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
              )}
            </div>
          </div>
        </div>
      </>
    );
}

Login.layout = Auth;

