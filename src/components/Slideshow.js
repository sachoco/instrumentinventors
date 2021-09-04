import React from "react";
import Slider from "react-slick";
import { CustomPlaceholder } from "react-placeholder-image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slideshow.css";
import Marquee from "react-fast-marquee";


export default function Slideshow() {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider className="border-b-2" {...settings}>
      <div className="relative pb-4/5 lg:pb-1/3">
        <CustomPlaceholder
          className="absolute w-full h-full object-cover object-center"
          width={1340}
          height={500}
        />
      <div className="absolute z-10 w-full py-5 pl-8 pr-14 lg:py-24 lg:pl-24 lg:pr-24 bottom-0 text-white border-white">
          <span className="uppercase text-xs lg:text-base">Highlighted:</span>
          <h2 className="text-3xl lg:text-5xl outline-text">event title</h2>
          {/*<div className="mb-1">
            <svg viewBox="0 0 30 1">
              <text x="0" y="0.8" textAnchor="left" fontSize="1" fill="none" strokeWidth=".02" stroke="#fff" fontFamily="GT Walsheim">event title</text>
            </svg>
          </div>*/}
          <div className="hidden lg:block">
            <div className="border-b-2 border-white"></div>
            <span>agency circulation event</span>
            <span className="border-none float-right">
              21.05.21 - 28.05.21
            </span>
          </div>
          <div className="lg:hidden bg-white border-t-2 absolute transform origin-bottom-left -rotate-90 translate-x-full bottom-0 left-0 w-full text-black py-4">
            <Marquee gradient={false} speed={1}>
              agency circulation event | 21.05.21 - 28.05.21
            </Marquee>
          </div>
        </div>
      </div>
      <div className="relative pb-4/5 lg:pb-1/3">
        <CustomPlaceholder
          className="absolute w-full h-full object-cover object-center"
          width={1340}
          height={700}
        />
      </div>
      <div className="relative pb-4/5 lg:pb-1/3">
        <CustomPlaceholder
          className="absolute w-full h-full object-cover object-center"
          width={740}
          height={1500}
        />
      </div>
    </Slider>
  );
}
