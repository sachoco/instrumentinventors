import React from "react";
import { CustomPlaceholder } from "react-placeholder-image";

export default function HeaderImage(props) {
  return (
    <>
      <div className="relative ">
        <CustomPlaceholder
          className="absolute w-full h-full object-cover object-center"
          width={1340}
          height={800}
        />
        <div
          className="lg:hidden relative z-10 w-full p-10 bottom-0 text-white border-white"
          style={{ paddingTop: "230px" }}
        >
          <h2 className="float-right text-4xl outline-text transform origin-bottom-right rotate-90 -translate-x-3 -translate-y-5">
            resident
          </h2>
        </div>

        <div
          className="hidden lg:block relative z-10 w-full p-24 bottom-0 text-white border-white"
          style={{ paddingTop: "530px" }}
        >
          <div className="flex justify-between items-end">
            <h2 className="text-5xl mb-3">Name artist</h2>
            <h2 className="text-8xl outline-text transform origin-bottom-right rotate-90 -translate-x-24 -translate-y-5">
              resident
            </h2>
          </div>
          <div className="border-b-2 border-white"></div>
          <div className="mt-6 text-black">
            <span className="border-2 bg-white py-2 px-4 mr-2">
              www.mihalisshammas.com
            </span>
            <span className="border-2 bg-white py-2 px-4 mr-2">resident</span>
            <span className="border-2 bg-white py-2 px-4 mr-2">
              24.02.2021 - 15.03.2021
            </span>
          </div>
        </div>
      </div>
      <div className="lg:hidden relative w-full bg-bg-light-gray border-t-2 border-b-2">
        <h2 className="text-lg text-white bg-bg-gray px-6 py-3">Name artist</h2>
        <div className=" text-black p-6 border-t-2 text-xs">
          <span className="border-2 bg-white py-2 px-4 mr-2">
            www.mihalisshammas.com
          </span>
          <span className="border-2 bg-white py-2 px-4 mr-2">resident</span>
          <span className="border-2 bg-white py-2 px-4 mr-2">
            24.02.2021 - 15.03.2021
          </span>
        </div>
      </div>
    </>
  );
}
