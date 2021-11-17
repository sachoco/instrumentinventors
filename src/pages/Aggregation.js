import React, { useRef, useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";

import fetchData from "../components/rest-api/fetchData";

import Block from "../components/layout/Block";
import TileView from "../components/view/TileView";
import ListView from "../components/view/ListView";
import Filter from "../components/Filter";

import ViewContext from "../store/view-context";
import MetaContext from "../store/meta-context";

const Aggregation = ({ url, posttype, ...otherProps }) => {
  const isInitialMount = useRef(true);
  const viewCtx = useContext(ViewContext);
  const metaCtx = useContext(MetaContext);

  let history = useHistory();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const cat = queryParams.get("c") ? queryParams.get("c") : "";
  const subcat = queryParams.get("sc") ? queryParams.get("sc") : "";
  const tag = queryParams.get("t") ? queryParams.get("t") : "";
  const [filter, setFilter] = useState({
    cat:cat,
    subcat:subcat,
    tags:tag
  });
  url += '&per_page=12&_fields=id,title,slug,formatted_date,acf,type,tags,wpml_translations,iii';
  const [state, loadMore] = fetchData(url,false,true,filter);
  const onFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  }
  const onCatChange = (event) => {
    const { name, value } = event.target;
    // console.log(value)
    setFilter({});

    if(value=="artist"){
      history.push("/artists/");
    }else if(value=="agenda"){
      history.push("/agenda/");
    }else if(value=="project"){
      history.push("/projects/");
    }else if(value=="posts"){
      history.push("/posts/");
    }

  }
  const initialFilter = {
    posttype : posttype,
    cat:cat,
    subcat:subcat,
    tags:tag
  }
  useEffect(()=>{
    if (isInitialMount.current) {
       isInitialMount.current = false;
    } else {
        // Your useEffect code here to be run on update
      let query = "?";
      if(filter.cat&&filter.cat!=""){query+='c='+filter.cat}
      if(filter.subcat&&filter.subcat!=""){query+='&sc='+filter.subcat}
      if(filter.tag&&filter.tag!=""){query+='&t='+filter.tag}

      history.push({
        search: query,
      });
    }

  },[filter])
  return (
    <>
      <Filter onCatChange={onCatChange} onFilterChange={onFilterChange} initialFilter={initialFilter} filter={filter} />

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
            className="inline-block bg-white hover:bg-black hover:text-white border-black border-2 text-black py-1 px-6 font-title disabled:opacity-50 disabled:cursor-wait disabled:bg-black disabled:text-white"
            type="button"
            onClick={loadMore}
            disabled={!state.loaded}
          >
          {state.loaded ? 'load more' : 'loading...' }
          </button>
        </p>
      )}
    </>
  );
};

export default Aggregation;
