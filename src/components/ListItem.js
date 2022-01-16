import React, { useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
import normalizePosttype from "./utilities/normalizePosttype";
import Skeleton from "@mui/material/Skeleton";

export default function ListItem(props) {
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
  } = normalizePosttype(item);

  const onClickHandler = (link) => {
    history.push(link);
  };
  const itemBox = (
    <div onClick={(e) => onClickHandler(link)} className={className}>
      <div className="flex flex-nowrap items-center border-b-2 py-2 lg:py-4 px-2 hover:bg-bg-filter cursor-pointer">
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
            <div className="font-bold pr-4 text-lg lg:text-2xl w-full sm:w-full">
              {title}
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
            <div className="hidden md:block leading-normal py-1 min-w-100px w-full flex-grow">
              {Array.isArray(tag) && tag.length > 0
                ? tag.map((t, i) => (
                    <span
                      key={i}
                      className="inline-block bg-gray-200 rounded-full px-2 py-1 text-2xs text-gray-700 mr-1 mb-1"
                    >
                      {t.name}
                    </span>
                  ))
                : // tag.map((obj, i)=>(i>0 ? ", "+obj.name : obj.name))
                  tag}
            </div>
          </div>
          <div className="w-full md:w-2/6 flex flex-wrap md:flex-nowrap flex-row md:flex-col md:border-l-2 justify-start items-start">
            <div className="px-4 leading-normal py-1 md:w-full flex-grow-0 border-l-2 md:border-l-0">
              {/* {subcategory.length > 0 ? subcategory?.map((cat, i) =>
						<span key={i}>
						{i>0 && ', '}
						{cat.label}
						</span>
						)
							: ""} */}
              {subcategory.length > 0
                ? subcategory?.map((cat, i) => (
                    <span key={i}>
                      {i > 0 && ", "}
                      <Link to={"/" + archive_base + "/?c=" + cat.value}>
                        {/* <span
                        key={i}
                        className="whitespace-nowrap inline-block bg-gray-200 rounded-full px-3 py-1 text-xs text-gray-700 mr-2 mb-2"
                      >
                        {cat.label}
                      </span> */}
                        {cat.label}
                      </Link>
                    </span>
                  ))
                : ""}
            </div>
            {posttype == "artist" ||
            posttype == "agenda" ||
            posttype == "posts" ? (
              <div className="px-4 leading-normal py-1 md:w-full border-l-2 md:border-l-0">
                {date}
              </div>
            ) : null}
            {posttype == "agenda" ? (
              <div className="px-4 leading-normal py-1 md:w-full border-l-2 md:border-l-0">
			  {meta1}
              </div>
            ) : null}
            {posttype == "project" ? (
              <>
              <div className="px-4 leading-normal py-1 md:w-full border-l-2 md:border-l-0">
                  {meta1}
                </div>
				<div className="px-4 leading-normal py-1 md:w-full border-l-2 md:border-l-0">
                  {meta2}
                </div>
              </>
            ) : null}
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
