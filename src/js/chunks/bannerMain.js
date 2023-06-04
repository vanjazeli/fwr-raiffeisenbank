import { gsap } from 'gsap';

const bannerMain = {
	module: document.querySelector('.js-banner-main'),
	background: document.querySelector('.js-banner-background'),
	person: document.querySelector('.js-banner-person'),

	windowWidth: window.innerWidth,

	init: function () {
		this.settings();
		this.resize();
	},

	settings: function () {
		this.module.addEventListener('mousemove', (e) => {
			if (this.windowWidth > 992) {
				const cursorXPositionPercentage = e.clientX / this.module.offsetWidth;
				const newXPositionPerson = cursorXPositionPercentage * -20;
				const newXpositionBackground = cursorXPositionPercentage * 30;
				gsap.to(this.background, { x: newXpositionBackground, duration: 0.4 });
				gsap.to(this.person, { x: newXPositionPerson, duration: 0.4 });
			}
		});
	},

	resize: function () {
		window.addEventListener('resize', () => {
			this.windowWidth = window.innerWidth;
			if (window.innerWidth <= 992) {
				this.reset();
			}
		});
	},

	reset: function () {
		gsap.set(this.background, { x: 0 });
		gsap.set(this.person, { x: 0 });
	},
};

export default bannerMain;
