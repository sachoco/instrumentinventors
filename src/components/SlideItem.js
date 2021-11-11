import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import normalizePosttype from "./utilities/normalizePosttype";
import Skeleton from "@mui/material/Skeleton";
import Marquee from "react-fast-marquee";

export default function SlideItem(props) {
  const { item, className } = props;
  const {
    title,
    image,
    subcategory,
    archive_base,
    link,
    tag,
    date,
    meta1,
    meta2,
    meta3,
  } = normalizePosttype(item);
  const itemBox = (
    <Link to={link}>
      <img
        className="absolute w-full h-full object-cover object-center"
        src={image.large}
        alt={title}
      />
      <div className="absolute z-10 w-full py-5 pl-8 pr-14 lg:py-24 lg:pl-24 lg:pr-24 bottom-0 text-white border-white">
        <span className="uppercase text-xs lg:text-base">Highlighted:</span>
        <h2 className="text-3xl lg:text-5xl lg:overflow-hidden lg:overflow-ellipsis lg:white outline-text">
          {title}
        </h2>
        {/*<div className="mb-1">
        <svg viewBox="0 0 30 1">
          <text x="0" y="0.8" textAnchor="left" fontSize="1" fill="none" strokeWidth=".02" stroke="#fff" fontFamily="GT Walsheim">event title</text>
        </svg>
      </div>*/}
        <div className="hidden lg:block">
          <div className="border-b-2 border-white"></div>
          <span>{meta3}</span>
          <span className="border-none float-right">
            {date}
          </span>
        </div>
        <div className="lg:hidden bg-white border-t-2 absolute transform origin-bottom-left -rotate-90 translate-x-full bottom-0 left-0 w-full text-black py-4">
          <Marquee gradient={false} speed={1}>
            agency circulation event |{" "}
            {date}
          </Marquee>
        </div>
      </div>
    </Link>
  );

  return (
    <div className={className}>
      {!item ||
      (Object.keys(item).length === 0 && item.constructor === Object) ? (
        <Skeleton variant="rectangular" sx={{ maxWidth: "none", width: "100%", height:"100%", position:"absolute" }}>
          {itemBox}
        </Skeleton>
      ) : (
        itemBox
      )}
    </div>
  );
}
