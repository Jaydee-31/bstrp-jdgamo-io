/**
 * Hero dot matrix.
 *
 * Draws the dot grid that used to be a tiled CSS gradient on #hero:before.
 * A background image can only pan as a whole, so a per-dot wave needs a
 * canvas. Grid geometry and colour still live in CSS (--dot-gap, --dot-size,
 * --dot-color on #hero) and are read back from the computed style, so the
 * light/dark themes and any tuning stay in the stylesheet.
 */
(function () {
	"use strict";

	const hero = document.querySelector("#hero");
	const canvas = document.querySelector(".hero-dots");
	if (!hero || !canvas || !canvas.getContext) {
		return;
	}

	const ctx = canvas.getContext("2d");
	const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

	/* Wave shape. The two frequencies are deliberately unequal so the crests
	   run diagonally instead of marching in straight rows. */
	const FREQ_X = 0.013;
	const FREQ_Y = 0.009;
	const SPEED = 0.0011; /* radians per ms */
	const AMPLITUDE = 0.34; /* share of --dot-gap a dot may travel */
	const ALPHA_FLOOR = 0.35; /* dimmest a dot gets at the wave's trough */

	/* One fill per bucket instead of one per dot: at a 22px gap a 1080p hero
	   holds ~4000 dots, and 4000 fill calls a frame is where this gets slow. */
	const ALPHA_BUCKETS = 7;

	let dotGap = 22;
	let dotRadius = 1.5;
	let dotColor = "#bdbbb2";
	let cols = 0;
	let rows = 0;
	let originX = 0;
	let originY = 0;
	let width = 0;
	let height = 0;
	let frame = null;
	let running = false;
	let inView = true;

	function readStyle() {
		const cs = getComputedStyle(hero);
		const gap = parseFloat(cs.getPropertyValue("--dot-gap"));
		const size = parseFloat(cs.getPropertyValue("--dot-size"));
		const color = cs.getPropertyValue("--dot-color").trim();

		if (!isNaN(gap) && gap > 0) dotGap = gap;
		if (!isNaN(size) && size > 0) dotRadius = size;
		if (color) dotColor = color;
	}

	function resize() {
		const rect = hero.getBoundingClientRect();
		const dpr = Math.min(window.devicePixelRatio || 1, 2);

		width = Math.ceil(rect.width);
		height = Math.ceil(rect.height);

		canvas.width = Math.ceil(width * dpr);
		canvas.height = Math.ceil(height * dpr);
		canvas.style.width = width + "px";
		canvas.style.height = height + "px";
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

		/* Overdraw one row/column past each edge so dots do not pop in and out
		   as the wave carries them across the boundary. */
		cols = Math.ceil(width / dotGap) + 2;
		rows = Math.ceil(height / dotGap) + 2;

		/* Centre the grid so it stays symmetrical under the portrait. */
		originX = (width - (cols - 1) * dotGap) / 2;
		originY = (height - (rows - 1) * dotGap) / 2;
	}

	function draw(time) {
		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = dotColor;

		const travel = dotGap * AMPLITUDE;
		const phase = time * SPEED;
		const buckets = [];
		for (let b = 0; b < ALPHA_BUCKETS; b++) {
			buckets.push([]);
		}

		for (let row = 0; row < rows; row++) {
			const y = originY + row * dotGap;
			for (let col = 0; col < cols; col++) {
				const x = originX + col * dotGap;
				const wave = Math.sin(x * FREQ_X + y * FREQ_Y + phase);

				/* wave is -1..1; map to 0..1 once and reuse for both the
				   displacement and the brightness so crests read as lit. */
				const lit = (wave + 1) / 2;
				const index = Math.min(ALPHA_BUCKETS - 1, (lit * ALPHA_BUCKETS) | 0);
				buckets[index].push(x, y + wave * travel);
			}
		}

		for (let b = 0; b < ALPHA_BUCKETS; b++) {
			const points = buckets[b];
			if (!points.length) continue;

			ctx.globalAlpha = ALPHA_FLOOR + (1 - ALPHA_FLOOR) * (b / (ALPHA_BUCKETS - 1));
			ctx.beginPath();
			for (let i = 0; i < points.length; i += 2) {
				ctx.moveTo(points[i] + dotRadius, points[i + 1]);
				ctx.arc(points[i], points[i + 1], dotRadius, 0, Math.PI * 2);
			}
			ctx.fill();
		}

		ctx.globalAlpha = 1;
	}

	function loop(time) {
		draw(time);
		frame = requestAnimationFrame(loop);
	}

	function start() {
		if (running || reduceMotion.matches || !inView || document.hidden) return;
		running = true;
		frame = requestAnimationFrame(loop);
	}

	function stop() {
		running = false;
		if (frame !== null) {
			cancelAnimationFrame(frame);
			frame = null;
		}
	}

	function rebuild() {
		readStyle();
		resize();
		if (!running) draw(performance.now());
	}

	rebuild();

	if (reduceMotion.matches) {
		draw(0);
	} else {
		start();
	}

	/* Stop the loop whenever the hero is not on screen. */
	if ("IntersectionObserver" in window) {
		new IntersectionObserver(
			(entries) => {
				inView = entries[0].isIntersecting;
				inView ? start() : stop();
			},
			{ threshold: 0 }
		).observe(hero);
	}

	document.addEventListener("visibilitychange", () => {
		document.hidden ? stop() : start();
	});

	let resizeTimer = null;
	window.addEventListener("resize", () => {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(rebuild, 150);
	});

	/* The theme switch rewrites body's class, which changes --dot-color. */
	const lightSwitch = document.getElementById("lightSwitch");
	if (lightSwitch) {
		lightSwitch.addEventListener("change", () => {
			/* Let the class swap land before reading the new computed value. */
			requestAnimationFrame(rebuild);
		});
	}

	reduceMotion.addEventListener("change", () => {
		if (reduceMotion.matches) {
			stop();
			draw(0);
		} else {
			start();
		}
	});
})();
