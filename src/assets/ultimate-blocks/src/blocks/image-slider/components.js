import { useState, useEffect } from "react";

import SwiperCore, {
	Navigation,
	Pagination,
	Scrollbar,
	A11y,
	Thumbs,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Thumbs]);

export function Slider(props) {
	const [currentSwiper, initializeSwiper] = useState(null);

	const currentSlides = props.slides;
	const showNavigationOutside =
		props.useNavigation && props.navigationPosition === "outside";

	const customProps = {
		slidesPerView: props.slidesPerView,
		spaceBetween: props.spaceBetween,
		speed: props.speed,
		initialSlide: props.initialSlide,
		loop: props.wrapAround,
		simulateTouch: props.draggable,
		...(props.paginationType !== "none" && {
			pagination: { clickable: true, type: props.paginationType },
		}),
		...(props.autoplay > 0 && {
			autoplay: {
				delay: props.autoplay * 1000,
				disableOnInteraction: false,
			},
		}),
		...(props.showThumbnails &&
			props.thumbSwiper && {
				thumbs: { swiper: props.thumbSwiper },
			}),
		effect: props.transition,
	};

	const swiperElement = (
		<Swiper
			key={showNavigationOutside ? "outside" : "inside"}
			navigation={
				showNavigationOutside
					? {
							nextEl: ".ub-swiper-button-next",
							prevEl: ".ub-swiper-button-prev",
						}
					: props.useNavigation
			}
			{...customProps}
			onSlideChange={() => {
				if (currentSwiper) {
					//might break
					props.setActiveSlide(currentSwiper.realIndex);
				}
			}}
			onSwiper={(swiper) => {
				initializeSwiper(swiper);
			}} //might break
		>
			{currentSlides.map(
				(slide) => slide && <SwiperSlide>{slide}</SwiperSlide>,
			)}
		</Swiper>
	);

	// Always return consistent wrapper structure
	return (
		<div className={showNavigationOutside ? "ub-slider-wrapper" : ""}>
			{showNavigationOutside && (
				<div className="ub-swiper-button-prev swiper-button-prev"></div>
			)}
			{swiperElement}
			{showNavigationOutside && (
				<div className="ub-swiper-button-next swiper-button-next"></div>
			)}
		</div>
	);
}
