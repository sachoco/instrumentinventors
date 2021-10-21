import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import normalizePosttype from "./utilities/normalizePosttype";
import Skeleton from "@mui/material/Skeleton";

export default function Item(props) {
  const { item, className } = props;
  const {
    title,
    image,
    subcategory,
    link,
    tag,
    date,
    meta1,
    meta2,
  } = normalizePosttype(item);

  const itemBox = (
    <div className="group relative pb-64 border-2 border-black">
      <img
        src={image.medium}
        alt={title}
        className="absolute w-full h-full object-cover object-center"
      />
      <div className="absolute z-10 w-full px-5 py-2 bottom-0 border-t-2 border-black bg-white transition-all min-h-0 group-hover:min-h-full+2px">
        <div className="transition-all group-hover:text-3xl overflow-hidden whitespace-pre">
          {title}
        </div>

        <div className="absolute bottom-0 right-0 px-5 py-2 transition-all min-w-0 group-hover:min-w-full">
          {date}
        </div>
        <div className="absolute bottom-0 right-0 px-5 py-2 z-20 transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
          <Link to={link}>more info</Link>
        </div>
      </div>
      <div className="absolute z-20 top-0 right-0 bg-white border-b-2 border-l-2 px-5 py-2">
        {subcategory}
      </div>
      <div className="transition-all duration-200 absolute z-20 w-full top-16 text-2xl px-5 my-2 opacity-0 delay-0 group-hover:delay-200 group-hover:opacity-100 ">
        <div className="border-t-2">{meta1}</div>
        <div className="border-t-2">{meta2}</div>
        <div className="border-t-2 border-b-2">{tag}</div>
      </div>
    </div>
  );

  return (
    <div className={className}>
      {!item ||
      (Object.keys(item).length === 0 && item.constructor === Object) ? (
        <Skeleton variant="rectangular" sx={{ maxWidth: "none" }}>
          {itemBox}
        </Skeleton>
      ) : (
        itemBox
      )}
    </div>
  );
}
