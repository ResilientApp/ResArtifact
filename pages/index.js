
  import React, { useState, useEffect } from "react";
  import Link from "next/link";
  import dynamic from 'next/dynamic';


  import TransactionForm from 'components/ResilientDB/TransactionForm.js';
  import Loader from 'components/ResilientDB/Loader.js';
  import IndexNavbar from "components/Navbars/IndexNavbar.js";
  import Footer from "components/Footers/Footer.js";

  export default function Index() {

    return (<>
      <IndexNavbar/>
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px mt-6">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0 px-6">
              <h2 className="font-semibold text-4xl text-blueGray-600">
                ResArtifact - A secure blockchain registry for historical artifacts.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                ResArtifact is an Open Source project by graduate students at the University of California, Davis that
                applies distributed database systems. It utilizes{" "}
                <a
                  href="https://resilientdb.apache.org/"
                  className="text-blueGray-600 no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ResilientDB
                </a>
                , developed by ExpoLab, to create secure transactions that stores the history of artifacts
              and allows institutions to buy or sell artifacts under the guarantee of its validity.
              </p>
              <div className="mt-12 flex">
              <a
                  href="/auth/login"
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-400 active:bg-blueGray-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  Begin Here
                </a>
                {/* <div>
                  {isLoadingAfterLogin && <Loader />}
                  {!isLoadingAfterLogin && isAuthenticated ? (
                    <TransactionForm onLogout={handleLogout} token={token} />
                  ) : (
                    <Login onLogin={handleLogin} />
                  )}
                  </div> */}
                <a
                  href="https://github.com/vuamy/ResArtifact"
                  className="github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
                  target="_blank"
                >
                  Github Repository
                </a>
              </div>
            </div>
          </div>
        </div>
        <img
            className="absolute top-94-px b-auto right-0 pt-16 -mt-48 sm:mt-0 w-5/12 h-auto opacity-50 mr-4"
            src="/img/headergraphic.png"
            alt="..."
          />
      </section>
      <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-100 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                <img
                  alt="..."
                  src="img/wallartifact.jpg"
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-blueGray-700 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-white">
                    Safely storing artifact history
                  </h4>
                  <p className="text-md font-light mt-2 text-white">
                    Artifact precendence history is important in maintaining its authenticity and validity. We safely 
                    store each artifact and allow for transactions using blockchain technology.
                  </p>
                </blockquote>
              </div>
            </div>
            <div className="w-full md:w-6/12 px-4">
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-lock"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Authentication
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        Utilize ResVault to ensure all users are validated with public and private keys before making transactions.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-database"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Distributed Database
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        Data across multiple physical locations so system is active even with a faulty crash at a single node.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-heart"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">Simplicity</h6>
                      <p className="mb-4 text-blueGray-500">
                        Log in and fill out a form to create a new transaction with no unnecessary steps.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-lightbulb"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Innovative
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        Bring new, secure technology of blockchain transactions to a more traditional
                        field of historical artifacts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 pb-32 pt-48">
          <div className="items-center flex flex-wrap">
            <div className="w-full md:w-5/12 ml-auto px-12 md:px-4">
              <div className="md:pr-12">
                <h3 className="text-3xl font-semibold">
                  ResilientDB
                </h3>
                <p className="mt-4 mb-6 text-lg leading-relaxed text-blueGray-500">
                  This blockchain fabric recently implemented by ExpoLab at the University of California, Davis
                  ensures safety and consistency while maintaining high performance throughput using multiple threads.
                </p>
                <a
                  href="https://resilientdb.apache.org/"
                  className="mt-6 text-white font-bold px-4 py-2 rounded outline-none focus:outline-none bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
                  target="_blank"
                >
                  Visit Website
                </a>
                <ul className="list-none mt-6">
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                          <i className="fas fa-fingerprint"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          GraphQL and SDK support
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                          <i className="fab fa-html5"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          Wallet integration with ResVault
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                          <i className="far fa-paper-plane"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          RPC architecture
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                          <i className="far fa-paper-plane"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          Dockerized CLI  
                        </h4>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full md:w-6/12 mr-auto px-4 pt-24 md:pt-0 flex flex-col items-center mt-6">
              <img
                alt="..."
                className="max-w-full rounded-lg shadow-xl"
                style={{
                  transform:
                    "scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)",
                }}
                src="/img/resilientdbpage.png"
              />
            </div>
          </div>
        </div>

        <div className="justify-center text-center flex flex-wrap mt-24">
          <div className="w-full md:w-6/12 px-12 md:px-4">
            <h2 className="font-semibold text-4xl">Team Members</h2>
            <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-500">
              ResArtifact is created by a group of computer science graduate students at the University of California, Davis taking ECS 265: 
              Distributed Database Systems under Professor Mohammad Sadoghi in Fall 2024.
            </p>
          </div>
        </div>
      </section>
      <section className="block relative z-1 bg-blueGray-600">
        <div className="container mx-auto">
          <div className="justify-center flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4  -mt-32">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-4/12 px-4">
                  <Link href="https://github.com/vuamy" legacyBehavior>
                    <div className="hover:-mt-4 relative flex flex-col items-center min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        src="img/vuamy-github.png"
                        className="w-1/2 mt-6 shadow bg-blueGray-200"
                        alt="Stock image.">
                      </img>
                      <p className="text-2xl mt-6 font-semibold">
                        Amy Vu
                      </p>
                      <p className="text-lg text-center p-5 mb-4">
                        Lead frontend developer, UI designer
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <Link href="https://github.com/almyee" legacyBehavior>
                    <div className="hover:-mt-4 relative flex flex-col items-center min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        src="img/almyee-github.png"
                        className="w-1/2 mt-6 shadow bg-blueGray-200"
                        alt="Stock image.">
                      </img>
                      <p className="text-2xl mt-6 font-semibold">
                        Alyssa Yee
                      </p>
                      <p className="text-lg text-center p-5 mb-4">
                        Team leader, Project planning and logistics, Diagram designer
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <Link href="https://github.com/GURJASH" legacyBehavior>
                    <div className="hover:-mt-4 relative flex flex-col items-center min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        src="img/GURJASH-github.png"
                        className="w-1/2 mt-6 shadow bg-blueGray-200"
                        alt="Stock image.">
                      </img>
                      <p className="text-2xl mt-6 font-semibold">
                        Guransh Singh Anand
                      </p>
                      <p className="text-lg text-center p-5 mb-4">
                        Lead backend developer, Supporting frontend developer
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <Link href="https://github.com/alexgao2" legacyBehavior>
                    <div className="hover:-mt-4 relative flex flex-col items-center min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        src="img/alexgao2-github.png"
                        className="w-1/2 mt-6 shadow bg-blueGray-200"
                        alt="Stock image.">
                      </img>
                      <p className="text-2xl mt-6 font-semibold">
                        Alex Gao
                      </p>
                      <p className="text-lg text-center p-5 mb-4">
                        Supporting frontend developer, Diagram designer
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <Link href="https://github.com/Zackory281" legacyBehavior>
                    <div className="hover:-mt-4 relative flex flex-col items-center min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        src="img/Zackory281-github.png"
                        className="w-1/2 mt-6 shadow bg-blueGray-200"
                        alt="Stock image.">
                      </img>
                      <p className="text-2xl mt-6 font-semibold">
                        Zijin Cui
                      </p>
                      <p className="text-lg text-center p-5 mb-4">
                        Data collection
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-blueGray-600 overflow-hidden">
        <div className="container mx-auto pb-64">
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-5/12 px-12 md:px-4 ml-auto mr-auto md:mt-64">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-code-branch text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal text-white">
                Open Source
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-400">
                ResArtifact is an open source project to showcase ResilientDB, available for all developers to look through the code base and suggest changes.
              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-400">
                Get it free on Github and please help us spread the news with a
                Star!
              </p>
              <a
                href="https://github.com/vuamy/ResArtifact"
                target="_blank"
                className="github-star mt-4 inline-block text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
              >
                GitHub Repository
              </a>
            </div>

            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto mt-32 relative">
              <i className="fab fa-github text-blueGray-700 absolute text-55 -top-150-px -right-100 left-auto opacity-80"></i>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-16 bg-blueGray-200 relative pt-32">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center bg-white shadow-xl rounded-lg -mt-64 py-16 px-12 relative z-10">
            <div className="w-full text-center lg:w-8/12">
              <h3 className="font-semibold text-3xl">
                Have any feedback?
              </h3>
              <p className="text-blueGray-500 text-lg leading-relaxed mt-4 mb-4">
                We'd love to hear your feedback on this project and any suggestions that can be added in the future!
                Please interact with our GitHub page or directly to our members to contact us.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>);
  }
