import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import SearchForm from "./SearchForm";
import LanguageSlect from "../LanguageSelect";

const MyLink = styled(NavLink)`
  &.active {
    &:before {
      content: "";
      width: 50px;
      border-bottom: 2px solid;
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const MobileNavigation = ({ menuItems, noreactrouter }) => {

  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const onClickHandler = (e) => {
    showMenu ? setShowMenu(false) : setShowMenu(true);
  };
  const onToggleSubmenu = (cat) => {
    showSubMenu ? setShowSubMenu(false) : setShowSubMenu(cat);
  };
  return (
    <div className="relative w-full h-full">
      <button
        className="w-full h-full flex justify-center items-center"
        onClick={onClickHandler}
      >
        {!showMenu ? (
          <svg width="35px" height="23px" viewBox="0 0 35 23">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g
                transform="translate(0.000000, 1.000000)"
                stroke="#000000"
                strokeWidth="2"
              >
                <line x1="35" y1="0.5" x2="0" y2="0.5"></line>
                <line x1="35" y1="10.5" x2="0" y2="10.5"></line>
                <line x1="35" y1="20.5" x2="0" y2="20.5"></line>
              </g>
            </g>
          </svg>
        ) : (
          <svg width="27px" height="27px" viewBox="0 0 27 27">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g
                transform="translate(1.000000, 1.000000)"
                stroke="#000000"
                strokeWidth="2"
              >
                <line
                  x1="30.2279221"
                  y1="12.7279221"
                  x2="-4.77207794"
                  y2="12.7279221"
                  transform="translate(12.727922, 12.727922) rotate(45.000000) translate(-12.727922, -12.727922) "
                ></line>
                <line
                  x1="30.2279221"
                  y1="12.7281847"
                  x2="-4.77207794"
                  y2="12.7281847"
                  transform="translate(12.727922, 12.728185) rotate(-45.000000) translate(-12.727922, -12.728185) "
                ></line>
              </g>
            </g>
          </svg>
        )}
      </button>
      {showSubMenu && (
        <button
          className="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-white"
          onClick={onToggleSubmenu}
        >
          <svg width="31px" height="26px" viewBox="0 0 31 26">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g
                transform="translate(2.000000, 1.000000)"
                stroke="#000000"
                strokeWidth="2"
              >
                <line x1="28.658" y1="11.913" x2="0" y2="11.913"></line>
                <polyline points="11.913 0 5.68434189e-13 11.913 11.913 23.826"></polyline>
              </g>
            </g>
          </svg>
        </button>
      )}
      <div
        className={`fixed -z-10 top-0 h-screen w-full left-0 pt-14 font-nav transform duration-200 transition-all ${
          !showMenu ? "opacity-0 invisible" : "opacity-100 visible"
        }`}
      >
        <div className="relative h-full p-8 bg-white flex flex-col justify-between">
          <nav className="flex-grow border-b-2 pb-8">

              {noreactrouter ? (
                <ul className="flex flex-col justify-around h-full  leading-10">
                  <li className="text-center">
                    <a className="relative hover:font-bold" href="/artists/">
                      artists
                    </a>
                  </li>
                  <li className="text-center">
                    <a className="relative hover:font-bold" href="/hosted/">
                      hosted program
                    </a>
                  </li>
                  <li className="text-center">
                    <a className="relative hover:font-bold" href="/agency/">
                      agency
                    </a>
                  </li>
                  <li className="text-center">
                    <a className="relative hover:font-bold" href="/education/">
                      education
                    </a>
                  </li>
                  <li className="text-center">
                    <a className="relative hover:font-bold" href="/editions/">
                      editions
                    </a>
                  </li>
                </ul>
              ) : (
                <ul className="flex flex-col justify-around h-full  leading-10">
                  <li className="text-center">
                    <MyLink
                      activeClassName="font-bold active"
                      className="relative hover:font-bold"
                      to="/artists/"
                    >
                      artists
                    </MyLink>
                  </li>
                  <li className="text-center">
                    <MyLink
                      activeClassName="font-bold active"
                      className="relative hover:font-bold"
                      to="/hosted/"
                    >
                      hosted program
                    </MyLink>
                  </li>
                  <li className="text-center">
                    <MyLink
                      activeClassName="font-bold active"
                      className="relative hover:font-bold"
                      to="/agency/"
                    >
                      agency
                    </MyLink>
                  </li>
                  <li className="text-center">
                    <MyLink
                      activeClassName="font-bold active"
                      className="relative hover:font-bold"
                      to="/education/"
                    >
                      education
                    </MyLink>
                  </li>
                  <li className="text-center">
                    <MyLink
                      activeClassName="font-bold active"
                      className="relative hover:font-bold"
                      to="/editions/"
                    >
                      editions
                    </MyLink>
                  </li>
                  <li className="text-center">
                    <LanguageSlect />
                  </li>
                </ul>
              )}
          </nav>

          <nav className="flex-grow py-10 border-b-2 ">
            <ul className="flex flex-col justify-around h-full leading-10">
              <li className="text-center">
                <span
                  className="relative font-bold cursor-pointer"
                  onClick={(e) => {
                    onToggleSubmenu("about");
                  }}
                >
                  about
                  <svg
                    className="absolute -right-8 top-1 ml-5 transform -rotate-90"
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
                        className="stroke-3"
                      ></polyline>
                    </g>
                  </svg>
                </span>
              </li>
              <li className="text-center">
                <span
                  className="relative font-bold cursor-pointer"
                  onClick={(e) => {
                    onToggleSubmenu("get-involved");
                  }}
                >
                  get involved
                  <svg
                    className="absolute -right-8 top-1 ml-5 transform -rotate-90"
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
                        className="stroke-3"
                      ></polyline>
                    </g>
                  </svg>
                </span>
              </li>
            </ul>
          </nav>
          <div className="flex-grow flex flex-col justify-around">
            <SearchForm mobile noreactrouter={noreactrouter} />
          </div>

          <div
            className={`absolute top-0 left-0 h-full w-full p-8 bg-white flex flex-col justify-between font-nav transform duration-200 transition-all ${
              !showSubMenu ? "opacity-0 invisible" : "opacity-100 visible"
            }`}
          >
            <nav className="flex-grow pb-8">
              <ul className="flex flex-col justify-around h-full leading-10">
                {showSubMenu == "about" && (
                  <>
                    {menuItems.items["about-menu"]?.map((item, i) => (
                      <li key={i} className="text-center">
                        {noreactrouter ? (
                          <a
                            className="relative hover:font-bold"
                            href={item.path}
                          >
                            {item.title}
                          </a>
                        ) : (
                          <MyLink
                            activeClassName="font-bold active"
                            className="relative hover:font-bold"
                            to={item.path}
                          >
                            {item.title}
                          </MyLink>
                        )}
                      </li>
                    ))}
                  </>
                )}

                {showSubMenu == "get-involved" && (
                  <>
                    {menuItems.items["get_involved-menu"]?.map((item, i) => (
                      <li key={i} className="text-center">
                        {noreactrouter ? (
                          <a
                            className="relative hover:font-bold"
                            href={item.path}
                          >
                            {item.title}
                          </a>
                        ) : (
                          <MyLink
                            activeClassName="font-bold active"
                            className="relative hover:font-bold"
                            to={item.path}
                          >
                            {item.title}
                          </MyLink>
                        )}
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
