import React from "react";
import ListItem from "../ListItem";

export default function ListView({ items = null, ...otherProps }) {
  const dummyItems = new Array(12).fill({});

  return (
    <>
      <div className="flex flex-wrap justify-between flex-col">
        <div className="flex items-center border-b-2 py-4 px-2 font-title">
          <div className="flex justify-between items-center flex-grow">
            <div className="hidden lg:block pr-4 w-350px">name</div>
            <div className="hidden lg:block px-4 py-1 w-48 flex-grow-0">
              subcategory
            </div>
            <div className="hidden lg:block px-4 py-1 min-w-300px flex-grow">
              tags
            </div>
          </div>
          <div className="hidden lg:block " style={{ width: "32px" }}></div>
        </div>
        {items.length > 0
          ? items?.map((item, i) => <ListItem key={i} item={item} />)
          : dummyItems.map((item, i) => (
              <ListItem key={i} className="w-1/3 pr-5 pb-5" />
            ))}
      </div>
    </>
  );
}
