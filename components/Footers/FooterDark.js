import React from "react";

export default function FooterSmall(props) {
  return (
    <>
      <footer className={
        (props.absolute
          ? "absolute bottom-0 w-full bg-blueGray-200"
          : "relative w-full") + " pb-6"
      }>
        <div className="container mx-auto px-4">
        <hr className="mb-6 border-b-1 border-blueGray-600" />

          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-blueGray-700 font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
              </div>
            </div>
            <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                <li>
                  <a
                    href="https://github.com/vuamy/ResArtifact"
                    className="text-blueGray-700 hover:text-blueGray-500 text-sm font-semibold block py-1 px-3"
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
