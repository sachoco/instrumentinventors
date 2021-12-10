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

import "../assets/vc/assets/css/js_composer.min.css";
import "../assets/vc/assets/js/dist/js_composer_front.min.js";
import "../assets/vc/assets/lib/vc_carousel/css/vc_carousel.min.css";
import "../assets/vc/assets/lib/vc_carousel/js/vc_carousel.min.js";
import "../assets/vc/assets/lib/vc_carousel/js/transition.min.js";
import "../assets/vc/assets/lib/flexslider/jquery.flexslider.min.js";
import "../assets/vc/assets/lib/flexslider/flexslider.min.css";

const Single = ({ posttype = "posts", ...otherProps }) => {
	const metaCtx = useContext(MetaContext);
	const { slug } = useParams();
	const url = "wp/v2/" + posttype + "/?slug=" + slug + "&_embed";
	const related_url = "iii/related/" + posttype + "/" + slug +"/?";
	const [state, loadMore] = fetchData(url, true);
	const {title, content} = normalizePosttype(state.item);

	useEffect(()=>{
		let catTitle = "";
		if(posttype=="post"){
			catTitle = "news & media";
		}else{
			catTitle = posttype;
		}
		metaCtx.setTitle(catTitle);
		metaCtx.setTranslation(false);
		jQuery('[data-ride="vc_carousel"]').each(function () {
			var $carousel = jQuery(this);
			$carousel.carousel($carousel.data());
		});
		jQuery(".wpb_flexslider").each(function(){
			var this_element=jQuery(this), 
				sliderTimeout=1e3*parseInt(this_element.attr("data-interval"),10),
				sliderFx=this_element.attr("data-flex_fx"),
				slideshow=0==sliderTimeout?!1:!0;
			this_element.is(":visible")&&this_element.flexslider({
				animation:sliderFx,
				slideshow:slideshow,
				slideshowSpeed:sliderTimeout,
				sliderSpeed:800,
				smoothHeight:!0
			})
		})
	},[state])
	return (
		<>
			<Meta title={title} />

			{state.item ? <HeaderImage item={state.item} /> : ""}
			{/* <div className="px-16 lg:px-24 pt-10">
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
			</div> */}

			<Block className="single-item-content ">
				{content}

				<div className="max-w-3xl  font-bold lg:font-normal text-base lg:text-2xl"></div>
				<div className="mt-10 mx-auto max-w-3xl"></div>
			</Block>
			{state.item &&
			<Block title="related" bg={true}>
				<HorizontalSlider url={related_url} related_item={true} />
			</Block>
			}
			{/* <div className="px-24 pb-10 bg-bg-lighter-gray">
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
			</div> */}
		</>
	);
};

export default Single;
