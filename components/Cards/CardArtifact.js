import React from "react";

export default function CardArtifact({ params }) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 h-60 w-40 break-words rounded-lg hover:bg-blueGray-200 ease-linear transition-all duration-150 cursor-pointer">
        <div className="px-4">
          <div className="flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
              <div >
                <img
                  alt="..."
                  src={params.image}
                  className="shadow-xl align-middle border-blueGray-500 border-2 rounded mt-4 w-140-px h-140-px block object-cover"
                />
              </div>
            </div>
          </div>
          <div className="text-left mt-4">
            <h3 className="text-md font-bold uppercase leading-normal text-blueGray-700 flex-nowrap break-words">
              {params.name}
            </h3>
          </div>
          <div className="text-left mb-4">
            <div className="flex flex-wrap">
                <p className="text-sm leading-relaxed text-blueGray-700">
                  {params.year}
                </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
