import React, { useEffect, useState, useRef } from "react";
import fetchData from "./rest-api/fetchData";

import Item from "./Item";

export default function HorizontalSlider({
  url = "wp/v2/posts/?_embed",
  type = null,
  ...otherProps
}) {
  url +=
    "&_fields=id,title,slug,formatted_date,acf,type,tags,featured_media,_links,_embedded";

  const ref = useRef();

  const [state, loadMore] = fetchData(url);

  const [scrollPosition, setScrollPosition] = useState(0);
  const onScrollHandler = (e) => {
    // console.log(ref)
    if (state.hasMore && state.loaded) {
      const scrolWidth = ref.current.scrollWidth;
      const scrolPosition = ref.current.scrollLeft + ref.current.clientWidth;
      // console.log(scrolPosition/scrolWidth);
      if (scrolPosition / scrolWidth > 0.66) {
        console.log("loading more items");
        loadMore();
      }
    }
  };

  return (
    <>
      {state.noItem ? (
        "NO ITEM TO SHOW"
      ) : (
        <div className="relative -mx-24">
          {/* <div ref={ref}  className="flex overflow-x-scroll hide-scroll-bar " onScroll={onScrollHandler}> */}
          <div
            ref={ref}
            onScroll={onScrollHandler}
            className="flex flex-nowrap overflow-x-scroll hide-scroll-bar scroll-snap-x overscroll-x-none scroll-padding-x-24"
          >
            {state.items.length > 0
              ? state.items?.map((item, i) => (
                  <Item
                    key={i}
                    className="min-w-80 mr-6 scroll-align-start first:ml-24 last:mr-24"
                    item={item}
                  />
                ))
              : new Array(10)
                  .fill({})
                  .map((item, i) => (
                    <Item
                      key={i}
                      className="min-w-80 mr-6 scroll-align-start first:ml-24 last:mr-24"
                    />
                  ))}
          </div>
          {/* </div> */}
        </div>
      )}
    </>
  );
}
