import React from "react";

export default function Footer(props) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? "absolute w-full bottom-0 bg-gray-50"
            : "relative") + " pb-6"
        }
      >
        <div className="container mx-auto px-4 bg-gray-50">
          <hr className="mb-6 border-b-1 border-gray-400" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-blueGray-800 font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
              </div>
            </div>
            <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                <li>
                  <a
                    href="https://github.com/vuamy/ResArtifact"
                    className="text-blueGray-800 hover:text-blueGray-500 text-sm font-semibold block py-1 px-3"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
