import React from "react";

// components

export default function CardTransaction() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-2 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                00.00.0000
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-auto max-w-md">
          <div className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          </div>
        </div>
      </div>
    </>
  );
}
