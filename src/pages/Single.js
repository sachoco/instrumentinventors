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

const Single = ({ posttype = "posts", ...otherProps }) => {
	const metaCtx = useContext(MetaContext);
	const { slug } = useParams();

	const url = "wp/v2/" + posttype + "/?slug=" + slug + "&_embed";
	const related_url = "iii/related/" + posttype + "/" + slug +"/?";
	// const [state, loadMore] = fetchData(url, true);
	let pt = posttype;
	if(pt=='posts'){ pt = 'post'}; 
	
	const state = fetchJson("/data/"+pt+"/"+slug);

	const {title, content} = normalizePosttype(state.item);

	useEffect(()=>{
		let catTitle = "";
		if(posttype=="posts"){
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

			{state.item ? 
				<>
					<HeaderImage item={state.item} /> 
					<Block className="single-item-content ">
						{content}
						<div className="max-w-3xl  font-bold lg:font-normal text-base lg:text-2xl"></div>
						<div className="mt-10 mx-auto max-w-3xl"></div>
					</Block>

					<Block debug title="related" bg={true} carousel url={related_url} related_item={true} />
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
		</>
	);
};

export default Single;
