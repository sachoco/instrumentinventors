import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import fetchData from "../components/rest-api/fetchData";

import Block from "../components/layout/Block";
import TileView from "../components/view/TileView";
import MetaContext from "../store/meta-context";

const Search = ({ ...otherProps }) => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const searchStr = queryParams.get("q");
  const url="wp/v2/search/?per_page=24&subtype=post,artist,agenda,project&search="+searchStr;
  const [state, loadMore] = fetchData(url,false);
  
  const metaCtx = useContext(MetaContext);
  useEffect(()=>{
    metaCtx.setTranslation(false);
  },[])

  return (
    <>
      <Block className="mt-4">
        <h2 className="text-center mb-16">Search result for: {searchStr}</h2>
        {state.noItem ? "NO ITEM TO SHOW" : <TileView items={state.items} />}
      </Block>
      {state.hasMore && (
        <p className="mb-16 text-center">
          <button
            className="inline-block bg-white hover:bg-black hover:text-white border-black border-2 text-black py-1 px-6 font-title"
            type="button"
            onClick={loadMore}
          >
            load more
          </button>
        </p>
      )}
    </>
  );
};

export default Search;
