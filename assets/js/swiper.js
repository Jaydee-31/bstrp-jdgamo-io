var swiper = new Swiper(".mySwiper", {
	slidesPerView: 1,
	spaceBetween: 10,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	breakpoints: {
		// when window width is <= 768px (typical mobile screen size)
		768: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
	},
});
