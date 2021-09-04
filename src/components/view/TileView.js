import React from "react";
import Item from "../Item";

export default function TileView(props) {
  return (
    <>
      <div className="flex flex-wrap justify-between -mr-5">
        <Item className="w-1/3 pr-5 pb-5" />
        <Item className="w-1/3 pr-5 pb-5" />
        <Item className="w-1/3 pr-5 pb-5" />
        <Item className="w-1/3 pr-5 pb-5" />
        <Item className="w-1/3 pr-5 pb-5" />
        <Item className="w-1/3 pr-5 pb-5" />
        <Item className="w-1/3 pr-5 pb-5" />
        <Item className="w-1/3 pr-5 pb-5" />
        <Item className="w-1/3 pr-5 pb-5" />
        <Item className="w-1/3 pr-5 pb-5" />
        <Item className="w-1/3 pr-5 pb-5" />
        <Item className="w-1/3 pr-5 pb-5" />
      </div>
      <p className="mt-10 text-center">
        <button
          className="inline-block bg-white hover:bg-black hover:text-white border-black border-2 text-black py-1 px-6 font-title"
          type="button"
        >
          load more
        </button>
      </p>
    </>
  );
}
