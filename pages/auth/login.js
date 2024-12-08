import React, { createContext, useContext, useState, useEffect } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import DarkNavbar from "components/Navbars/AuthNavbar.js";
import { useRouter } from 'next/router';  
import { useAuth, login, logout } from "../api/handleAuthenticated"; 

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

        <div className="container mx-auto px-3 h-full" >
          <div className="flex content-center items-center justify-center" >
            <div className=" lg:w-1/12 xl:w-5/12" > 
              <div className={`relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 transform translate-y-[-20px] ${isAuthenticated ? 'mt-20' : 'mt-2'}`}>
                <div className="flex-auto px-4 lg:px-4 py-2" style={{ border: '4px solid #FF6700' }}>
                  <div className="text-blueGray-700 text-center mt-6 mb-3 px-4 font-bold text-2xl">
                    {isAuthenticated ? (
                      <p>Welcome to Your Dashboard</p>  
                    ) : (
                      <p>Sign in with ResVault</p>  
                    )}
                  </div>

                  {/* Conditional rendering */}
                  {isAuthenticated ? (
                    <div className="flex flex-col justify-center items-center w-full">
                      <div className="flex justify-center mt-4 relative text-center inline-block object-contain overflow-hidden h-10 w-full hover:button-swap-away transition ease-in-out">
                        <a
                          href={`/auth/new-artifact`}
                          className="start-on absolute bg-white shadow text-blueGray-600 font-bold py-2 px-6 rounded-lg"
                        >
                          Add New Artifact
                        </a>
                        <a
                          href={`/auth/new-artifact`}
                          className="start-off absolute start-offscreen bg-blueGray-700 shadow text-white font-bold py-2 px-6 rounded-lg"
                        >
                          Add New Artifact
                        </a>
                      </div>
                      <div className="flex flex-col justify-center items-center w-full mb-6">
                        <div className="flex justify-center mt-4 relative text-center inline-block object-contain overflow-hidden h-10 w-full hover:button-swap-away transition ease-in-out">
                          <a
                            href={`/auth/retrieve`}
                            className="start-on absolute bg-white shadow text-blueGray-600 font-bold py-2 px-6 rounded-lg "
                          >
                            View Personal Collection
                          </a>
                          <a
                            href={`/auth/retrieve`}
                            className="start-off absolute start-offscreen bg-blueGray-700 shadow text-white font-bold py-2 px-6 rounded-lg"
                          >
                            View Personal Collection
                          </a>
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
              <img
                        src="resartifact_diagram.png"
                        className="px-2 py-2"
                        alt="Displays use cases and flow of ResArtifact.">
                </img>
            </div>
            
          </div>
          
        
     
        </div>
        
      </>
    );
}

Login.layout = Auth;
