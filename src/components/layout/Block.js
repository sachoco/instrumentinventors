import React, { useState } from "react";
import HorizontalSlider from "../HorizontalSlider";
import Wave from "../Wave";

const Block = ({
  title = null,
  bg = false,
  carousel = false,
  url = null,
  url2 = null,
  ...otherProps
}) => {
  const [scrollSine, setScrollSine] = useState(0);

  return (
    <div
      className={
        "px-8 py-10 lg:p-24 " +
        (bg ? "bg-bg-lighter-gray " : "") +
        otherProps.className
      }
    >
      {title && (
        <div className="flex flex-col lg:flex-row items-start lg:items-center w-full lg:gap-6 mb-4 lg:mb-10 -mr-24">
          <h4 className="text-lg lg:text-2xl whitespace-nowrap">{title}</h4>
          <Wave waveType="sine" scrollX={scrollSine} />
        </div>
      )}
      {carousel && <HorizontalSlider url={url} url2={url2} onScroll={ (value) => setScrollSine(value) } />}
      {otherProps.children}
    </div>
  );
};

export default Block;
