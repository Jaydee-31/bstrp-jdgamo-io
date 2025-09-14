// Filter functionality
const filterButtons = document.querySelectorAll("#portfolio-flters li");
const galleryItems = document.querySelectorAll(".gallery img");

filterButtons.forEach((btn) => {
	btn.addEventListener("click", () => {
		filterButtons.forEach((b) => b.classList.remove("filter-active"));
		btn.classList.add("filter-active");

		const filter = btn.getAttribute("data-filter");
		galleryItems.forEach((item) => {
			if (filter === "*" || item.classList.contains(filter.substring(1))) {
				item.style.display = "block";
			} else {
				item.style.display = "none";
			}
		});
	});
});
