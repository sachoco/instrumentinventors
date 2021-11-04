import React, { useState, useContext, useEffect, useCallback } from "react";
import ViewContext from "../store/view-context";
import SelectBox from "./SelectBox";
import Switch from "./Switch";

import filterData from "../data/filterData.json";

export default function Filter(props) {
  const viewCtx = useContext(ViewContext);

  const [showBox, setShowBox] = useState(false);
  const onClickHandler = (e) => {
    showBox ? setShowBox(false) : setShowBox(true);
  };
  const onModeChangeHandler = (bool) => {
    if (bool) {
      viewCtx.changeView("tile");
    } else {
      viewCtx.changeView("list");
    }
  };

  const [y, setY] = useState(window.scrollY);
  const [showFilter, setShowFilter] = useState(true);

  const onScrollHandler = useCallback(
    (e) => {
      const window = e.currentTarget;
      if (y > window.scrollY) {
        setShowFilter(true);
      } else if (y < window.scrollY) {
        if (!showBox) {
          setShowFilter(false);
        }
      }
      setY(window.scrollY);
    },
    [y, showBox]
  );

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", onScrollHandler);

    return () => {
      window.removeEventListener("scroll", onScrollHandler);
    };
  }, [onScrollHandler]);

  return (
    <div className={props.className}>
      <div
        className={
          "fixed t-24 l-0 w-full lg:pr-24 z-40 transform transition " +
          (showFilter ? "" : "-translate-y-full")
        }
      >
        <div className="relative flex justify-between items-center bg-bg-filter border-b-2 text-white z-10">
          <div className="border-r-2 py-5 px-24 font-nav flex-grow lg:flex-grow-0">
            filter
            <button onClick={onClickHandler}>
              <svg
                className={
                  "inline-block ml-5 duration-100 transition-transform transform " +
                  (showBox ? "-rotate-180" : "")
                }
                width="27px"
                height="27px"
                viewBox="0 0 27 27"
              >
                <g
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                  strokeLinecap="round"
                  transform="translate(1.00000, 1.00000)"
                >
                  <g stroke="#FFFFFF">
                    <g transform="translate(12.500000, 12.500000) rotate(90.000000) translate(-12.500000, -12.500000) ">
                      <line
                        x1="6.274"
                        y1="12.499"
                        x2="18.723"
                        y2="12.499"
                        id="Line_126"
                      ></line>
                      <polyline
                        id="Path_31320"
                        points="14.111 7.882 18.729 12.5 14.111 17.118"
                      ></polyline>
                      <circle
                        id="Ellipse_2581"
                        cx="12.5"
                        cy="12.5"
                        r="12.5"
                      ></circle>
                    </g>
                  </g>
                </g>
              </svg>
            </button>
          </div>
          <div className="hidden lg:block"></div>
          <div className="lg:border-l-2 py-5 px-24 font-nav flex items-center flex-grow lg:flex-grow-0">
            <span className="hidden lg:inline-block">view mode:</span>
            <span
              className={"mx-3 " + (viewCtx.mode == "tile" || "opacity-50")}
            >
              tile
            </span>
            <Switch
              className="inline-block"
              checked={viewCtx.mode == "list" ? true : false}
              onModeChange={onModeChangeHandler}
            />
            <span
              className={"mx-3 " + (viewCtx.mode == "list" || "opacity-50")}
            >
              list
            </span>
          </div>
        </div>

        <div
          className={
            "absolute w-full bg-bg-light-gray border-b-2 flex flex-col lg:flex-row justify-between px-24 py-5 transition transform z-0 " +
            (showBox ? "" : "-translate-y-full")
          }
        >
          <div className="w-full mr-20 ">
            <label className="font-nav">category</label>

            <select className="form-select block w-full mt-1 border-2 p-1" name="cat" onChange={props.onChange}>
              {Object.keys(filterData.artist.category).map((item, i) => (
                <option key={i} value={item}>
                  {filterData.artist.category[item]}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full mt-5 lg:mt-0 lg:mr-20 ">
            <label className="font-nav">subcategory 1</label>

            <select className="form-select block w-full mt-1 border-2 p-1">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
              <option>Option 4</option>
              <option>Option 5</option>
            </select>
          </div>
          <div className="w-full mt-5 lg:mt-0 lg:mr-20 ">
            <label className="font-nav">subcategory 2</label>

            <select className="form-select block w-full mt-1 border-2 p-1">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
              <option>Option 4</option>
              <option>Option 5</option>
            </select>
          </div>
          <div className="w-full mt-5 lg:mt-0 lg:mr-20 ">
            <label className="font-nav">tag</label>

            <select className="form-select block w-full mt-1 border-2 p-1">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
              <option>Option 4</option>
              <option>Option 5</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
