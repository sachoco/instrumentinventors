import React, { useContext, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import MetaContext from "../store/meta-context";

import fetchData from "../components/rest-api/fetchData";

import Carousel from "../components/Carousel";
import HorizontalSlider from "../components/HorizontalSlider";

import Block from "../components/layout/Block";
import Meta from "../components/layout/Meta";
import normalizePosttype from "../components/utilities/normalizePosttype";
import getTitle from "../components/utilities/getTitle";

import "../assets/vc/assets/css/js_composer.min.css";
import "../assets/vc/assets/js/dist/js_composer_front.min.js";
import "../assets/vc/assets/lib/vc_carousel/css/vc_carousel.min.css";
import "../assets/vc/assets/lib/vc_carousel/js/vc_carousel.min.js";
import "../assets/vc/assets/lib/vc_carousel/js/transition.min.js";

const SinglePostPage = ({ ...otherProps }) => {
  const metaCtx = useContext(MetaContext);
  const location = useLocation();
  const { p1, p2 } = useParams();
  const slug = p2 ? p2 : p1;
  const path = p2&&p1!="post" ? p1+"/"+p2 : p2; 
  const url = "wp/v2/posts/?slug=" + slug + "&include_page&_embed";

  const [state, loadMore] = fetchData(url, true);
  const { title, content, posttype } = normalizePosttype(state.item);
  useEffect(() => {
      jQuery('[data-ride="vc_carousel"]').each(function () {
        var $carousel = jQuery(this);
        $carousel.carousel($carousel.data());
      });
      metaCtx.setTranslation(location.pathname.includes("about", 1));
      let catTitle = "";
      if(posttype=="post"){
        catTitle = "news & media";
      }else{
        catTitle = "page";
      }
      metaCtx.setTitle(catTitle);
    return () => {};
  }, [content, posttype]);

  return (
    <>
      <Meta title={title} />
      <Block className="single-item-content ">
        {content}

        <div className="max-w-3xl  font-bold lg:font-normal text-base lg:text-2xl"></div>
        <div className="mt-10 mx-auto max-w-3xl"></div>
      </Block>
      {posttype &&
        <Block title="related" bg={true}>
          <Carousel url={"iii/related/" + posttype + "/" + path +"/?"} />
        </Block>
      }

    </>
  );
};

export default SinglePostPage;
