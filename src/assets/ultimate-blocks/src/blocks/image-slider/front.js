Array.prototype.slice
	.call(document.getElementsByClassName("ub_image_slider"))
	.forEach((instance) => {
		// Find the swiper container - it might be the instance itself or a child .swiper-container
		const swiperContainer = instance.classList.contains("swiper-container")
			? instance
			: instance.querySelector(".swiper-container");

		if (!swiperContainer || !swiperContainer.dataset.swiperData) {
			return;
		}

		const swiper = new Swiper(
			swiperContainer.id ? `#${swiperContainer.id}` : swiperContainer,
			JSON.parse(swiperContainer.dataset.swiperData),
		);

		instance
			?.getElementsByClassName("swiper-button-next")[0]
			?.addEventListener("keydown", (e) => {
				if (e.key === " ") {
					e.preventDefault();
				}
			});

		instance
			?.getElementsByClassName("swiper-button-prev")[0]
			?.addEventListener("keydown", (e) => {
				if (e.key === " ") {
					e.preventDefault();
				}
			});

		Array.prototype.slice
			.call(instance.getElementsByClassName("swiper-pagination-bullet"))
			.forEach((bullet) => {
				bullet.addEventListener("keydown", (e) => {
					if (e.key === " ") {
						e.preventDefault();
					}
				});
			});
	});
