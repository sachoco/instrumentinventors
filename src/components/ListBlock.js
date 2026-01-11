import React, { useEffect, useState, useRef } from "react";
import fetchData from "./rest-api/fetchData";

import fetchFilteredData from "./rest-api/fetchFilteredData";

import ListView from "./view/ListView";

const ListBlock = ({
  url = "wp/v2/posts/?_embed",
  url2 = null,
  posttype,
  ...otherProps
}) => {
  const [state, loadMore] = fetchData(url, false, true, null, url2);

  useEffect(() => {
    const abortController = new AbortController();

    return () => {
      abortController.abort(); // cancel pending fetch request on component unmount
    };
  }, [url]);
  return (
    <>
      {state.noItem ? (
        "NO ITEM TO SHOW"
      ) : (
        <ListView items={state.items} posttype={posttype} agendaview={true} />
      )}
    </>
  );
};

export default ListBlock;
