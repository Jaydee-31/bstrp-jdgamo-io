document.addEventListener("DOMContentLoaded", () => {
	const lazyImages = document.querySelectorAll("img.lazy");

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const img = entry.target;
				img.src = img.dataset.src;
				img.onload = () => img.classList.add("blur-loaded");
				observer.unobserve(img);
			}
		});
	});

	lazyImages.forEach((img) => observer.observe(img));
});
