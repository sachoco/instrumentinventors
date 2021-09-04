import React from "react";
import ListItem from "../ListItem";

export default function ListView(props) {
  return (
    <>
      <div className="flex flex-wrap justify-between flex-col">
        <div className="flex items-center border-b-2 py-4 px-2 font-title">
          <div className="flex justify-between items-center flex-grow">
            <div className="hidden lg:block pr-4 w-350px">
              name
            </div>
            <div className="hidden lg:block px-4 py-1 w-48 flex-grow-0">subcategory</div>
            <div className="hidden lg:block px-4 py-1 min-w-300px flex-grow">
              tags
            </div>
          </div>
          <div className="hidden lg:block " style={{ width: "32px" }}></div>
        </div>
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
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
