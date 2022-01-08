import React from "react";
import Item from "../Item";

export default function TileView({ items = null, ...otherProps }) {
  const dummyItems = new Array(6).fill({});
  return (
    <>
      <div className="flex flex-wrap justify-start -mr-5">
        {items.length > 0
          ? items?.map((item, i) => (
              <Item key={i} item={item} className="w-full sm:w-1/2 xl:w-1/3 2xl:w-1/4 pr-5 pb-5" />
            ))
          : dummyItems.map((item, i) => (
              <Item key={i} className="w-full lg:w-1/3 pr-5 pb-5" />
            ))}
      </div>
    </>
  );
}
