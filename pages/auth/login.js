import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import DarkNavbar from "components/Navbars/AuthNavbar.js";
import { useRouter } from 'next/router';  

import Loader from 'components/ResilientDB/Loader.js';
import Auth from "layouts/Auth.js";

export default function Login() {
    const router = useRouter();

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
      }, 2000);
    };

    const handleLogout = () => {
      setIsAuthenticated(false);
      setToken(null);
      sessionStorage.removeItem('token');
    };

    return (
      <>
        <DarkNavbar />
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="flex-auto px-4 lg:px-8 py-6">
                  <div className="text-blueGray-700 text-center mt-6 mb-3 font-bold text-2xl">
                    {isAuthenticated ? (
                      <p>Welcome to your Dashboard</p>  
                    ) : (
                      <p>Sign in with ResVault</p>  
                    )}
                  </div>

                  {/* Conditional rendering */}
                  {isAuthenticated ? (
                    <div>
                      {/* Dashboard options */}
                      <div className="options flex flex-row items-center justify-evenly mt-6">
                        <Link href="/auth/new-artifact">
                          <button className="option-button bg-blueGray-700 hover:bg-blueGray-400 text-white font-bold py-2 px-6 rounded shadow-lg transition duration-200 ease-in-out transform hover:scale-105">
                            Add New Artifact
                          </button>
                        </Link>
                        <Link href="/auth/retrieve">
                          <button className="option-button bg-blueGray-700 hover:bg-blueGray-400 text-white font-bold py-2 px-6 rounded shadow-lg transition duration-200 ease-in-out transform hover:scale-105">
                            Search Artifacts
                          </button>
                        </Link>
                      </div>

                      {/* Floating Table with "Hello" */}
                      <div className="flex justify-center mt-10">
                        <div className="w-10/12 lg:w-6/12 bg-white shadow-lg rounded-lg p-6">
                          <table className="table-auto w-full text-center">
                            <thead>
                              <tr>
                                <th className="text-5xl font-bold text-blueGray-700 py-4">
                                  Hello
                                </th>
                              </tr>
                            </thead>
                          </table>
                        </div>
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
            </div>
          </div>
        </div>
      </>
    );
}

Login.layout = Auth;

