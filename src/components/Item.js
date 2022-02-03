import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import VisibilitySensor from "./utilities/react-visibility-sensor-master/visibility-sensor";

import { Link } from "react-router-dom";
import normalizePosttype from "./utilities/normalizePosttype";
import Skeleton from "@mui/material/Skeleton";

const Item = (props) => {
  const { item, className, lazy } = props;
  let history = useHistory();
  const ref = useRef();
  const [isOverflow, setIsOverflow] = useState(false);
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
        <div className="absolute flex items-end z-10 w-full px-5 py-2 bottom-0 border-t-2 border-black bg-overlay transition-all min-h-0 group-hover:min-h-full+2px">
          <div className="transition-all duration-200 absolute z-20 w-full top-0 pt-8 left-0  px-5 my-0 opacity-0 delay-0 group-hover:delay-200 group-hover:opacity-100 h-full-40px overflow-hidden flex items-center">
            <div className="w-full">
            <div className="text-xl flex items-end py-2">
            {/* <div className="text-xl min-h-16 flex items-end py-2"> */}
              <span className="line-clamp-2">{title}</span>
            </div>
            {meta1.trim() != "" && meta1 != "&nbsp;" && (
              <div className="line-clamp-3 border-t-2 text-sm py-1">{meta1}</div>
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
                        onClickHandler(e, "/" + archive_base + "/?t=" + obj.id)
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
              className={`relative flex-grow max-w-full mr-2 transition-all group-hover:max-w-0 group-hover:mr-0 duration-2000 ${
                isOverflow
                  ? "text-sm line-clamp-2 whitespace-normal "
                  : "whitespace-pre overflow-hidden overflow-ellipsis "
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
            <div className="group-hover:flex-grow whitespace-nowrap text-sm">
              {date}
            </div>
            <div className="absolute bottom-1/2 transform translate-y-1/2 right-0 px-5 py-2 z-20 transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
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
