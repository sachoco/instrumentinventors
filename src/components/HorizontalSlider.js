import React, { useEffect, useState, useRef } from "react";
import fetchData from "./rest-api/fetchData";

import Item from "./Item";

export default function HorizontalSlider({
	url = "wp/v2/posts/?_embed",
	url2 = null,
	type = null,
	related_item = false,
	...otherProps
}) {
	if(!related_item){
		url += "&_fields=id,title,slug,formatted_date,acf,type,tags,wpml_translations,iii";
		if(url2){
			url2 += "&_fields=id,title,slug,formatted_date,acf,type,tags,wpml_translations,iii";
		} 
	}

	const ref = useRef();

		const [state, loadMore] = fetchData(url, false, true, null, url2);

	const [scrollPosition, setScrollPosition] = useState(0);

	const onScrollHandler = (e) => {
		// console.log(ref)
		if (state.hasMore && state.loaded) {
			const scrolWidth = ref.current.scrollWidth;
			const scrolPosition = ref.current.scrollLeft + ref.current.clientWidth;
			// console.log(scrolPosition/scrolWidth);
			if (scrolPosition / scrolWidth > 0.66) {
				console.log("loading more items");
				loadMore();
			}
		}
	};
	if(url2 && state.itemTotal<10){
		loadMore();
	}
	return (
		<>
			{state.items.length == 0 && state.noItem ? (
				"NO ITEM TO SHOW"
			) : (
				<div className="relative -mx-24">
					{/* <div
						ref={ref}
						onScroll={onScrollHandler}
						className="flex flex-nowrap overflow-x-scroll hide-scroll-bar scroll-snap-x overscroll-x-none scroll-padding-x-24"
					> */}
						<div
						ref={ref}
						onScroll={onScrollHandler}
						className="flex flex-nowrap px-24 overflow-x-scroll hide-scroll-bar overscroll-x-none scroll-padding-x-24"
					>
						{state.items.length > 0
							? state.items?.map((item, i) => (
								<Item
									key={i}
									className="min-w-80 mr-6 scroll-align-start"
									item={item}
								/>
								))
							: new Array(5)
								.fill({})
								.map((item, i) => (
									<Item
										key={i}
										className="min-w-80 mr-6 scroll-align-start"
									/>
								))}
									{!state.loaded && (
							<div className="h-64 min-w-80 mr-6">
								<div className="h-full flex flex-col justify-center items-center">
									<div className="flex justify-center items-center">
										<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
									</div>
									<div className="mt-3 text-xs inline-block">loading...</div>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}
