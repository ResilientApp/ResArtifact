import React from "react";

export default function CardArtifact({ params }) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-blueGray-200 w-300-px shadow-xl rounded-lg mt-6 hover:bg-blueGray-300 ease-linear transition-all duration-150 cursor-pointer">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
              <div >
                <img
                  alt="..."
                  src={params.image}
                  className="shadow-xl align-middle border-blueGray-500 border-2 rounded mt-6 w-120-px h-120-px block object-cover"
                />
              </div>
            </div>
          </div>
          <div className="text-left mt-4">
            <h3 className="text-lg font-semibold leading-normal text-blueGray-700 flex-nowrap break-words">
              {params.name}
            </h3>
          </div>
          <div className="text-left mb-4">
            <div className="flex flex-wrap">
                <p className="text-sm leading-relaxed text-blueGray-700">
                  Year  : {params.year}
                </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
