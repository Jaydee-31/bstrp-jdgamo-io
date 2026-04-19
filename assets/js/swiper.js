var servicesSwiper = new Swiper('.servicesSwiper', {
	loop: true,
	allowTouchMove: true,
	simulateTouch: true,
	grabCursor: true,
	slidesPerView: 1,
	spaceBetween: 10,
	pagination: {
		el: '.servicesSwiper .swiper-pagination',
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

var mySwiper = new Swiper('.mySwiper', {
	loop: true,
	allowTouchMove: true,
	simulateTouch: true,
	grabCursor: true,
	slidesPerView: 1,
	spaceBetween: 10,
	pagination: {
		el: '.mySwiper .swiper-pagination',
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
