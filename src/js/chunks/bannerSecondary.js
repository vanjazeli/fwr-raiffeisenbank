import { gsap } from 'gsap';

const bannerSecondary = {
	modules: document.querySelectorAll('.js-banner-secondary'),
	hexagons: document.querySelectorAll('.js-banner-secondary-hexagon'),
	images: document.querySelectorAll('.js-banner-secondary-image'),

	windowWidth: null,

	init: function () {
		if (!this.modules) return;
		this.settings();
		this.loadAndResize();
	},

	settings: function () {
		this.modules.forEach((module) => {
			module.addEventListener('mousemove', (e) => {
				if (this.windowWidth > 992) {
					const parallaxOne = module.querySelectorAll('.js-banner-secondary-hexagon');
					const parallaxTwo = module.querySelectorAll('.js-banner-secondary-image');

					const cursorXPositionPercentage = e.clientX / module.offsetWidth;
					const cursorYPositionPercentage = e.clientY / module.offsetHeight;

					const newXPositionOne = cursorXPositionPercentage * 30;
					const newYPositionOne = cursorYPositionPercentage * 30;
					gsap.to(parallaxOne, { x: newXPositionOne, y: newYPositionOne, duration: 0.4 });

					const newXPositionTwo = cursorXPositionPercentage * -20;
					const newYPositionTwo = cursorYPositionPercentage * -20;
					gsap.to(parallaxTwo, { x: newXPositionTwo, y: newYPositionTwo, duration: 0.4 });
				}
			});
		});
	},

	loadAndResize: function () {
		const windowWidth = () => {
			this.windowWidth = window.innerWidth;
			if (this.windowWidth <= 992) {
				gsap.set(this.hexagons, { x: '', y: '' });
				gsap.set(this.images, { x: '', y: '' });
			}
		};
		window.addEventListener('load', windowWidth);
		window.addEventListener('resize', windowWidth);
	},
};

export default bannerSecondary;
