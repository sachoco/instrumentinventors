import React from "react";
import ListItem from "../ListItem";
import ListItemAgenda from "../ListItemAgenda";

export default function ListView({
  items = null,
  posttype,
  agendaview = false,
  ...otherProps
}) {
  const dummyItems = new Array(6).fill({});

  return (
    <>
      <div className="flex flex-nowrap justify-between flex-col">
        {/* <div className="flex items-center border-b-2 py-4 px-2 font-title"> */}
        {/* <div className="flex justify-between items-center flex-grow">
            <div className="hidden lg:block pr-4 w-350px">name</div>
            <div className="hidden lg:block px-4 py-1 w-28 flex-grow-0">
              type
            </div>
            {
              posttype=="artist"||posttype=="agenda"||posttype=="posts" ?
              <div className="hidden lg:block px-4 leading-3 lg:leading-normal lg:py-1 w-48 ">
                date
              </div>
              : null
            }
            {
              posttype=="agenda" ?
              <div className="hidden lg:block px-4 leading-3 lg:leading-normal lg:py-1 w-48 ">
                location
              </div>
              : null
            }
            {
              posttype=="project" ?
              <>
                <div className="hidden lg:block px-4 leading-3 lg:leading-normal lg:py-1 w-48 ">
                  author
                </div>
                <div className="hidden lg:block px-4 leading-3 lg:leading-normal lg:py-1 w-48 ">
                  year
                </div>
              </>
              : null
            }
            <div className="hidden lg:block px-4 py-1 min-w-100px flex-grow">
              tags
            </div>
          </div>
          <div className="hidden lg:block " style={{ width: "32px" }}></div> */}
        {/* </div> */}
        {items.length > 0 && (
          <div className="flex items-center border-b-2 py-4 px-2 font-title"></div>
        )}
        {items.length > 0
          ? !agendaview
            ? items?.map((item, i) => (
                <ListItem key={i} item={item} posttype={posttype} />
              ))
            : items?.map((item, i) => (
                <ListItemAgenda key={i} item={item} posttype={posttype} />
              ))
          : dummyItems.map((item, i) => <ListItem key={i} className="" />)}
      </div>
    </>
  );
}
