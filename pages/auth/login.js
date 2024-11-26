import React, { createContext, useContext, useState, useEffect } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import DarkNavbar from "components/Navbars/AuthNavbar.js";
import { useRouter } from 'next/router';  // Import useRouter
import { useAuth, login, logout } from "../api/handleAuthenticated"; // Import authenticated

import Loader from 'components/ResilientDB/Loader.js';

import Auth from "layouts/Auth.js";

export default function Login() {
    const router = useRouter();

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
        
        {/* Centered buttons in their respective halves */}
        {isAuthenticated && (
          <div className="flex justify-between w-full px-8 mt-6">
            <div className="w-1/2 flex justify-center">
              <Link href="/auth/new-artifact">
                <button className="option-button bg-blueGray-700 hover:bg-blueGray-400 text-white font-bold py-28 px-36 text-3xl rounded shadow-lg transition duration-200 ease-in-out transform hover:scale-105">
                  Add New Artifact
                </button>
              </Link>
            </div>
            <div className="w-1/2 flex justify-center">
              <Link href="/artifact/home">
                <button className="option-button bg-blueGray-700  h- hover:bg-blueGray-400 text-white font-bold py- px-96 text-3xl rounded shadow-lg transition duration-200 ease-in-out transform hover:scale-105">
                  View All Artifacts
                </button>
              </Link>
            </div>
          </div>
        )}

        <div className="container mx-auto px-3 h-full">
          <div className="flex content-center items-center justify-center">
            <div className=" lg:w-1/12 xl:w-5/12"> {/* Reduced width of the white box */}
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 transform translate-y-[-20px]"> {/* Applied translate-y */}
                <div className="flex-auto px-4 lg:px-4 py-2">
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
                      {/* Centered button for Search My Artifacts */}
                      <div className="flex justify-center mt-6">
                        <Link href="/auth/retrieve">
                          <button className="option-button bg-blueGray-700 hover:bg-blueGray-400 text-white font-bold py-1 px-96 text-3xl rounded shadow-lg transition duration-200 ease-in-out transform hover:scale-105">
                            Search My Artifacts
                          </button>
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
                          className="border-4 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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
