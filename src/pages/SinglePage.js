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

// import "../assets/ultimate-blocks/src/blocks/content-toggle/front.build.js";
import "../assets/ultimate-blocks/dist/blocks.style.build.css";

// import "../assets/wp-includes/js/dist/vendor/wp-polyfill-inert.js";
// import "../assets/wp-includes/js/dist/vendor/regenerator-runtime.js";
// import "../assets/wp-includes/js/dist/vendor/wp-polyfill.js";
// import "../assets/wp-includes/js/dist/vendor/lodash.js";

// import "../assets/wp-includes/js/dist/dom-ready.js";
// import "../assets/wp-includes/js/dist/escape-html.js";
// import "../assets/wp-includes/js/dist/hooks.js";
// import "../assets/wp-includes/js/dist/i18n.js";

// import "../assets/jetpack/_inc/blocks/958.js";
// import "../assets/jetpack/_inc/blocks/swiper.css";
// import "../assets/jetpack/_inc/blocks/slideshow/view.js";
// import "../assets/jetpack/_inc/blocks/slideshow/view.css";

import "../assets/gutenslider/build/gutenslider-init.css";
import "../assets/gutenslider/build/gutenslider-init.js";

import "../assets/gutenslider/build/gutenslider-front.js";
// import "../assets/gutenslider/build/gutenslider-js.js";

// import "../assets/gutenslider/build/vendor/gs-swiper-base.css";

// import "../assets/gutenslider/build/vendor/gs-base.css";
// import "../assets/gutenslider/build/vendor/gs-base.js";

// import "../assets/gutenslider/build/vendor/gs-content-change.css";
// import "../assets/gutenslider/build/vendor/gs-content-change.js";

// import "../assets/gutenslider/build/vendor/gs-gs-swiper-navigation.css";
// import "../assets/gutenslider/build/vendor/gs-gs-swiper-navigation.js";

// import "../assets/gutenslider/build/vendor/gs-navigation.css";
// import "../assets/gutenslider/build/vendor/gs-navigation.js";

// import "../assets/gutenslider/build/vendor/gs-swiper-pagination.css";
// import "../assets/gutenslider/build/vendor/gs-swiper-pagination.js";

// import "../assets/gutenslider/build/vendor/gs-pagination.css";
// import "../assets/gutenslider/build/vendor/gs-pagination.js";



const SinglePage = ({ pages, ...otherProps }) => {
  const metaCtx = useContext(MetaContext);
  const location = useLocation();
  const { p1, p2 } = useParams();
  const slug = p2 ? p2 : p1;
  const path = p2 && p1 != "post" ? p1 + "/" + p2 : p1;
  // const state = fetchPage({path:path, loadedPages:pages});
  const state = fetchJson("/data/page/" + path);

  const { title, content, posttype } = normalizePosttype(state.item);
  useEffect(() => {
    const abortController = new AbortController();

    // BEGIN VC Carousel Hack
    jQuery('[data-ride="vc_carousel"]').each(function () {
      var $carousel = jQuery(this);
      $carousel.carousel($carousel.data());
    });
    // END VC Carousel Hack
    // window.lodash = _.noConflict();
    // wp.i18n.setLocaleData( { 'text direction\u0004ltr': [ 'ltr' ] } );
    // BEGIN Ultimate Block Hack
    function convertToPixels(amount, unit) {
      return unit === "%" ? (amount / 100) * window.innerWidth : amount;
    }

    function togglePanel(target) {
      var topPadding = 0;
      var topPaddingUnit = "";
      var bottomPadding = 0;
      var bottomPaddingUnit = "";
      var indicator = target.querySelector(
        ".wp-block-ub-content-toggle-accordion-state-indicator"
      );
      var panelContent = target.nextElementSibling;
      var toggleContainer = target.parentElement.parentElement;

      if (panelContent.classList.contains("ub-hide")) {
        var panelStyle = getComputedStyle(panelContent);
        var topUnitMatch = /[^\d.]/g.exec(panelStyle.paddingTop);
        var bottomUnitMatch = /[^\d.]/g.exec(panelStyle.paddingBottom);
        topPadding = Number(panelStyle.paddingTop.slice(0, topUnitMatch.index));
        topPaddingUnit = panelStyle.paddingTop.slice(topUnitMatch.index);
        bottomPadding = Number(
          panelStyle.paddingBottom.slice(0, bottomUnitMatch.index)
        );
        bottomPaddingUnit = panelStyle.paddingBottom.slice(
          bottomUnitMatch.index
        );
        panelContent.classList.remove("ub-hide");
        panelContent.classList.add("ub-hiding");

        if (
          "showonlyone" in toggleContainer.dataset &&
          toggleContainer.dataset.showonlyone
        ) {
          var siblingToggles = Array.prototype.slice
            .call(toggleContainer.children)
            .map(function (p) {
              return p.children[0];
            })
            .filter(function (p) {
              return p !== target;
            });
          siblingToggles.forEach(function (siblingToggle) {
            var siblingContent = siblingToggle.nextElementSibling;
            var siblingIndicator = siblingToggle.querySelector(
              ".wp-block-ub-content-toggle-accordion-state-indicator"
            );

            if (!siblingContent.classList.contains("ub-hide")) {
              if (siblingIndicator) siblingIndicator.classList.remove("open");
              siblingContent.classList.add("ub-toggle-transition");
              siblingContent.style.height = "".concat(
                siblingContent.scrollHeight,
                "px"
              );
              setTimeout(function () {
                siblingContent.classList.add("ub-hiding");
                siblingContent.style.height = "";
              }, 20);
            }
          });
        }
      } else {
        panelContent.style.height = getComputedStyle(panelContent).height;
      }

      panelContent.classList.add("ub-toggle-transition");
      if (indicator) indicator.classList.toggle("open");
      setTimeout(function () {
        //delay is needed for the animation to run properly
        if (panelContent.classList.contains("ub-hiding")) {
          var convertedTop = convertToPixels(topPadding, topPaddingUnit);
          var convertedBottom = convertToPixels(
            bottomPadding,
            bottomPaddingUnit
          );
          Object.assign(panelContent.style, {
            height: "".concat(
              panelContent.scrollHeight +
                convertedTop +
                convertedBottom -
                (topPaddingUnit === "%" || bottomPaddingUnit === "%"
                  ? panelContent.parentElement.scrollHeight
                  : 0),
              "px"
            ),
            paddingTop: "".concat(convertedTop, "px"),
            paddingBottom: "".concat(convertedBottom, "px"),
          });
          Array.prototype.slice
            .call(document.getElementsByClassName("ub_image_slider"))
            .forEach(function (slider) {
              var swiper = new Swiper(
                "#".concat(slider.id),
                JSON.parse(slider.dataset.swiperData)
              );
            });
          setTimeout(function () {
            window.dispatchEvent(new Event("resize"));
          }, 100);
        } else {
          panelContent.classList.add("ub-hiding");
          panelContent.style.height = "";
        }
      }, 20);
      Array.prototype.slice
        .call(panelContent.querySelectorAll(".wp-block-embed iframe"))
        .forEach(function (embeddedContent) {
          embeddedContent.style.removeProperty("width");
          embeddedContent.style.removeProperty("height");
        });
    }
    Array.prototype.slice
      .call(document.getElementsByClassName("wp-block-ub-content-toggle"))
      .forEach(function (toggleContainer) {
        var toggleHeads = Array.prototype.slice
          .call(toggleContainer.children)
          .map(function (toggle) {
            return toggle.children[0];
          })
          .filter(function (toggle) {
            return (
              toggle &&
              toggle.classList.contains(
                "wp-block-ub-content-toggle-accordion-title-wrap"
              )
            );
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

          while (
            !(parentIsHidden || parentClassIsHidden) &&
            targetElement.parentElement.tagName !== "BODY"
          ) {
            targetElement = targetElement.parentElement;

            if (targetElement.style.display === "none") {
              parentIsHidden = true;
            }

            if (getComputedStyle(targetElement).display === "none") {
              parentClassIsHidden = true;
            }
          }

          if (parentClassIsHidden || parentIsHidden) {
            toggleContainer.parentElement.style.setProperty(
              "display",
              "block", //make the parent block display to give way for height measurements
              "important" //just in case blocks from other plugins use !important
            );
          }

          Array.prototype.slice
            .call(toggleContainer.children)
            .map(function (p) {
              return p.children[0];
            })
            .filter(function (toggle) {
              return (
                toggle &&
                toggle.classList.contains(
                  "wp-block-ub-content-toggle-accordion-title-wrap"
                )
              );
            })
            .forEach(function (instance) {
              var panelContent = instance.nextElementSibling;
              instance.addEventListener("click", function (e) {
                e.stopImmediatePropagation();
                togglePanel(instance);
              });
              panelContent.addEventListener("transitionend", function () {
                panelContent.classList.remove("ub-toggle-transition");
                panelContent.previousElementSibling.setAttribute(
                  "aria-expanded",
                  panelContent.offsetHeight !== 0
                );

                if (panelContent.offsetHeight === 0) {
                  panelContent.classList.add("ub-hide");
                } else {
                  Object.assign(panelContent.style, {
                    height: "",
                    paddingTop: "",
                    paddingBottom: "",
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
    Array.prototype.slice
      .call(document.getElementsByClassName("wp-block-ub-content-toggle"))
      .forEach(function (toggleContainer) {
        if (
          window.innerWidth < 700 &&
          JSON.parse(toggleContainer.dataset.mobilecollapse)
        ) {
          Array.prototype.slice
            .call(toggleContainer.children)
            .forEach(function (child) {
              var panel = child.children[0].nextElementSibling;

              if (!panel.classList.contains("ub-hide")) {
                togglePanel(child.children[0]);
              }
            });
        }
      });
    // END Ultimate Block Hack

    metaCtx.setTranslation(
      location.pathname.includes("about", 1) ||
        location.pathname.includes("get-involved", 1)
    );
    let catTitle = "";
    if (posttype == "post") {
      catTitle = "news & media";
    } else {
      catTitle = "page";
    }
    metaCtx.setTitle(catTitle);
    return () => {
      abortController.abort(); // cancel pending fetch request on component unmount
    };
  }, [content, posttype]);

  return (
    <div>
      <Meta title={title} />
      {state.item ? (
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
      ) : (
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
      )}
    </div>
  );
};

export default SinglePage;
