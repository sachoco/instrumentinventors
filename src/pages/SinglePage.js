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

import "../assets/vc/assets/css/js_composer.min.css";
import "../assets/vc/assets/js/dist/js_composer_front.min.js";
import "../assets/vc/assets/lib/vc_carousel/css/vc_carousel.min.css";
import "../assets/vc/assets/lib/vc_carousel/js/vc_carousel.min.js";
import "../assets/vc/assets/lib/vc_carousel/js/transition.min.js";

import "../assets/ultimate-blocks/src/blocks/content-toggle/front.build.js";
import "../assets/ultimate-blocks/dist/blocks.style.build.css";


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

    // BEGIN VC Carousel Hack
    jQuery('[data-ride="vc_carousel"]').each(function () {
      var $carousel = jQuery(this);
      $carousel.carousel($carousel.data());
    });
    // END VC Carousel Hack

    // BEGIN Ultimate Block Hack
    Array.prototype.slice.call(document.getElementsByClassName("wp-block-ub-content-toggle")).forEach(function (toggleContainer) {
      var toggleHeads = Array.prototype.slice.call(toggleContainer.children).map(function (toggle) {
        return toggle.children[0];
      }).filter(function (toggle) {
        return toggle && toggle.classList.contains("wp-block-ub-content-toggle-accordion-title-wrap");
      });
      toggleHeads.forEach(function (toggleHead, i) {
        toggleHead.addEventListener("keydown", function (e) {
          if (e.key === "ArrowUp" && i > 0) {
            e.preventDefault();
            toggleHeads[i - 1].focus();
          }
    
          if (e.key === "ArrowDown" && i < toggleHeads.length - 1) {
            e.preventDefault();
            toggleHeads[i + 1].focus();
          }
    
          if ([" ", "Enter"].indexOf(e.key) > -1) {
            e.preventDefault();
            togglePanel(toggleHead);
          }
    
          if (e.key === "Home" && i > 0) {
            e.preventDefault();
            toggleHeads[0].focus();
          }
    
          if (e.key === "End" && i < toggleHeads.length - 1) {
            e.preventDefault();
            toggleHeads[toggleHeads.length - 1].focus();
          }
        });
      });
    
      if (!toggleContainer.hasAttribute("data-preventcollapse")) {
        var parentIsHidden = false;
        var parentClassIsHidden = false;
        var targetElement = toggleContainer;
    
        while (!(parentIsHidden || parentClassIsHidden) && targetElement.parentElement.tagName !== "BODY") {
          targetElement = targetElement.parentElement;
    
          if (targetElement.style.display === "none") {
            parentIsHidden = true;
          }
    
          if (getComputedStyle(targetElement).display === "none") {
            parentClassIsHidden = true;
          }
        }
    
        if (parentClassIsHidden || parentIsHidden) {
          toggleContainer.parentElement.style.setProperty("display", "block", //make the parent block display to give way for height measurements
          "important" //just in case blocks from other plugins use !important
          );
        }
    
        Array.prototype.slice.call(toggleContainer.children).map(function (p) {
          return p.children[0];
        }).filter(function (toggle) {
          return toggle && toggle.classList.contains("wp-block-ub-content-toggle-accordion-title-wrap");
        }).forEach(function (instance) {
          var panelContent = instance.nextElementSibling;
          instance.addEventListener("click", function (e) {
            e.stopImmediatePropagation();
            togglePanel(instance);
          });
          panelContent.addEventListener("transitionend", function () {
            panelContent.classList.remove("ub-toggle-transition");
            panelContent.previousElementSibling.setAttribute("aria-expanded", panelContent.offsetHeight !== 0);
    
            if (panelContent.offsetHeight === 0) {
              panelContent.classList.add("ub-hide");
            } else {
              Object.assign(panelContent.style, {
                height: "",
                paddingTop: "",
                paddingBottom: ""
              });
            }
    
            panelContent.classList.remove("ub-hiding");
          });
          panelContent.removeAttribute("style");
        }); //hide the parent element again;
    
        if (parentIsHidden) {
          toggleContainer.parentElement.style.display = "none";
        }
    
        if (parentClassIsHidden) {
          toggleContainer.parentElement.style.display = "";
        }
      }
    });
    Array.prototype.slice.call(document.getElementsByClassName("wp-block-ub-content-toggle")).forEach(function (toggleContainer) {
      if (window.innerWidth < 700 && JSON.parse(toggleContainer.dataset.mobilecollapse)) {
        Array.prototype.slice.call(toggleContainer.children).forEach(function (child) {
          var panel = child.children[0].nextElementSibling;
  
          if (!panel.classList.contains("ub-hide")) {
            togglePanel(child.children[0]);
          }
        });
      }
    });
    // END Ultimate Block Hack

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
    <div >
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
