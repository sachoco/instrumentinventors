import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const SearchForm = ({ mobile = false, noreactrouter = false }) => {
  const [searchStr, setSearchStr] = useState("");
  let history = useHistory();
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setSearchStr(value);
  };
  const onClickHandler = () => {
    noreactrouter
      ? (window.location.href = "/search?q=" + searchStr)
      : history.push("/search?q=" + searchStr);
  };
  const onKeyDown = (event) => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      onClickHandler();
    }
  };
  return (
    <h5 className="relative text-xl font-bold border-b-2 mt-12 flex">
      <button
        type="submit"
        className={`p-1 focus:outline-none focus:shadow-outline ${
          mobile ? "absolute z-50 right-0 bottom-0" : ""
        }`}
        onClick={onClickHandler}
      >
        <svg
          className="inline-block mr-3"
          width="31px"
          height="31px"
          viewBox="0 0 31 31"
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g
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
      </button>
      <input
        className={`search appearance-none bg-transparent placeholder-black w-full py-1 leading-tight focus:outline-none placeholder-light ${
          mobile ? "text-center px-10" : "px-2"
        }`}
        type="text"
        placeholder="search"
        aria-label="search"
        onChange={onChangeHandler}
        onKeyDown={onKeyDown}
      />
    </h5>
  );
};

export default SearchForm;
