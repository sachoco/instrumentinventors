import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import VisibilitySensor from "./utilities/react-visibility-sensor-master/visibility-sensor";
import { hasTouch } from "detect-touch";

import { Link } from "react-router-dom";
import normalizePosttype from "./utilities/normalizePosttype";
import Skeleton from "@mui/material/Skeleton";

const Item = (props) => {
  const { item, className, lazy } = props;
  let history = useHistory();
  const ref = useRef();
  const [isOverflow, setIsOverflow] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const {
    title,
    image,
    subcategory,
    subcat_link,
    archive_base,
    link,
    tag,
    date,
    meta1,
    meta2,
  } = normalizePosttype(item);
  useEffect(() => {
    setIsOverflow(ref.current.offsetWidth < ref.current.scrollWidth);
  }, [item]);
  const onClickHandler = (e, link) => {
    e.preventDefault();
    history.push(link);
  };
  const toggleDetail = (e) => {
    e.preventDefault();
    setShowDetail((prevState, props) => {
      return !prevState;
    });
  };
  const itemBox = (
    <div className="group overflow-hidden relative pb-64 border-2 border-black ">
      <Link to={link}>
        <VisibilitySensor>
          <img
            src={image.medium}
            alt={title}
            className="absolute w-full h-full-40px object-cover object-center"
            loading={lazy ? "lazy" : "auto"}
          />
        </VisibilitySensor>
        <div
          className={`absolute flex items-end z-10 w-full px-5 py-2 bottom-0 border-t-2 border-black bg-overlay transition-all ${
            showDetail === false ? "min-h-0 " : "min-h-full+2px "
          } ${hasTouch === false ? "group-hover:min-h-full+2px " : " "}
          `}
        >
          <div
            className={`transition-all duration-200 absolute z-20 w-full top-0 pt-8 left-0  px-5 my-0 h-full-40px overflow-hidden flex items-center  ${
              showDetail === false ? "opacity-0 delay-0  " : "opacity-100 delay-200 "
            } 
            ${
              hasTouch === false
                ? "group-hover:opacity-100 group-hover:delay-200"
                : ""
            }`}
          >
            <div className="w-full">
              <div className="text-xl flex items-end py-2">
                {/* <div className="text-xl min-h-16 flex items-end py-2"> */}
                <span className="line-clamp-2">{title}</span>
              </div>
              {meta1.trim() != "" && meta1 != "&nbsp;" && (
                <div className="line-clamp-3 border-t-2 text-sm py-1">
                  {meta1}
                </div>
              )}
              {meta2.trim() != "" && meta2 != "&nbsp;" && (
                <div className="border-t-2 text-sm py-1">{meta2}</div>
              )}
              {Array.isArray(tag) && tag.length > 0 ? (
                <div className="line-clamp-2 border-t-2 text-sm py-1 border-b-2 ">
                  {tag.map((obj, i) => (
                    <span key={i}>
                      {i > 0 && ", "}
                      {/* <Link to={"/" + archive_base + "/?t=" + obj.id}> */}
                      <span
                        onClick={(e) =>
                          onClickHandler(
                            e,
                            "/" + archive_base + "/?t=" + obj.id
                          )
                        }
                        className="hover:underline"
                      >
                        {obj.name}
                      </span>
                      {/* </Link> */}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="border-b-2 " />
              )}
            </div>
          </div>
          {/* <div className="transition-all group-hover:text-3xl overflow-hidden whitespace-pre">
					{title}
				</div>

				<div className="absolute bottom-0 right-0 px-5 py-2 transition-all min-w-0 group-hover:min-w-full">
					{date}
				</div>
				<div className="absolute bottom-0 right-0 px-5 py-2 z-20 transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
					<Link to={link}>more info</Link>
				</div> */}
          <div className="relative flex w-full items-center h-10">
            {/* <div className="flex-grow max-w-full overflow-hidden overflow-ellipsis whitespace-pre mr-2 mt-0 transition-all group-hover:absolute top-0 group-hover:whitespace-normal group-hover:delay-200 group-hover:mt-8">
						{title}
					</div> */}

            <div
              className={`relative flex-grow transition-all duration-2000 ${
                isOverflow
                  ? "text-sm line-clamp-2 whitespace-normal "
                  : "whitespace-pre overflow-hidden overflow-ellipsis "
              }
              ${
                showDetail === false ? "max-w-full mr-2 " : "max-w-0 mr-0 "
              } 
              ${
                hasTouch === false
                  ? "group-hover:max-w-0 group-hover:mr-0 "
                  : " "
              }`}
            >
              <div
                ref={ref}
                className="opacity-0 absolute w-full text-base line-clamp-none whitespace-pre overflow-hidden overflow-ellipsis text-red-700"
              >
                {title}
              </div>
              {title}
            </div>
            <div
              className={`text-sm ${
                hasTouch === false ? "group-hover:flex-grow " : " "
              }
              ${
                date.length > 15 ? "whitespace-normal " : "whitespace-nowrap "
              }`}
            >
              {date}
            </div>
            <div
              className={`absolute bottom-1/2 transform translate-y-1/2 right-0 px-5 py-2 z-20 transition-all duration-200  ${
                showDetail === false ? "opacity-0 invisible " : "opacity-100 visible "
              } ${
                hasTouch === false
                  ? "group-hover:opacity-100 group-hover:visible "
                  : ""
              }`}
            >
              {/* <Link to={link} className="hover:underline"> */}
              <span
                onClick={(e) => onClickHandler(e, link)}
                className="hover:underline"
              >
                more info
              </span>
              {/* </Link> */}
            </div>
          </div>
        </div>
        <div className="absolute z-20 top-0 right-0 bg-overlay border-b-2 border-l-2 px-4 py-2 text-sm">
          {typeof subcategory === "string" ? (
            subcategory
          ) : (
            <>
              {subcategory?.length > 0
                ? subcategory?.map((cat, i) => (
                    <span key={i}>
                      {i > 0 && ", "}
                      {/* <Link to={"/" + archive_base + "/?c=" + cat.value}> */}
                      <span
                        onClick={(e) =>
                          onClickHandler(
                            e,
                            "/" + archive_base + "/?c=" + cat.value
                          )
                        }
                        className="hover:underline"
                      >
                        {cat.label}
                      </span>
                      {/* </Link> */}
                    </span>
                  ))
                : ""}
            </>
          )}
        </div>
        {hasTouch === true && (
          <div
            className="absolute z-20 top-0 left-0 text-sm m-3 flex justify-center items-center"
            onClick={toggleDetail}
          >
            {showDetail === true ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 14L12 12L10 14ZM12 12L14 10L12 12ZM12 12L10 10L12 12ZM12 12L14 14L12 12ZM21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="8" fill="white" />
                <path
                  d="M13 16H12V12H11L13 16ZM12 8H12.01H12ZM21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
          </div>
        )}

        {/* <div className="transition-all duration-200 absolute z-20 w-full top-8 text-xl px-5 my-2 opacity-0 delay-0 group-hover:delay-200 group-hover:opacity-100 ">
				<div className="mt-1">{title}</div>
				<div className="border-t-2">{meta1}</div>
				<div className="border-t-2">{meta2}</div>
				<div className="border-t-2 border-b-2">{tag}</div>
			</div> */}
      </Link>
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
};
// export default Item;
export default React.memo(Item);
