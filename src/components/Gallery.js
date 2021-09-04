import React, { useState } from "react";
import Slider from "react-slick";
import { CustomPlaceholder } from "react-placeholder-image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Gallery.css";

export default function Gallery() {
  const [slideId, setSlideId] = useState(0);
  var settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SliderArrow to="left" />,
    nextArrow: <SliderArrow to="right" />,
    afterChange: (i) => {
      setSlideId(i);
    },
  };

  return (
    <>
      <Slider className="gallery lg:mr-24" {...settings}>
        <div className="relative pr-10 pb-gallery">
          <CustomPlaceholder
            className="absolute w-full h-full object-cover object-center"
            width={1340}
            height={800}
          />
        </div>
        <div className="relative pr-10 pb-gallery">
          <CustomPlaceholder
            className="absolute w-full h-full object-cover object-center"
            width={1340}
            height={800}
          />
        </div>
        <div className="relative pr-10 pb-gallery">
          <CustomPlaceholder
            className="absolute w-full h-full object-cover object-center"
            width={1340}
            height={800}
          />
        </div>
      </Slider>
      <div className="text-center font-nav text-2xl mr-24">{slideId+1} / 3</div>
    </>
  );
}

const SliderArrow = ({ className, to, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-black before:text-black button button--text button--icon ${className}`}
    aria-label={to}
  >
    {to == "right" ? (
      <svg width="65px" height="29px" viewBox="0 0 65 29">
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            transform="translate(31.280500, 14.486000) scale(-1, 1) translate(-31.280500, -14.486000) translate(-0.000000, 1.000000)"
            stroke="#000000"
            strokeWidth="2"
          >
            <line
              x1="62.561"
              y1="13.486"
              x2="2.45137244e-13"
              y2="13.486"
            ></line>
            <polyline points="13.486 0 3.55271368e-15 13.486 13.486 26.972"></polyline>
          </g>
        </g>
      </svg>
    ) : (
      <svg width="65px" height="29px" viewBox="0 0 65 29">
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            transform="translate(2.000000, 1.000000)"
            stroke="#000000"
            strokeWidth="2"
          >
            <line
              x1="62.561"
              y1="13.486"
              x2="2.45137244e-13"
              y2="13.486"
            ></line>
            <polyline points="13.486 0 3.55271368e-15 13.486 13.486 26.972"></polyline>
          </g>
        </g>
      </svg>
    )}
  </button>
);
