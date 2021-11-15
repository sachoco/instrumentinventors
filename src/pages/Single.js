import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import MetaContext from "../store/meta-context";

import fetchData from "../components/rest-api/fetchData";

import HeaderImage from "../components/HeaderImage";
import Carousel from "../components/Carousel";
import HorizontalSlider from "../components/HorizontalSlider";

import Block from "../components/layout/Block";
import Meta from "../components/layout/Meta";
import normalizePosttype from "../components/utilities/normalizePosttype";
import getTitle from "../components/utilities/getTitle";

const Single = ({ posttype = "posts", ...otherProps }) => {
  const metaCtx = useContext(MetaContext);
  const { slug } = useParams();
  const url = "wp/v2/" + posttype + "/?slug=" + slug + "&_embed";
  const related_url = "iii/related/" + posttype + "/" + slug +"/?";
  const [state, loadMore] = fetchData(url, true);
  const {title, content} = normalizePosttype(state.item);

  useEffect(()=>{
    metaCtx.setTitle(posttype);
  },[state])
  return (
    <>
      <Meta title={title} />

      {state.item ? <HeaderImage item={state.item} /> : ""}
      <div className="px-16 lg:px-24 pt-10">
        <button className="relative">
          <svg
            className="absolute"
            style={{ left: "-40px", top: "7px" }}
            width="28px"
            height="13px"
            viewBox="0 0 28 13"
          >
            <g
              id="Group"
              transform="translate(2.000000, 1.000000)"
              stroke="#000000"
              strokeWidth="2"
            >
              <line
                x1="25.977"
                y1="5.599"
                x2="0"
                y2="5.599"
                id="Line_130"
              ></line>
              <polyline
                id="Path_31324"
                points="5.601 0 0.000999999999 5.6 5.601 11.2"
              ></polyline>
            </g>
            ;
          </svg>
          back to {posttype}
        </button>
      </div>

      <Block className="single-item-content ">
        {content}

        <div className="max-w-3xl  font-bold lg:font-normal text-base lg:text-2xl"></div>
        <div className="mt-10 mx-auto max-w-3xl"></div>
      </Block>
      <Block title="related" bg={true}>
        <Carousel url={related_url} />
      </Block>
      <div className="px-24 pb-10 bg-bg-lighter-gray">
        <button className="relative">
          <svg
            className="absolute"
            style={{ left: "-40px", top: "7px" }}
            width="28px"
            height="13px"
            viewBox="0 0 28 13"
          >
            <g
              id="Group"
              transform="translate(2.000000, 1.000000)"
              stroke="#000000"
              strokeWidth="2"
            >
              <line
                x1="25.977"
                y1="5.599"
                x2="0"
                y2="5.599"
                id="Line_130"
              ></line>
              <polyline
                id="Path_31324"
                points="5.601 0 0.000999999999 5.6 5.601 11.2"
              ></polyline>
            </g>
            ;
          </svg>
          back to {posttype}
        </button>
      </div>
    </>
  );
};

export default Single;
