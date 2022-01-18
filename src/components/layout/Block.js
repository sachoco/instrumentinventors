import React, { useState, useEffect } from "react";
import HorizontalSlider from "../HorizontalSlider";
import Wave from "../Wave";

const Block = ({
  title = null,
  bg = false,
  carousel = false,
  url = null,
  url2 = null,
  related_item = false,
  debug = false,
  ...otherProps
}) => {
  const [scrollSine, setScrollSine] = useState(0);
  const [disable, setDisable] = useState(false);

  return (
    <>
    {!disable &&    
      <div
        className={
          "px-8 py-10 lg:px-24 lg:py-16 " +
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
        {carousel && <HorizontalSlider setDisable={setDisable} debug={debug} url={url} url2={url2} related_item={related_item} onScroll={ (value) => setScrollSine(value) } />}
        {otherProps.children}
      </div>
    }
    </>
  );
};

export default Block;
