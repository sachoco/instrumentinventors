import React, { useState, useRef } from "react";
import { CustomPlaceholder } from "react-placeholder-image";

export default function Item(props) {
  {/*const [hovered, setHovered] = useState(false);
  const onMouseEnterHandler = (e) => {
    setHovered(true);
  };
  const onMouseLeaveHandler = (e) => {
    setHovered(false);
  };*/}
  return (
    <div className={props.className}>
      <div
        className="group relative pb-64 border-2 border-black"
      >
        <CustomPlaceholder
          className="absolute w-full h-full object-cover object-center"
          width={366}
          height={275}
        />

        <div className="absolute z-10 w-full px-5 py-2 bottom-0 border-t-2 border-black bg-white transition-all min-h-0 group-hover:min-h-full+2px">
          <div className="transition-all group-hover:text-3xl">
            Paper ensemble
          </div>

          <div className="absolute bottom-0 right-0 px-5 py-2 transition-all min-w-0 group-hover:min-w-full">
            21.05.21 - 28.05.2020
          </div>
          <div className="absolute bottom-0 right-0 px-5 py-2 z-20 transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
            <a href="#">more info </a>
          </div>
        </div>
        <div className="absolute z-20 top-0 right-0 bg-white border-b-2 border-l-2 px-5 py-2">
          subcategory
        </div>
        <div className="transition-all duration-200 absolute z-20 w-full top-16 text-2xl px-5 my-2 opacity-0 delay-0 group-hover:delay-200 group-hover:opacity-100 ">
          <div className="border-t-2">Name author</div>
          <div className="border-t-2">Subcategory event</div>
          <div className="border-t-2 border-b-2">Tag1, tag2, tag3</div>
        </div>
      </div>
    </div>
  );
}
