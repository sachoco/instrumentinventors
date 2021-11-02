import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";

const SidebarNavigation = ({menuItems}) => {
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef(null);
  const onClickHandler = (e) => {
    showMenu ? setShowMenu(false) : setShowMenu(true);
  };
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setShowMenu(false);
    }
  }, []);

  const handleClickOutside = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target) && showMenu) {
        setShowMenu(false);
      }
    },
    [ref, showMenu]
  );
  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, showMenu]);

  return (
    <div className="hidden lg:block" ref={ref}>
      <div
        className={`fixed z-40 h-screen w-1/4 bg-white left-0 border-r-2 pt-24 font-nav transform transition ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative h-full p-10">
          <button
            className="absolute top-0 right-0 border-l-2 border-b-2 p-2"
            onClick={onClickHandler}
          >
            <svg width="22px" height="22px" viewBox="0 0 22 22">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g
                  transform="translate(1.000000, 1.000000)"
                  stroke="#000000"
                  strokeWidth="2"
                >
                  <line x1="0" y1="0" x2="20" y2="20"></line>
                  <line x1="20" y1="0" x2="0" y2="20"></line>
                </g>
              </g>
            </svg>
          </button>
          <nav>
            <h5 className="text-xl font-bold border-b-2">about</h5>
            <ul className="my-5">
              {menuItems.items['about-menu']?.map((item, i) => (
                  <li key={i} className="my-1">
                    <Link to={item.path}>{item.title}</Link>
                  </li>
                ))}
            </ul>
            <h5 className="text-xl font-bold border-b-2 mt-12">get involved</h5>
            <ul className="my-5">
              {menuItems.items['get_involved-menu']?.map((item, i) => (
                  <li key={i} className="my-1">
                    <Link to={item.path}>{item.title}</Link>
                  </li>
                ))}
            </ul>
          </nav>
          <SearchForm />
        </div>
      </div>
      <div className="fixed bottom-0 ml-24 w-hscreen h-24 bg-white border-b-2 z-20 font-nav text-xl transform -rotate-90 origin-bottom-left ">
        <nav className="w-full h-full">
          <ul className="flex justify-around items-center h-full">
            <li className="inline-block mx-10">
              <span
                className="inline-block cursor-pointer"
                onClick={onClickHandler}
              >
                <svg width="31px" height="31px" viewBox="0 0 31 31">
                  <g
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      transform="translate(1.000000, 1.000000)"
                      stroke="#000000"
                      strokeWidth="2"
                    >
                      <g
                        id="Ellipse_1"
                        transform="translate(8.000000, 0.000000)"
                      >
                        <circle id="Oval" cx="10.5" cy="10.5" r="10.5"></circle>
                      </g>
                      <line x1="11" y1="18" x2="0" y2="29" id="Line_36"></line>
                    </g>
                  </g>
                </svg>
              </span>
            </li>
            <li className="inline-block mx-10">
              <span className="inline-block">
                <span
                  className="group relative inline-block whitespace-nowrap hover:font-bold cursor-pointer"
                  style={{ width: "220px" }}
                  onClick={onClickHandler}
                >
                  get involved
                  <svg
                    className="absolute right-0 top-2.5 ml-5"
                    width="14px"
                    height="9px"
                    viewBox="0 0 14 9"
                  >
                    <g
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <polyline
                        stroke="#000000"
                        strokeWidth="2"
                        points="0.8835 1.1165 7.1165 7.3495 13.3495 1.1165"
                        className="group-hover:stroke-3"
                      ></polyline>
                    </g>
                  </svg>
                </span>
              </span>
            </li>
            <li className="inline-block mx-10">
              <span className="inline-block">
                <span
                  className="group inline-block whitespace-nowrap hover:font-bold cursor-pointer"
                  onClick={onClickHandler}
                >
                  about
                  <svg
                    className="inline ml-5"
                    width="14px"
                    height="9px"
                    viewBox="0 0 14 9"
                  >
                    <g
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <polyline
                        stroke="#000000"
                        strokeWidth="2"
                        points="0.8835 1.1165 7.1165 7.3495 13.3495 1.1165"
                        className="group-hover:stroke-3"
                      ></polyline>
                    </g>
                  </svg>
                </span>
              </span>
            </li>
            <li className="inline-block flex-grow" />
          </ul>
        </nav>
      </div>

      {/*<div className="fixed h-screen w-24 bg-white border-r-2 z-10 font-nav text-xl">
      <nav className="w-full h-full">
        <ul className="flex flex-col-reverse justify-between items-center h-full">
          <li className="inline-block">
            <span className="inline-block w-0 overflow-visible transform -rotate-90 origin-left ">
              <svg width="31px" height="31px" viewBox="0 0 31 31">
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Group"
                    transform="translate(1.000000, 1.000000)"
                    stroke="#000000"
                    strokeWidth="2"
                  >
                    <g id="Ellipse_1" transform="translate(8.000000, 0.000000)">
                      <circle id="Oval" cx="10.5" cy="10.5" r="10.5"></circle>
                    </g>
                    <line x1="11" y1="18" x2="0" y2="29" id="Line_36"></line>
                  </g>
                </g>
              </svg>
            </span>
          </li>
          <li className="inline-block">
            <span className="inline-block w-0 overflow-visible transform -rotate-90 origin-left ">
              <Link
                className="inline-block whitespace-nowrap hover:font-bold"
                to="/involved"
              >
                get involved
                <svg
                  className="inline ml-5"
                  width="14px"
                  height="9px"
                  viewBox="0 0 14 9"
                >
                  <g
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <polyline
                      stroke="#000000"
                      strokeWidth="2"
                      points="0.8835 1.1165 7.1165 7.3495 13.3495 1.1165"
                    ></polyline>
                  </g>
                </svg>
              </Link>
            </span>
          </li>
          <li className="inline-block">
            <span className="inline-block w-0 overflow-visible transform -rotate-90 origin-left ">
              <Link className="inline-block whitespace-nowrap hover:font-bold" to="/about">
                about
                <svg
                  className="inline ml-5"
                  width="14px"
                  height="9px"
                  viewBox="0 0 14 9"
                >
                  <g
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <polyline
                      stroke="#000000"
                      strokeWidth="2"
                      points="0.8835 1.1165 7.1165 7.3495 13.3495 1.1165"
                    ></polyline>
                  </g>
                </svg>
              </Link>
            </span>
          </li>
          <li className="inline-block" />
        </ul>
      </nav>
    </div>*/}
    </div>
  );
};

export default SidebarNavigation;
