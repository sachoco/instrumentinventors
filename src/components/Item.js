import React, { useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
import normalizePosttype from "./utilities/normalizePosttype";
import Skeleton from "@mui/material/Skeleton";

export default function Item(props) {
	const { item, className } = props;
	let history = useHistory();

	const {
		title,
		image,
		subcategory,
		subcat_link,
		archive_base,
		link,
		tag,
		date,
		meta1,
		meta2,
	} = normalizePosttype(item);
 
	const onClickHandler = (link) => {
		history.push(link);
	}
	const itemBox = (
		<div  className="group overflow-hidden relative pb-64 border-2 border-black ">

		{/* <Link to={link} > */}
			<img
				src={image.medium}
				alt={title}
				className="absolute w-full h-full object-cover object-center"
			/>
			<div className="absolute flex items-end z-10 w-full px-5 py-2 bottom-0 border-t-2 border-black bg-white transition-all min-h-0 group-hover:min-h-full+2px">
				<div className="transition-all duration-200 absolute z-20 w-full top-8 left-0  px-5 my-2 opacity-0 delay-0 group-hover:delay-200 group-hover:opacity-100 ">
					<div className="mt-1 text-xl min-h-16 flex items-end"><span>{title}</span></div>
					<div className="border-t-2">{meta1}</div>
					<div className="border-t-2">{meta2}</div>
					<div className="border-t-2 border-b-2">
						{Array.isArray(tag)&&tag.length>0  ?
							tag.map((obj, i)=>(
								<span key={i}>
								{i > 0 && ", "}
								<Link to={"/" + archive_base + "/?t=" + obj.id}>
								{obj.name}
								</Link>
								</span>
							))
  							: tag
						}
					</div>
				</div>
				{/* <div className="transition-all group-hover:text-3xl overflow-hidden whitespace-pre">
					{title}
				</div>

				<div className="absolute bottom-0 right-0 px-5 py-2 transition-all min-w-0 group-hover:min-w-full">
					{date}
				</div>
				<div className="absolute bottom-0 right-0 px-5 py-2 z-20 transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
					<Link to={link}>more info</Link>
				</div> */}
				<div className="flex w-full">
					{/* <div className="flex-grow max-w-full overflow-hidden overflow-ellipsis whitespace-pre mr-2 mt-0 transition-all group-hover:absolute top-0 group-hover:whitespace-normal group-hover:delay-200 group-hover:mt-8">
						{title}
					</div> */}
					<div className="flex-grow max-w-full overflow-hidden overflow-ellipsis whitespace-pre mr-2 transition-all group-hover:max-w-0 group-hover:mr-0 duration-2000">
						{title}
					</div>
					<div className="group-hover:flex-grow whitespace-nowrap">
						{date}
					</div>
					<div className="absolute bottom-0 right-0 px-5 py-2 z-20 transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
					<Link to={link}>more info</Link>
					{/* <a href={link}>more info</a> */}
				</div> 
				</div>
			</div>
			<div className="absolute z-20 top-0 right-0 bg-white border-b-2 border-l-2 px-5 py-2">
				{typeof subcategory === "string" ? (
					subcategory
				) : (
					<>
						{subcategory.length > 0
							? subcategory?.map((cat, i) => (
								<span key={i}>
									{i > 0 && ", "}
									<Link to={"/" + archive_base + "/?c=" + cat.value}>
										{cat.label}
									</Link>
								</span>
								))
							: ""}
					</>
				)}
			</div>
			{/* <div className="transition-all duration-200 absolute z-20 w-full top-8 text-xl px-5 my-2 opacity-0 delay-0 group-hover:delay-200 group-hover:opacity-100 ">
				<div className="mt-1">{title}</div>
				<div className="border-t-2">{meta1}</div>
				<div className="border-t-2">{meta2}</div>
				<div className="border-t-2 border-b-2">{tag}</div>
			</div> */}
		{/* </Link> */}
		</div>
	);

	return (
		<div className={className}>
			{!item ||
			(Object.keys(item).length === 0 && item.constructor === Object) ? (
				<Skeleton variant="rectangular" sx={{ maxWidth: "none" }}>
					{itemBox}
				</Skeleton>
			) : (
				itemBox
			)}
		</div>
	);
}
