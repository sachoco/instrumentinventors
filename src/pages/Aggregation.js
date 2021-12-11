import React, { useRef, useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";

import fetchFilteredData from "../components/rest-api/fetchFilteredData";

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
    posttype : posttype,
    pricat:cat,
    subcat:subcat,
    tags:tag
  });
 
  url += '&per_page=12&_fields=id,title,slug,formatted_date,acf,type,tags,wpml_translations,iii';
  let url2 = null;
  if(posttype=="artist"&&cat==""&&tag==""){
    url2 = url+"&past";
    url += "&current"; 
  }
  const [state, loadMore] = fetchFilteredData(url,false,true,filter,url2);
  const onFilterChange = (event) => {
    const { name, value } = event.target;

    // setFilter({...filter, [name]: value});

    
    const _filter = {...filter, [name]: value}

    let query = "?";
    if(_filter.pricat&&_filter.pricat!=""){query+='c='+_filter.pricat}
    if(_filter.subcat&&_filter.subcat!=""){query+='&sc='+_filter.subcat}
    if(_filter.tags&&_filter.tags!=""){query+='&t='+_filter.tags}

    history.push({
      search: query,
    });
    
  }
  const onCatChange = (event) => {
    const { name, value } = event.target;

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

  // useEffect(()=>{
  //   if (isInitialMount.current) {
  //      isInitialMount.current = false;
  //      metaCtx.setTranslation(false);
  //      console.log("isInitialMount")
  //   } else {
  //       // Your useEffect code here to be run on update
  //     console.log(filter)

  //     // let query = "?";
  //     // if(filter.pricat&&filter.pricat!=""){query+='c='+filter.pricat}
  //     // if(filter.subcat&&filter.subcat!=""){query+='&sc='+filter.subcat}
  //     // if(filter.tags&&filter.tags!=""){query+='&t='+filter.tags}

  //     // history.push({
  //     //   search: query,
  //     // });
  //   }

  // },[filter])

  useEffect(()=>{
    const abortController = new AbortController();
		let catTitle = "";
		if(posttype=="post"){
			catTitle = "news & media";
		}else{
			catTitle = posttype;
		}
		metaCtx.setTitle(catTitle+" Archive");


    if (isInitialMount.current) {
      isInitialMount.current = false;
      metaCtx.setTranslation(false);
      

    }else{
    
      setFilter({
        posttype : posttype,
        pricat:cat,
        subcat:subcat,
        tags:tag
      });

    }
    return () => {
			abortController.abort(); // cancel pending fetch request on component unmount
		};
  },[url,search])
  return (
    <>
      <Filter onCatChange={onCatChange} onFilterChange={onFilterChange} filter={filter} />

      <Block className="mt-16">
        {state.noItem ? (
          "NO ITEM TO SHOW"
        ) : viewCtx.mode == "tile" ? (
          <TileView items={state.items} posttype={posttype} />
        ) : (
          <ListView items={state.items} posttype={posttype} />
        )}
      </Block>
      {(state.hasMore||state.hasMoreUrl) && (
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
