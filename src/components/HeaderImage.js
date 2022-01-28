import React, { useRef, useState, useEffect } from "react";
import normalizePosttype from "./utilities/normalizePosttype";
import { Link } from "react-router-dom";

export default function HeaderImage({ item, ...otherProps }) {
  const ref = useRef();
  const [targetHeight, setTargetHeight] = useState();
  // useEffect(() => {
  //   setTargetHeight(ref.current.offsetWidth + "px");
  // }, []);

  const {
    title,
    image,
    subcategory,
    link,
    website,
    tag,
    date,
    meta1,
    meta2,
    meta3,
    archive_base,
  } = normalizePosttype(item);

  return (
    <>
      <div className="relative ">
        <img
          src={image.full}
          alt={title}
          className="absolute w-full h-full object-cover object-center"
        />
        <div className="absolute top-0 left-0 w-full h-full z-10 bg-gray-800 bg-opacity-50"></div>
        <div
          className="lg:hidden relative z-20 w-full p-10 bottom-0 text-white border-white"
          style={{ paddingTop: "230px" }}
        >
          {/* <h2 className="float-right text-4xl outline-text transform origin-bottom-right rotate-90 -translate-x-3 -translate-y-5">
            {subcategory.length > 0
              ? subcategory?.map((cat, i) => (
                  <span key={i}>
                    {i > 0 && ", "}
                    <Link to={"/" + archive_base + "/?c=" + cat.value}>
                      {cat.label}
                    </Link>
                  </span>
                ))
              : ""}
          </h2> */}
        </div>

        <div
          className="hidden lg:block relative z-10 w-full p-24 bottom-0 text-white border-white"
          style={{ paddingTop: `230px` }}
        >
          <div className="relative">
            <h2 className="text-5xl mb-3">{title}</h2>
            {/* <h2
              ref={ref}
              className="text-8xl absolute right-0 bottom-0 outline-text transform origin-bottom-right rotate-90 -translate-x-24 -translate-y-5"
            >
              {subcategory.length > 0
                ? subcategory?.map((cat, i) => (
                    <span key={i}>
                      {i > 0 && ", "}
                      <Link to={"/" + archive_base + "/?c=" + cat.value}>
                        {cat.label}
                      </Link>
                    </span>
                  ))
                : ""}
            </h2> */}
          </div>
          <div className="border-b-2 border-white"></div>
          <div className="mt-6 text-black">
            {/*<span className="border-2 bg-white py-2 px-4 mr-2">
              {link}
            </span>*/}
            {subcategory?.length > 0
              ? subcategory?.map((cat, i) => (
                  <span
                    key={i}
                    className="inline-block border-2 bg-white py-2 px-4 mr-2 mb-2"
                  >
                    <Link to={"/" + archive_base + "/?c=" + cat.value}>
                      {cat.label}
                    </Link>
                  </span>
                ))
              : ""}
            {date && (
              <span className="inline-block border-2 bg-white py-2 px-4 mr-2 mb-2">
                {date}
              </span>
            )}
            {website && website?.trim() != "" && (
              <span className="inline-block border-2 bg-white py-2 px-4 mr-2 mb-2">
                <a href={website} target="_blank" className="inline-block ">
                  {website}
                </a>
              </span>
            )}
            {meta1 && meta1.trim() != "" && (
              <span className="inline-block border-2 bg-white py-2 px-4 mr-2 mb-2">
                {meta1}
              </span>
            )}
            {meta2 && meta2.trim() != "" && (
              <span className="inline-block border-2 bg-white py-2 px-4 mr-2 mb-2">
                {meta2}
              </span>
            )}
            {meta3 && meta3.trim() != "" && (
              <span className="inline-block border-2 bg-white py-2 px-4 mr-2 mb-2">
                {meta3}
              </span>
            )}
            {Array.isArray(tag) && tag.length > 0
              ? tag.map((obj, i) => (
                  <span
                    key={i}
                    className="inline-block border-2 bg-white py-2 px-4 mr-2 mb-2"
                  >
                    <Link to={"/" + archive_base + "/?t=" + obj.id}>
                      {obj.name}
                    </Link>
                  </span>
                ))
              : tag}
          </div>
        </div>
      </div>
      <div className="lg:hidden relative w-full bg-bg-light-gray border-t-2 border-b-2">
        <h2 className="text-lg text-white bg-bg-gray px-6 py-3">{title}</h2>
        <div className=" text-black p-6 border-t-2 text-xs">
          {subcategory?.length > 0
            ? subcategory?.map((cat, i) => (
                <span
                  key={i}
                  className="inline-block border-2 bg-white py-1 px-2 mr-2 mb-2"
                >
                  <Link to={"/" + archive_base + "/?c=" + cat.value}>
                    {cat.label}
                  </Link>
                </span>
              ))
            : ""}

          {date && (
            <span className="inline-block border-2 bg-white py-1 px-2 mr-2 mb-2">
              {date}
            </span>
          )}
          {website && website.trim() != "" && (
            <a href={website} target="_blank">
              <span className="inline-block border-2 bg-white py-1 px-2 mr-2 mb-2">
                {website}
              </span>
            </a>
          )}
          {meta1 && meta1.trim() != "" && (
            <span className="inline-block border-2 bg-white py-1 px-2 mr-2 mb-2">
              {meta1}
            </span>
          )}
          {meta2 && meta2.trim() != "" && (
            <span className="inline-block border-2 bg-white py-1 px-2 mr-2 mb-2">
              {meta2}
            </span>
          )}
          {meta3 && meta3.trim() != "" && (
            <span className="inline-block border-2 bg-white py-1 px-2 mr-2 mb-2">
              {meta3}
            </span>
          )}
          {Array.isArray(tag) && tag.length > 0
            ? tag.map((obj, i) => (
                <span key={i} className="inline-block border-2 bg-white py-1 px-2 mr-2 mb-2">
                  <Link to={"/" + archive_base + "/?t=" + obj.id}>
                    {obj.name}
                  </Link>
                </span>
              ))
            : tag}
        </div>
      </div>
    </>
  );
}
