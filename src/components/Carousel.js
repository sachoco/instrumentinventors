import React from "react";
import Slider from "react-slick";
import { CustomPlaceholder } from "react-placeholder-image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import Item from "./Item";

export default function Carousel() {
  var settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <Slider className="carousel" {...settings}>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </Slider>
  );
}
