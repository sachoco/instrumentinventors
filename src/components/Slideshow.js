import React, { useEffect, useState } from "react";
import fetchData from "../components/rest-api/fetchData";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slideshow.css";
import Item from "./SlideItem";

export default function Slideshow({
  url = "wp/v2/agenda/?_embed&featured",
  ...otherProps
}) {
  url = url + "&_fields=id,title,slug,formatted_date,acf,type,tags,featured_media,_links,_embedded";
  const [state, loadMore] = fetchData(url, true);

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000
  };
  return (
    <Slider className="border-b-2" {...settings}>
      {state.items.length > 0
        ? state.items?.map((item, i) => <Item key={i} item={item} className="relative pb-4/5 lg:pb-1/3 w-full" />)
        : new Array(1).fill({}).map((item, i) => <Item key={i} className="relative pb-4/5 lg:pb-1/3 w-full" />)}
    </Slider>
  );
}
