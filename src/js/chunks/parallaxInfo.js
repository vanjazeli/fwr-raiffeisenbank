import { gsap } from 'gsap';

const imageText = {
	modules: document.querySelectorAll('.js-parallax-info'),
	decorations: document.querySelectorAll('.js-parallax-info-decoration'),

	parallaxOne: document.querySelectorAll('.js-parallax-info-parallax-one'),
	parallaxTwo: document.querySelectorAll('.js-parallax-info-parallax-two'),
	parallaxThree: document.querySelectorAll('.js-parallax-info-parallax-three'),

	windowWidth: null,

	init: function () {
		this.decorationSettings();
		this.parallaxSettings();
		this.loadAndResize();
	},

	decorationSettings: function () {
		const showDecoration = (e) => {
			const decoration = e.target.querySelector('.js-parallax-info-decoration');
			gsap.killTweensOf(decoration);
			if (this.windowWidth > 992) {
				gsap
					.timeline()
					.add('height')
					.add(gsap.to(decoration, { height: '132px' }), 'height')
					.add('width')
					.add(gsap.to(decoration, { width: '32px' }), 'width');
			}
		};

		const hideDecoration = (e) => {
			const decoration = e.target.querySelector('.js-parallax-info-decoration');
			gsap.killTweensOf(decoration);
			if (this.windowWidth > 992) {
				gsap
					.timeline()
					.add('width')
					.add(gsap.to(decoration, { width: '2px' }), 'width')
					.add('height')
					.add(gsap.to(decoration, { height: '32px' }), 'height');
			}
		};

		this.modules.forEach((module) => {
			module.addEventListener('mouseenter', showDecoration);
			module.addEventListener('mouseleave', hideDecoration);
		});
	},

	parallaxSettings: function () {
		this.modules.forEach((module) => {
			module.addEventListener('mousemove', (e) => {
				if (this.windowWidth > 992) {
					const parallaxOne = module.querySelectorAll('.js-parallax-info-parallax-one');
					const parallaxTwo = module.querySelectorAll('.js-parallax-info-parallax-two');
					const parallaxThree = module.querySelectorAll('.js-parallax-info-parallax-three');

					const cursorXPositionPercentage = e.clientX / module.offsetWidth;
					const cursorYPositionPercentage = e.clientY / module.offsetHeight;

					const newXPositionOne = cursorXPositionPercentage * 30;
					const newYPositionOne = cursorYPositionPercentage * 30;
					gsap.to(parallaxOne, { x: newXPositionOne, y: newYPositionOne, duration: 0.4 });

					const newXPositionTwo = cursorXPositionPercentage * -20;
					const newYPositionTwo = cursorYPositionPercentage * -20;
					gsap.to(parallaxTwo, { x: newXPositionTwo, y: newYPositionTwo, duration: 0.4 });

					const newXPositionThree = cursorXPositionPercentage * -10;
					const newYPositionThree = cursorYPositionPercentage * 10;
					gsap.to(parallaxThree, { x: newXPositionThree, y: newYPositionThree, duration: 0.4 });
				}
			});
		});
	},

	loadAndResize: function () {
		const decorationResize = () => {
			this.windowWidth = window.innerWidth;
			if (this.widnowWidth > 992) {
				gsap.set(this.decorations, { width: '2px', height: '32px' });
			}
			if (this.windowWidth <= 992) {
				gsap.set(this.decorations, { height: '66px', width: '16px' });
				gsap.set(this.parallaxOne, { x: '', y: '' });
				gsap.set(this.parallaxTwo, { x: '', y: '' });
				gsap.set(this.parallaxThree, { x: '', y: '' });
			}
		};
		window.addEventListener('load', decorationResize);
		window.addEventListener('resize', decorationResize);
	},
};

export default imageText;
