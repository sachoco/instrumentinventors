import React, { useContext } from "react";
import fetchData from "../components/rest-api/fetchData";

import Block from "../components/layout/Block";
import TileView from "../components/view/TileView";
import ListView from "../components/view/ListView";
import Filter from "../components/Filter";

import ViewContext from "../store/view-context";

const Aggregation = ({ url, ...otherProps }) => {
  const viewCtx = useContext(ViewContext);

  const [state, loadMore] = fetchData(url,true);

  return (
    <>
      <Filter />

      <Block className="mt-16">
        {state.noItem ? (
          "NO ITEM TO SHOW"
        ) : viewCtx.mode == "tile" ? (
          <TileView items={state.items} />
        ) : (
          <ListView items={state.items} />
        )}
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

export default Aggregation;
