import React, { useState, useContext, useEffect, useCallback } from "react";
import ViewContext from "../store/view-context";
import SelectBox from "./formsUI/SelectBox";
// import MultiSelectBox from "./formsUI/MultiSelectBox";
import CatSelectBox from "./formsUI/CatSelectBox";
import TagSelectBox from "./formsUI/TagSelectBox";
import Switch from "./Switch";

// import filterData from "../data/filterData.json";
import fetchFilterItems from "./rest-api/fetchFilterItems";

const category = [
	{ value: "agenda", name: "Agenda" },
	{ value: "artist", name: "Artist" },
	{ value: "project", name: "Project" },
	{ value: "posts", name: "News & Media" },
];

export default function Filter({ initialFilter, filter, ...props }) {
	const viewCtx = useContext(ViewContext);
	const filterData = fetchFilterItems(initialFilter.posttype);
	const [showBox, setShowBox] = useState(false);
	const onClickHandler = (e) => {
		showBox ? setShowBox(false) : setShowBox(true);
	};
	const onModeChangeHandler = (bool) => {
		if (bool) {
			viewCtx.changeView("tile");
		} else {
			viewCtx.changeView("list");
		}
	};

	const [y, setY] = useState(window.scrollY);
	const [showFilter, setShowFilter] = useState(true);

	const onScrollHandler = useCallback(
		(e) => {
			const window = e.currentTarget;
			if (y > window.scrollY) {
				setShowFilter(true);
			} else if (y < window.scrollY) {
				if (!showBox) {
					setShowFilter(false);
				}
			}
			setY(window.scrollY);
		},
		[y, showBox]
	);

	const renderFilterItems = (str,p='cat') => {
		const array = str.toString().split(",");
		return array.map((item, i) => {
			if(initialFilter.posttype=="project"&&p=="subcat"){
				if(filterData.items.subcat){
					var result = filterData.items.subcat[filter.cat].find(obj => {
						return obj.value == item
					});
					return (<div key={i} className="rounded-full text-sm leading-6 py-0 px-2 m-1 border border-white lowercase">
						{result.name}
					</div>)
				}
			}else if(p!="posttype"&&filterData.items[p]){
				var result = filterData.items[p].find(obj => {
					return obj.value == item
				});
				return (<div key={i} className="rounded-full text-sm leading-6 py-0 px-2 m-1 border border-white lowercase">
					{result.name}
				</div>)
			}else {
				return (<div key={i} className="rounded-full text-sm leading-6 py-0 px-2 m-1 border border-white lowercase">
					{item}
				</div>)
			}
		})
	};
	useEffect(() => {
		setY(window.scrollY);
		window.addEventListener("scroll", onScrollHandler);

		return () => {
			window.removeEventListener("scroll", onScrollHandler);
		};
	}, [onScrollHandler]);

	return (
		<div className={props.className}>
			<div
				className={
					"fixed t-24 l-0 w-full lg:pr-24 z-40 transform transition " +
					(showFilter ? "" : "-translate-y-full")
				}
			>
				<div className="relative flex justify-between items-center bg-bg-filter border-b-2 text-white z-10">
					<div className="border-r-2 py-5 px-5 md:px-12 xl:px-24 font-nav flex-grow lg:flex-grow-0">
						filter
						<button onClick={onClickHandler}>
							<svg
								className={
									"inline-block ml-5 duration-100 transition-transform transform " +
									(showBox ? "-rotate-180" : "")
								}
								width="27px"
								height="27px"
								viewBox="0 0 27 27"
							>
								<g
									stroke="none"
									strokeWidth="1"
									fill="none"
									fillRule="evenodd"
									strokeLinecap="round"
									transform="translate(1.00000, 1.00000)"
								>
									<g stroke="#FFFFFF">
										<g transform="translate(12.500000, 12.500000) rotate(90.000000) translate(-12.500000, -12.500000) ">
											<line
												x1="6.274"
												y1="12.499"
												x2="18.723"
												y2="12.499"
												id="Line_126"
											></line>
											<polyline
												id="Path_31320"
												points="14.111 7.882 18.729 12.5 14.111 17.118"
											></polyline>
											<circle
												id="Ellipse_2581"
												cx="12.5"
												cy="12.5"
												r="12.5"
											></circle>
										</g>
									</g>
								</g>
							</svg>
						</button>
					</div>
					<div className="hidden lg:flex">
						{renderFilterItems(initialFilter.posttype,'posttype')}
						{filter?.cat && renderFilterItems(filter.cat,'cat')}
						{filter?.subcat && renderFilterItems(filter.subcat,'subcat')}
						{filter?.tags && renderFilterItems(filter.tags,'tag')}
					</div>
					<div className="lg:border-l-2 py-5 px-5 md:px-12 xl:px-24 font-nav flex items-center flex-grow lg:flex-grow-0">
						<span className="hidden lg:inline-block">view mode:</span>
						<span
							className={"mx-3 " + (viewCtx.mode == "tile" || "opacity-50")}
						>
							tile
						</span>
						<Switch
							className="inline-block"
							checked={viewCtx.mode == "list" ? true : false}
							onModeChange={onModeChangeHandler}
						/>
						<span
							className={"mx-3 " + (viewCtx.mode == "list" || "opacity-50")}
						>
							list
						</span>
					</div>
				</div>

				<div
					className={
						"relative w-full bg-bg-light-gray border-b-2 py-5 transition transform z-0 " +
						(showBox ? "" : "-translate-y-full")
					}
				>
					<div className="px-5 flex flex-col lg:flex-row justify-center lg:justify-start">
						<div className="w-full lg:w-1/4 mr-5 ">
							<label className="font-nav">category</label>

							<SelectBox
								label="Category"
								options={category}
								defaultValue={initialFilter.posttype}
								onChange={props.onCatChange}
								name="posttype"
							/>
						</div>
						<div className="w-full lg:w-1/4 mt-5 lg:mt-0 lg:mr-5 ">
							<label className="font-nav">subcategory 1</label>
							{filterData.items?.cat && (
								<>
									{initialFilter.posttype == "artist" ? (
										<TagSelectBox
											label="Subcategory1"
											options={filterData.items.cat}
											defaultValue={initialFilter.cat}
											onChange={props.onFilterChange}
											name="cat"
											filterVal={filter.cat}
										/>
									) : (
										<CatSelectBox
											label="Subcategory1"
											options={filterData.items.cat}
											defaultValue={initialFilter.cat}
											onChange={props.onFilterChange}
											name="cat"
											filterVal={filter.cat}
										/>
									)}
								</>
							)}
						</div>
						{filterData.items?.subcat && (
						<>
							{initialFilter.posttype == "project" ? (
								<>
									{filter.cat && filterData.items.subcat[filter.cat] && (
										<div className="w-full lg:w-1/4 mt-5 lg:mt-0 lg:mr-5 ">
										<label className="font-nav">subcategory 2</label>
										<TagSelectBox
											label="Subcategory2"
											options={filterData.items.subcat[filter.cat]}
											defaultValue={initialFilter.subcat}
											onChange={props.onFilterChange}
											name="subcat"
											filterVal={filter.subcat}
										/>
										</div>
									)}
								</>
							) : (
								<>
									<div className="w-full lg:w-1/4 mt-5 lg:mt-0 lg:mr-5 ">
									<label className="font-nav">subcategory 2</label>
										<TagSelectBox
											label="Subcategory2"
											options={filterData.items.subcat}
											defaultValue={initialFilter.subcat}
											onChange={props.onFilterChange}
											name="subcat"
											filterVal={filter.subcat}
										/>
									</div>

								</>
							)}
							</>
						)}
						<div className="w-full lg:w-1/4 mt-5 lg:mt-0 ">
							<label className="font-nav">tag</label>
							{filterData.items?.tag && (
								<TagSelectBox
									label="Tag"
									options={filterData.items.tag}
									defaultValue={initialFilter.tags}
									onChange={props.onFilterChange}
									name="tags"
									filterVal={filter.tags}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
