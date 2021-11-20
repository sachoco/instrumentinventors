import React, { useState } from "react";
import fetchData from "./rest-api/fetchData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import Item from "./Item";

export default function Carousel({
  url = "wp/v2/posts/?",
  url2 = null,
  type = null,
  related_item = false,
  ...otherProps
}) {
  if(!related_item){
    url += "&_fields=id,title,slug,formatted_date,acf,type,tags,wpml_translations,iii";
    if(url2){
      url2 += "&_fields=id,title,slug,formatted_date,acf,type,tags,wpml_translations,iii";
    } 
  }
  const [hover, setHover] = useState(false);
  const [state, loadMore] = fetchData(url, false, true, null, url2);

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1780,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    afterChange: (index) => {
      console.log(index + "/" + state.items.length);
      if (index > state.items.length - 5) {
        loadMore();
      }
    },
    prevArrow: <SliderArrow to="left" />,
    nextArrow: <SliderArrow to="right" />,
  };
  const onMouseEnterHandler = (e) => {
    setHover(true);
  };
  const onMouseLeaveHandler = (e) => {
    setHover(false);
  };
  if(url2 && state.itemTotal<10){
    loadMore();
  }
  return (
    <>
      {state.items.length == 0 && state.noItem ? (
        "NO ITEM TO SHOW"
      ) : (
        <div
          className={`carousel-wrapper ${hover ? "focused" : ""}`}
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
        >
          <Slider className={`carousel cursor-grabbing`} {...settings}>
            {state.items.length > 0
              ? state.items?.map((item, i) => <Item key={i} item={item} />)
              : new Array(10).fill({}).map((item, i) => <Item key={i} />)}
            {!state.loaded && (
              <div className="h-64 ">
                <div className="h-full flex flex-col justify-center items-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                  </div>
                  <div className="mt-3 text-xs inline-block">loading...</div>
                </div>
              </div>
            )}
          </Slider>
        </div>
      )}
    </>
  );
}

const SliderArrow = ({ className, to, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-black before:text-black button button--text button--icon h-full z-50 w-24 top-0 text-center  ${className}`}
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
