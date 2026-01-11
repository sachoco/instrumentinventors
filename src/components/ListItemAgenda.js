import React, { useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
import normalizePosttype from "./utilities/normalizePosttype";
import Skeleton from "@mui/material/Skeleton";

export default function ListItemAgenda(props) {
  const { item, className, posttype } = props;
  let history = useHistory();

  const {
    title,
    subcategory,
    archive_base,
    link,
    tag,
    date,
    meta1,
    meta2,
    meta3,
    artists,
    excerpt
  } = normalizePosttype(item);

  const onClickHandler = (e, link) => {
    e.preventDefault();
    history.push(link);
  };
  const itemBox = (
    <div className={className}>
      <Link to={link}>
        {/* <div onClick={(e) => onClickHandler(link)} className={className}> */}
        {/* <div className="flex flex-nowrap items-center border-b-2 py-2 lg:py-4 px-2 hover:bg-bg-filter cursor-pointer"> */}
        <div className="flex flex-nowrap items-center border-b-2 py-2 lg:py-4 px-2 ">
          <div className="flex flex-wrap md:flex-nowrap justify-between flex-grow ">
            <div className="w-full md:w-4/6 flex flex-col flex-nowrap">
              {/* <div className="inline-block -ml-4 -mt-2 align-middle mb-2">
              {subcategory.length > 0
                ? subcategory?.map((cat, i) => (
                    <span key={i}>
                      <Link to={"/" + archive_base + "/?c=" + cat.value}>
                        <span
                          key={i}
                          className="text-2xs inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-middle font-thin text-sm bg-gray-400 text-white rounded mx-0.5"
                        >
                          {cat.label}
                        </span>
                      </Link>
                    </span>
                  ))
                : ""}
            </div> */}
              {date}
              <div className="font-bold pr-4 text-lg lg:text-2xl w-full sm:w-full">
                {title} (@ {meta1})
                {/* <div className="inline-block ml-5 -mt-2 align-middle">
                {subcategory.length > 0
                  ? subcategory?.map((cat, i) => (
                      <span key={i}>
                        <Link to={"/" + archive_base + "/?c=" + cat.value}>
                          <span
                            key={i}
                            className="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-middle font-thin text-sm bg-gray-400 text-white rounded mx-1"
                          >
                            {cat.label}
                          </span>
                        </Link>
                      </span>
                    ))
                  : ""}
              </div> */}
              </div>
              {/* <div className="hidden md:block leading-normal py-1 min-w-100px w-full flex-grow">
                {Array.isArray(tag) && tag.length > 0
                  ? tag.map((t, i) => (
                      // <Link to={"/" + archive_base + "/?t=" + t.id}>
                      <span
                        onClick={(e) =>
                          onClickHandler(e, "/" + archive_base + "/?t=" + t.id)
                        }
                        key={i}
                        className="hover:bg-gray-400 hover:text-white cursor-pointer inline-block bg-gray-200 rounded-full px-2 py-1 text-2xs text-gray-700 mr-1 mb-1"
                      >
                        {t.name}
                      </span>
                      // </Link>
                    ))
                  : // tag.map((obj, i)=>(i>0 ? ", "+obj.name : obj.name))
                    tag}
              </div> */}
              <div className="hidden md:block leading-normal py-1 min-w-100px w-full flex-grow">
                {Array.isArray(artists) && artists.length > 0
                  ? artists.map((a, i) => (
                      // <Link to={"/" + archive_base + "/?t=" + t.id}>
                      <span
                        // onClick={(e) =>
                        //   onClickHandler(e, "/" + archive_base + "/?t=" + t.id)
                        // }
                        key={i}
                        className="hover:bg-gray-400 hover:text-white cursor-pointer inline-block bg-gray-200 rounded-full px-2 py-1 text-2xs text-gray-700 mr-1 mb-1"
                      >
                        {a.name}
                      </span>
                      // </Link>
                    ))
                  : // tag.map((obj, i)=>(i>0 ? ", "+obj.name : obj.name))
                    artists}
              </div>
              <div className="hidden md:block leading-normal py-1 min-w-100px w-full flex-grow">
                {excerpt}
              </div>
            </div>
            <div className="w-full md:w-2/6 flex flex-wrap md:flex-nowrap flex-row md:flex-col md:border-l-2 justify-start items-start">
              
            </div>
            <div className=" md:hidden leading-normal py-1 min-w-100px w-full flex-grow">
              {Array.isArray(tag) && tag.length > 0
                ? tag.map((t, i) => (
                    <span
                      key={i}
                      className="inline-block bg-gray-200 rounded-full px-1.5 py-0 text-2xs text-gray-700 mr-0.5 mb-0.5"
                    >
                      {t.name}
                    </span>
                  ))
                : // tag.map((obj, i)=>(i>0 ? ", "+obj.name : obj.name))
                  tag}
            </div>
          </div>
          <div style={{ width: "32px" }}>
            {/* <Link to={link}> */}
            <button onClick={(e) => onClickHandler(e, link)}>
              <svg
                className={
                  "inline-block duration-100 transition-transform transform hover:scale-110"
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
            {/* </Link> */}
          </div>
        </div>
      </Link>
    </div>
  );
  return (
    <>
      {!item ||
      (Object.keys(item).length === 0 && item.constructor === Object) ? (
        <Skeleton variant="rectangular" className="my-2 " height="80px" />
      ) : (
        itemBox
      )}
    </>
  );
}
