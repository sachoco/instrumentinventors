import React from "react";
import ListItem from "../ListItem";

export default function ListView({ items = null, posttype, ...otherProps }) {
  const dummyItems = new Array(6).fill({});

  return (
    <>
      <div className="flex flex-wrap justify-between flex-col">
        <div className="flex items-center border-b-2 py-4 px-2 font-title">
          <div className="flex justify-between items-center flex-grow">
            <div className="hidden lg:block pr-4 w-350px">name</div>
            <div className="hidden lg:block px-4 py-1 w-48 flex-grow-0">
              subcategory
            </div>
            {
              posttype=="artist"||posttype=="agenda"||posttype=="posts" ?
              <div className=" px-4 leading-3 lg:leading-normal lg:py-1 w-48 ">
                date
              </div>
              : null
            }
            {
              posttype=="agenda" ?
              <div className=" px-4 leading-3 lg:leading-normal lg:py-1 w-48 ">
                city
              </div>
              : null
            }
            {
              posttype=="project" ?
              <>
                <div className=" px-4 leading-3 lg:leading-normal lg:py-1 w-48 ">
                  author
                </div>
                <div className=" px-4 leading-3 lg:leading-normal lg:py-1 w-48 ">
                  year
                </div>
              </>
              : null
            }
            <div className="hidden lg:block px-4 py-1 min-w-100px flex-grow">
              tags
            </div>
          </div>
          <div className="hidden lg:block " style={{ width: "32px" }}></div>
        </div>
        {items.length > 0
          ? items?.map((item, i) => <ListItem key={i} item={item} posttype={posttype} />)
          : dummyItems.map((item, i) => (
              <ListItem key={i} className="" />
            ))}
      </div>
    </>
  );
}
