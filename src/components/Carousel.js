import React from "react";
import fetchData from "./rest-api/fetchData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import Item from "./Item";

export default function Carousel({
  url = "wp/v2/posts/?_embed",
  type = null,
  ...otherProps
}) {
  const [state, loadMore] = fetchData(url);
  url = url + "&_fields=id,title,slug,formatted_date,acf,type,tags,featured_media,_links,_embedded";
  const settings = {
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
    afterChange: (index) => {
      console.log(index + "/" + state.items.length);
      if (index > state.items.length - 5) {
        loadMore();
      }
    },
  };
  return (
    <>
      {state.noItem ? (
        "NO ITEM TO SHOW"
      ) : (
        <Slider className="carousel" {...settings}>
          {state.items.length > 0
            ? state.items?.map((item, i) => <Item key={i} item={item} />)
            : new Array(10).fill({}).map((item, i) => <Item key={i} />)}
        </Slider>
      )}
    </>
  );
}
