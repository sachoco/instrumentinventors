import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import normalizePosttype from "./utilities/normalizePosttype";
import Skeleton from "@mui/material/Skeleton";

export default function ListItem(props) {
  const { item, className } = props;
  const {
    title,
    subcategory,
    archive_base,
    link,
    tag,
    date,
    meta1,
    meta2,
  } = normalizePosttype(item);
  const itemBox = (
    <Link to={link} className={className}>
      <div className="flex flex-nowrap items-center border-b-2 py-2 lg:py-4 px-2 hover:bg-bg-filter">
        <div className="flex-grow flex flex-wrap lg:flex-nowrap justify-between flex-grow ">
          <div className="lg:font-bold pr-4 text-lg lg:text-2xl w-full lg:w-350px ">
            {title}
          </div>
          <div className="border-l-2 px-4 leading-3 lg:leading-normal lg:py-1 w-48 flex-grow-0">
            {subcategory.length > 0 ? subcategory?.map((cat, i) =>
              <span key={i}>
              {i>0 && ', '}
              <Link  to={'/'+archive_base+'/?c='+cat.value}>{cat.label}</Link>
              </span>
            )
              : ""}
          </div>
          <div className="border-l-2 px-4 leading-3 lg:leading-normal lg:py-1 min-w-300px flex-grow">
            {tag}
          </div>
        </div>
        <div style={{ width: "32px" }}>
          <button>
            <svg
              className={
                "inline-block duration-100 transition-transform transform "
              }
              width="32px"
              height="32px"
              viewBox="0 0 32 32"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g
                  transform="translate(1.000000, 1.000000)"
                  stroke="#000000"
                  strokeWidth="2"
                >
                  <line x1="7.439" y1="14.821" x2="22.2" y2="14.821"></line>
                  <polyline points="16.73 9.346 22.205 14.821 16.73 20.296"></polyline>
                  <circle cx="14.821" cy="14.821" r="14.821"></circle>
                </g>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
  return (
    <>
      {!item ||
      (Object.keys(item).length === 0 && item.constructor === Object) ? (
        <Skeleton variant="rectangular" className="my-2" height="50px">
          {itemBox}
        </Skeleton>
      ) : (
        itemBox
      )}
    </>
  );
}
