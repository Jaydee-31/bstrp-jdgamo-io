// Filter functionality
const filterButtons = document.querySelectorAll("#portfolio-flters li");

function loadGallery() {
	const gallery = document.querySelector(".masonry");

	// Define your image groups with folder, prefix, count, and filter class
	const imageGroups = [
		{ path: "assets/img/portfolio/shirt/", prefix: "shirt", count: 14, filter: "filter-shirts" },
		{ path: "assets/img/portfolio/frames/", prefix: "frame", count: 10, filter: "filter-frames" },
		{ path: "assets/img/portfolio/logo/", prefix: "logo", count: 10, filter: "filter-logos" },
		{ path: "assets/img/portfolio/pubmats/", prefix: "pubmat", count: 19, filter: "filter-pubmats" },
		{ path: "assets/img/portfolio/manipulation/", prefix: "photo", count: 9, filter: "filter-photos" },
	];

	imageGroups.forEach((group) => {
		for (let i = 1; i <= group.count; i++) {
			const img = document.createElement("img");
			img.src = "assets/img/placeholder.jpg"; // placeholder first
			img.setAttribute("data-src", `${group.path}${group.prefix} (${i}).png`);
			img.className = `lazy blur img-fluid ${group.filter}`;
			img.alt = "";

			gallery.appendChild(img);
		}
	});
}

// Call function on page load
document.addEventListener("DOMContentLoaded", () => {
	loadGallery();
	//Lightbox
	const lb = document.getElementById("lightbox"),
		lbImg = document.getElementById("lightboxImg");
	document.querySelectorAll(".masonry img").forEach((img) => {
		img.onclick = () => {
			lbImg.src = img.src;
			lb.style.display = "flex";
		};
	});
	lb.onclick = () => (lb.style.display = "none");
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") lb.style.display = "none";
	});

	// Add filter event AFTER gallery is loaded
	const filterButtons = document.querySelectorAll("#portfolio-flters li");

	filterButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			filterButtons.forEach((b) => b.classList.remove("filter-active"));
			btn.classList.add("filter-active");

			const filter = btn.getAttribute("data-filter");
			const galleryItems = document.querySelectorAll(".masonry img"); // <-- re-query here

			galleryItems.forEach((item) => {
				if (filter === "*" || item.classList.contains(filter.substring(1))) {
					item.style.display = "block";
				} else {
					item.style.display = "none";
				}
			});
		});
	});
});
