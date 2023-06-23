/**
 * Porfolio isotope and filter
 */

(function () {
    "use strict";

    window.addEventListener("load", () => {
        let portfolioContainer = select(".resume-container");
        if (portfolioContainer) {
            let portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: ".resume-item",
            });

            let portfolioFilters = select("#resume-flters li", true);

            on(
                "click",
                "#resume-flters li",
                function (e) {
                    e.preventDefault();
                    portfolioFilters.forEach(function (el) {
                        el.classList.remove("filter-active");
                    });
                    this.classList.add("filter-active");

                    portfolioIsotope.arrange({
                        filter: this.getAttribute("data-filter"),
                    });
                    portfolioIsotope.on("arrangeComplete", function () {
                        AOS.refresh();
                    });
                },
                true
            );
        }
    });

    /**
     * Initiate resume lightbox
     */
    const portfolioLightbox = GLightbox({
        selector: ".resume-lightbox",
    });

    /**
     * Initiate resume details lightbox
     */
    const portfolioDetailsLightbox = GLightbox({
        selector: ".resume-details-lightbox",
        width: "90%",
        height: "90vh",
    });

    /**
     * Portfolio details slider
     */
    new Swiper(".resume-details-slider", {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true,
        },
    });
})();
