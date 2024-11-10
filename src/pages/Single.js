import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import MetaContext from "../store/meta-context";
import { useCookies } from "react-cookie";

import fetchData from "../components/rest-api/fetchData";
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
import "../assets/vc/assets/lib/flexslider/jquery.flexslider.min.js";
import "../assets/vc/assets/lib/flexslider/flexslider.min.css";
import "../assets/ultimate-blocks/dist/blocks.style.build.css";
import "../assets/gutenslider/build/gutenslider-init.css";


const Single = ({ posttype = "posts", ...otherProps }) => {
  const metaCtx = useContext(MetaContext);
  const { slug } = useParams();

  const url = "wp/v2/" + posttype + "/?slug=" + slug + "&_embed";
  const related_url = "iii/related/" + posttype + "/" + slug + "/?";
  // const [state, loadMore] = fetchData(url, true);
  let pt = posttype;
  if (pt == "posts") {
    pt = "post";
  }

  const state = fetchJson("/data/" + pt + "/" + slug);

  const { title, content } = normalizePosttype(state.item);

  useEffect(() => {
    // BEGIN VC Carousel Hack
    jQuery('[data-ride="vc_carousel"]').each(function () {
      var $carousel = jQuery(this);
      $carousel.carousel($carousel.data());
    });
    // END VC Carousel Hack

    
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

    // BEGIN Gutenslider Hack
    var e,
    t,
    n,
    r,
    o,
    i = {},
    a = {};
  function u(e) {
    var t = a[e];
    if (void 0 !== t) return t.exports;
    var n = (a[e] = { exports: {} });
    return i[e](n, n.exports, u), n.exports;
  }
  (u.m = i),
    (e = []),
    (u.O = function (t, n, r, o) {
      if (!n) {
        var i = 1 / 0;
        for (d = 0; d < e.length; d++) {
          (n = e[d][0]), (r = e[d][1]), (o = e[d][2]);
          for (var a = !0, s = 0; s < n.length; s++)
            (!1 & o || i >= o) &&
            Object.keys(u.O).every(function (e) {
              return u.O[e](n[s]);
            })
              ? n.splice(s--, 1)
              : ((a = !1), o < i && (i = o));
          if (a) {
            e.splice(d--, 1);
            var c = r();
            void 0 !== c && (t = c);
          }
        }
        return t;
      }
      o = o || 0;
      for (var d = e.length; d > 0 && e[d - 1][2] > o; d--) e[d] = e[d - 1];
      e[d] = [n, r, o];
    }),
    (u.F = {}),
    (u.E = function (e) {
      Object.keys(u.F).map(function (t) {
        u.F[t](e);
      });
    }),
    (n = Object.getPrototypeOf
      ? function (e) {
          return Object.getPrototypeOf(e);
        }
      : function (e) {
          return e.__proto__;
        }),
    (u.t = function (e, r) {
      if ((1 & r && (e = this(e)), 8 & r)) return e;
      if ("object" == typeof e && e) {
        if (4 & r && e.__esModule) return e;
        if (16 & r && "function" == typeof e.then) return e;
      }
      var o = Object.create(null);
      u.r(o);
      var i = {};
      t = t || [null, n({}), n([]), n(n)];
      for (var a = 2 & r && e; "object" == typeof a && !~t.indexOf(a); a = n(a))
        Object.getOwnPropertyNames(a).forEach(function (t) {
          i[t] = function () {
            return e[t];
          };
        });
      return (
        (i.default = function () {
          return e;
        }),
        u.d(o, i),
        o
      );
    }),
    (u.d = function (e, t) {
      for (var n in t)
        u.o(t, n) &&
          !u.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
    (u.f = {}),
    (u.e = function (e) {
      return Promise.all(
        Object.keys(u.f).reduce(function (t, n) {
          return u.f[n](e, t), t;
        }, [])
      );
    }),
    (u.u = function (e) {
      return (
        ({
          35: "gutenslider/build/vendor/gs-dividers",
          103: "gutenslider/build/vendor/gs-swiper-gl",
          123: "gutenslider/build/gutenslider-js",
          165: "gutenslider/build/vendor/gs-lightgallery-thumbnail",
          199: "gutenslider/build/gs-parallax",
          318: "gutenslider/build/vendor/gs-swiper-autoplay",
          394: "gutenslider/build/vendor/gs-swiper-base",
          434: "gutenslider/build/434",
          403: "gutenslider/build/vendor/gs-swiper-effect-fade",
          510: "gutenslider/build/vendor/gs-swiper-effect-cube",
          610: "gutenslider/build/vendor/gs-swiper-effect-cards",
          617: "gutenslider/build/vendor/gs-swiper-effect-flip",
          654: "gutenslider/build/vendor/gs-navigation",
          746: "gutenslider/build/vendor/gs-content-fixed",
          768: "gutenslider/build/vendor/gs-lightgallery-video",
          783: "gutenslider/build/vendor/gs-gs-swiper-navigation",
          788: "gutenslider/build/vendor/gs-pagination",
          817: "gutenslider/build/vendor/gs-lightgallery-base",
          834: "gutenslider/build/vendor/gs-content-change",
          843: "gutenslider/build/843",
          850: "gutenslider/build/vendor/gs-base",
          915: "gutenslider/build/vendor/gs-swiper-pagination",
          958: "gutenslider/build/958",
          979: "gutenslider/build/vendor/gs-lightgallery-zoom",
        }[e] || e) + ".js"
      );
    }),
    (u.miniCssF = function (e) {
      return (
        {
          35: "gutenslider/build/vendor/gs-dividers",
          165: "gutenslider/build/vendor/gs-lightgallery-thumbnail",
          394: "gutenslider/build/vendor/gs-swiper-base",
          403: "gutenslider/build/vendor/gs-swiper-effect-fade",
          510: "gutenslider/build/vendor/gs-swiper-effect-cube",
          610: "gutenslider/build/vendor/gs-swiper-effect-cards",
          617: "gutenslider/build/vendor/gs-swiper-effect-flip",
          654: "gutenslider/build/vendor/gs-navigation",
          746: "gutenslider/build/vendor/gs-content-fixed",
          768: "gutenslider/build/vendor/gs-lightgallery-video",
          783: "gutenslider/build/vendor/gs-gs-swiper-navigation",
          788: "gutenslider/build/vendor/gs-pagination",
          817: "gutenslider/build/vendor/gs-lightgallery-base",
          834: "gutenslider/build/vendor/gs-content-change",
          850: "gutenslider/build/vendor/gs-base",
          915: "gutenslider/build/vendor/gs-swiper-pagination",
          979: "gutenslider/build/vendor/gs-lightgallery-zoom",
        }[e] + ".css"
      );
    }),
    (u.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (u.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r = {}),
    (o = "gutenslider:"),
    (u.l = function (e, t, n, i) {
      if (r[e]) r[e].push(t);
      else {
        var a, s;
        if (void 0 !== n)
          for (
            var c = document.getElementsByTagName("script"), d = 0;
            d < c.length;
            d++
          ) {
            var f = c[d];
            if (
              f.getAttribute("src") == e ||
              f.getAttribute("data-webpack") == o + n
            ) {
              a = f;
              break;
            }
          }
        a ||
          ((s = !0),
          ((a = document.createElement("script")).charset = "utf-8"),
          (a.timeout = 120),
          u.nc && a.setAttribute("nonce", u.nc),
          a.setAttribute("data-webpack", o + n),
          (a.src = e)),
          (r[e] = [t]);
        var l = function (t, n) {
            (a.onerror = a.onload = null), clearTimeout(g);
            var o = r[e];
            if (
              (delete r[e],
              a.parentNode && a.parentNode.removeChild(a),
              o &&
                o.forEach(function (e) {
                  return e(n);
                }),
              t)
            )
              return t(n);
          },
          g = setTimeout(
            l.bind(null, void 0, { type: "timeout", target: a }),
            12e4
          );
        (a.onerror = l.bind(null, a.onerror)),
          (a.onload = l.bind(null, a.onload)),
          s && document.head.appendChild(a);
      }
    }),
    (u.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (function () {
      var e;
      u.g.importScripts && (e = u.g.location + "");
      var t = u.g.document;
      if (!e && t && (t.currentScript && (e = t.currentScript.src), !e)) {
        var n = t.getElementsByTagName("script");
        if (n.length) for (var r = n.length - 1; r > -1 && !e; ) e = n[r--].src;
      }
      if (!e)
        throw new Error(
          "Automatic publicPath is not supported in this browser"
        );
      (e = e
        .replace(/#.*$/, "")
        .replace(/\?.*$/, "")
        .replace(/\/[^\/]+$/, "/")),
        // (u.p = e);
        (u.p = "/wp-content/plugins/");

    })(),
    (function () {
      if ("undefined" != typeof document) {
        var e = { 889: 0 };
        u.f.miniCss = function (t, n) {
          e[t]
            ? n.push(e[t])
            : 0 !== e[t] &&
              {
                35: 1,
                165: 1,
                394: 1,
                403: 1,
                510: 1,
                610: 1,
                617: 1,
                654: 1,
                746: 1,
                768: 1,
                783: 1,
                788: 1,
                817: 1,
                834: 1,
                850: 1,
                915: 1,
                979: 1,
              }[t] &&
              n.push(
                (e[t] = (function (e) {
                  return new Promise(function (t, n) {
                    var r = u.miniCssF(e),
                      o = u.p + r;
                    if (
                      (function (e, t) {
                        for (
                          var n = document.getElementsByTagName("link"), r = 0;
                          r < n.length;
                          r++
                        ) {
                          var o =
                            (a = n[r]).getAttribute("data-href") ||
                            a.getAttribute("href");
                          if ("stylesheet" === a.rel && (o === e || o === t))
                            return a;
                        }
                        var i = document.getElementsByTagName("style");
                        for (r = 0; r < i.length; r++) {
                          var a;
                          if (
                            (o = (a = i[r]).getAttribute("data-href")) === e ||
                            o === t
                          )
                            return a;
                        }
                      })(r, o)
                    )
                      return t();
                    !(function (e, t, n, r, o) {
                      var i = document.createElement("link");
                      (i.rel = "stylesheet"),
                        (i.type = "text/css"),
                        (i.onerror = i.onload =
                          function (n) {
                            if (
                              ((i.onerror = i.onload = null), "load" === n.type)
                            )
                              r();
                            else {
                              var a =
                                  n && ("load" === n.type ? "missing" : n.type),
                                u = (n && n.target && n.target.href) || t,
                                s = new Error(
                                  "Loading CSS chunk " +
                                    e +
                                    " failed.\n(" +
                                    u +
                                    ")"
                                );
                              (s.code = "CSS_CHUNK_LOAD_FAILED"),
                                (s.type = a),
                                (s.request = u),
                                i.parentNode && i.parentNode.removeChild(i),
                                o(s);
                            }
                          }),
                        (i.href = t),
                        document.head.appendChild(i);
                    })(e, o, 0, t, n);
                  });
                })(t).then(
                  function () {
                    e[t] = 0;
                  },
                  function (n) {
                    throw (delete e[t], n);
                  }
                ))
              );
        };
      }
    })(),
    (function () {
      var e = { 889: 0 };
      (u.f.j = function (t, n) {
        var r = u.o(e, t) ? e[t] : void 0;
        if (0 !== r)
          if (r) n.push(r[2]);
          else if (394 != t) {
            var o = new Promise(function (n, o) {
              r = e[t] = [n, o];
            });
            n.push((r[2] = o));
            var i = u.p + u.u(t),
              a = new Error();
            u.l(
              i,
              function (n) {
                if (u.o(e, t) && (0 !== (r = e[t]) && (e[t] = void 0), r)) {
                  var o = n && ("load" === n.type ? "missing" : n.type),
                    i = n && n.target && n.target.src;
                  (a.message =
                    "Loading chunk " + t + " failed.\n(" + o + ": " + i + ")"),
                    (a.name = "ChunkLoadError"),
                    (a.type = o),
                    (a.request = i),
                    r[1](a);
                }
              },
              "chunk-" + t,
              t
            );
          } else e[t] = 0;
      }),
        (u.F.j = function (t) {
          if ((!u.o(e, t) || void 0 === e[t]) && 394 != t) {
            e[t] = null;
            var n = document.createElement("link");
            u.nc && n.setAttribute("nonce", u.nc),
              (n.rel = "prefetch"),
              (n.as = "script"),
              (n.href = u.p + u.u(t)),
              document.head.appendChild(n);
          }
        }),
        (u.O.j = function (t) {
          return 0 === e[t];
        });
      var t = function (t, n) {
          var r,
            o,
            i = n[0],
            a = n[1],
            s = n[2],
            c = 0;
          if (
            i.some(function (t) {
              return 0 !== e[t];
            })
          ) {
            for (r in a) u.o(a, r) && (u.m[r] = a[r]);
            if (s) var d = s(u);
          }
          for (t && t(n); c < i.length; c++)
            (o = i[c]), u.o(e, o) && e[o] && e[o][0](), (e[o] = 0);
          return u.O(d);
        },
        n = (self.webpackChunkgutenslider = self.webpackChunkgutenslider || []);
      n.forEach(t.bind(null, 0)), (n.push = t.bind(null, n.push.bind(n)));
    })(),
    u.O(
      0,
      [889],
      function () {
        u.E(123);
      },
      5
    );
  var s,
    c = {};
  (s = async function () {
    const { default: e } = await u.e(123).then(u.bind(u, 7513));
    [...document.querySelectorAll(".wp-block-eedee-block-gutenslider")].forEach(
      function (t) {
        t.gutenslider = new e(t);
      }
    );
  }),
    "undefined" != typeof document &&
      ("complete" !== document.readyState &&
      "interactive" !== document.readyState
        ? document.addEventListener("DOMContentLoaded", s)
        : s()),
    (c = u.O(c));
    // END Gutenslider Hack

    let catTitle = "";
    if (posttype == "posts") {
      catTitle = "news & media";
    } else {
      catTitle = posttype;
    }
    metaCtx.setTitle(catTitle);
    metaCtx.setTranslation(false);
    jQuery('[data-ride="vc_carousel"]').each(function () {
      var $carousel = jQuery(this);
      $carousel.carousel($carousel.data());
    });
    jQuery(".wpb_flexslider").each(function () {
      var this_element = jQuery(this),
        sliderTimeout = 1e3 * parseInt(this_element.attr("data-interval"), 10),
        sliderFx = this_element.attr("data-flex_fx"),
        slideshow = 0 == sliderTimeout ? !1 : !0;
      this_element.is(":visible") &&
        this_element.flexslider({
          animation: sliderFx,
          slideshow: slideshow,
          slideshowSpeed: sliderTimeout,
          sliderSpeed: 800,
          smoothHeight: !0,
        });
    });
  }, [state]);
  return (
    <div>
      <Meta title={title} />

      {state.item ? (
        <>
          <HeaderImage item={state.item} />
          {state.item.acf.shop_product_id &&
            state.item.acf.shop_product_id != "" &&
            state.item.acf.shop_product_id.length > 0 && (
              <Block 
                bg={true} 
                product_id={state.item.acf.shop_product_id}
                shop_item={true}
                item={state.item}              
              />
            )}
          <Block className="single-item-content ">
            {content}
            <div className="max-w-3xl  font-bold lg:font-normal text-base lg:text-2xl"></div>
            <div className="mt-10 mx-auto max-w-3xl"></div>
          </Block>
          {state.item.acf.related_posts &&
            state.item.acf.related_posts != "" &&
            state.item.acf.related_posts.length > 0 && (
              <Block
                debug
                title="related"
                bg={true}
                carousel
                url={related_url}
                related_item={true}
              />
            )}
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

export default Single;
