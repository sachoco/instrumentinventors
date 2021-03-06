import React, { useEffect, useState, useRef } from "react";
import fetchData from "./rest-api/fetchData";
import Item from "./Item";

const HorizontalSlider = ({
  url = "wp/v2/posts/?_embed",
  url2 = null,
  type = null,
  related_item = false,
  onScroll = null,
  debug = false,
  toggleDisable = null,
  ...otherProps
}) => {
  if (!related_item) {
    url +=
      "&per_page=24&_fields=id,title,slug,date,formatted_date,acf,type,tags,wpml_translations,iii";
    if (url2) {
      url2 +=
        "&per_page=24&_fields=id,title,slug,date,formatted_date,acf,type,tags,wpml_translations,iii";
    }
  }

  const ref = useRef();

  const [state, loadMore] = fetchData(url, false, true, null, url2, debug);
  const [hover, setHover] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [canScrollPrev, setCanScrollPrev] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);

  const onScrollHandler = (e) => {
    // console.log(ref)

    const scrolWidth = ref.current.scrollWidth;
    const scrolPosition = ref.current.scrollLeft + ref.current.clientWidth;
    // console.log("scrolPosition: "+scrolPosition);
    // console.log("scrolWidth: "+scrolWidth);
    // console.log("clientWidth: "+ref.current.clientWidth);
    // console.log("scrollLeft: "+ref.current.scrollLeft);
    ref.current.scrollLeft == 0
      ? setCanScrollPrev(false)
      : setCanScrollPrev(true);
    scrolPosition == scrolWidth
      ? setCanScrollNext(false)
      : setCanScrollNext(true);

    if (state.hasMore && state.loaded) {
      if (scrolPosition / scrolWidth > 0.66) {
        // console.log("loading more items");
        loadMore();
      }
    }
    if (onScroll&&e) {
      let scrollValue = e.nativeEvent.srcElement.scrollLeft;
      onScroll(scrollValue);
    }
  };
  const onMouseEnterHandler = (e) => {
    setHover(true);
    // console.log("enter")
  };
  const onMouseLeaveHandler = (e) => {
    setHover(false);
    // console.log("leave")
  };
  const onArrowClickHandler = (direction) => {
    const scrolWidth = ref.current.scrollWidth;
    const scrolPosition = ref.current.scrollLeft + ref.current.clientWidth;
    const numItems = ref.current.childElementCount;
    // console.log(scrolWidth / numItems);
    if (direction == "next") {
      ref.current.scrollBy({
        left: "+" + ref.current.clientWidth,
        behavior: "smooth",
      });
    } else {
      ref.current.scrollBy({
        left: "-" + ref.current.clientWidth,
        behavior: "smooth",
      });
    }
  };
  if (url2 && state.itemTotal < 10) {
    loadMore();
  }
  useEffect(() => {
    if (state.items.length == 0 && state.noItem) {
      toggleDisable(true);
    } else {
      toggleDisable(false);
    }
    onScrollHandler();
  }, [state]);
  return (
    <div className="relative -mx-24">
      <div
        // className="relative -mx-24 group-parent"
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        <button
          onClick={(e) => onArrowClickHandler("prev")}
          className={`absolute flex justify-center items-center z-50 top-0 left-0 bg-white h-full w-20 bg-opacity-70 ${
            hover && canScrollPrev ? "flex" : "hidden"
          }`}
        >
          <svg
            className="transform scale-75"
            width="65px"
            height="29px"
            viewBox="0 0 65 29"
          >
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
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
        </button>
        <button
          onClick={(e) => onArrowClickHandler("next")}
          className={` absolute  justify-center items-center z-50 top-0 right-0 bg-white h-full w-20 bg-opacity-70 ${
            hover && canScrollNext ? "flex" : "hidden"
          }`}
        >
          <svg
            className="transform scale-75"
            width="65px"
            height="29px"
            viewBox="0 0 65 29"
          >
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
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
        </button>
        {/* <div
						ref={ref}
						onScroll={onScrollHandler}
						className="flex flex-nowrap overflow-x-scroll hide-scroll-bar scroll-snap-x overscroll-x-none scroll-padding-x-24"
					> */}
        <div
          ref={ref}
          onScroll={onScrollHandler}
          className="flex flex-nowrap px-24 overflow-x-scroll hide-scroll-bar overscroll-x-none scroll-padding-x-24 scrollbar-hide"
        >
          {state.items.length > 0
            ? state.items?.map((item, i) => (
                <Item
                  key={i}
                  className="min-w-full sm:min-w-80 mr-6 scroll-align-start"
                  item={item}
                  lazy={related_item}
                />
              ))
            : new Array(5)
                .fill({})
                .map((item, i) => (
                  <Item
                    key={i}
                    className="min-w-full sm:min-w-80 mr-6 scroll-align-start"
                  />
                ))}
          {!state.loaded && (
            <div className="h-64 min-w-full sm:min-w-80 mr-6">
              <div className="h-full flex flex-col justify-center items-center">
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                </div>
                <div className="mt-3 text-xs inline-block">loading...</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
// export default HorizontalSlider;

export default React.memo(HorizontalSlider);
