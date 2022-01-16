import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import MetaContext from "../store/meta-context";

import fetchPage from "../components/rest-api/fetchPage";
import fetchJson from "../components/rest-api/fetchJson";

import HeaderImage from "../components/HeaderImage";
import Carousel from "../components/Carousel";
import HorizontalSlider from "../components/HorizontalSlider";

import Block from "../components/layout/Block";
import Meta from "../components/layout/Meta";
import normalizePosttype from "../components/utilities/normalizePosttype";
import getTitle from "../components/utilities/getTitle";

// import "../assets/vc/assets/css/js_composer.min.css";
import "../assets/vc/assets/js/dist/js_composer_front.min.js";
import "../assets/vc/assets/lib/vc_carousel/css/vc_carousel.min.css";
import "../assets/vc/assets/lib/vc_carousel/js/vc_carousel.min.js";
import "../assets/vc/assets/lib/vc_carousel/js/transition.min.js";

const SinglePage = ({ pages, ...otherProps }) => {
  const metaCtx = useContext(MetaContext);
  const location = useLocation();
  const { p1, p2 } = useParams();
  const slug = p2 ? p2 : p1;
  const path = p2&&p1!="post" ? p1+"/"+p2 : p1; 
  // const state = fetchPage({path:path, loadedPages:pages});
  const state = fetchJson("/data/page/"+path);

  const { title, content, posttype } = normalizePosttype(state.item);
  useEffect(() => {
    const abortController = new AbortController();

    jQuery('[data-ride="vc_carousel"]').each(function () {
      var $carousel = jQuery(this);
      $carousel.carousel($carousel.data());
    });
    metaCtx.setTranslation(location.pathname.includes("about", 1)||location.pathname.includes("get-involved", 1));
    let catTitle = "";
    if(posttype=="post"){
      catTitle = "news & media";
    }else{
      catTitle = "page";
    }
    metaCtx.setTitle(catTitle);
    return () => {
			abortController.abort(); // cancel pending fetch request on component unmount
		};
  }, [content, posttype]);

  return (
    <div className="single-page">
      <Meta title={title} />
			{state.item ? 
				<>
        <Block className="single-item-content ">
          {content}

          <div className="max-w-3xl  font-bold lg:font-normal text-base lg:text-2xl"></div>
          <div className="mt-10 mx-auto max-w-3xl"></div>
        </Block>
        {/* {posttype && item &&
          <Block title="related" bg={true}>
            <HorizontalSlider url={"iii/related/" + posttype + "/" + path +"/?"} related_item={true} />
          </Block>
        } */}
        </>
				: 
				<>
					{!state.loaded && (
						<div className="h-64 min-w-64 sm:min-w-80 mr-6">
							<div className="h-full flex flex-col justify-center items-center">
								<div className="flex justify-center items-center">
									<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
								</div>
								<div className="mt-3 text-xs inline-block">loading...</div>
							</div>
						</div>
					)}
				</>
			}
    </div>
  );
};

export default SinglePage;
