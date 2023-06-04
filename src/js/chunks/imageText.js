import { gsap } from 'gsap';

const imageText = {
	decoration: document.querySelector('.js-image-text-decoration'),
	module: document.querySelector('.js-image-text'),
	decorationActive: false,

	parallaxOne: document.querySelectorAll('.js-image-text-parallax-one'),
	parallaxTwo: document.querySelectorAll('.js-image-text-parallax-two'),
	parallaxThree: document.querySelectorAll('.js-image-text-parallax-three'),

	windowWidth: null,

	init: function () {
		this.decorationSettings();
		this.loadAndResize();
		this.parallax();
	},

	decorationSettings: function () {
		const openDecoration = () => {
			this.decorationActive = true;
			gsap.killTweensOf(this.decoration);
			if (this.windowWidth > 992) {
				gsap
					.timeline()
					.add('height')
					.add(gsap.to(this.decoration, { height: '132px' }), 'height')
					.add('width')
					.add(gsap.to(this.decoration, { width: '32px' }), 'width');
			} else {
				gsap
					.timeline()
					.add('height')
					.add(gsap.to(this.decoration, { height: '66px' }), 'height')
					.add('width')
					.add(gsap.to(this.decoration, { width: '16px' }), 'width');
			}
		};

		const closeDecoration = () => {
			this.decorationActive = false;
			gsap.killTweensOf(this.decoration);
			if (this.windowWidth > 992) {
				gsap
					.timeline()
					.add('width')
					.add(gsap.to(this.decoration, { width: '2px' }), 'width')
					.add('height')
					.add(gsap.to(this.decoration, { height: '32px' }), 'height');
			} else {
				gsap
					.timeline()
					.add('width')
					.add(gsap.to(this.decoration, { width: '2px' }), 'width')
					.add('height')
					.add(gsap.to(this.decoration, { height: '16px' }), 'height');
			}
		};

		this.module.addEventListener('mouseenter', openDecoration);
		this.module.addEventListener('mouseleave', closeDecoration);
	},

	loadAndResize: function () {
		const decorationResize = () => {
			this.windowWidth = window.innerWidth;
			if (this.windowWidth > 992) {
				this.decorationActive = false;
				gsap.set(this.decoration, { width: '2px', height: '32px' });
			}
			if (this.windowWidth <= 992) {
				this.decorationActive = true;
				gsap.set(this.decoration, { width: '16px', height: '66px' });
				gsap.set(this.parallaxOne, { x: '', y: '' });
				gsap.set(this.parallaxTwo, { x: '', y: '' });
				gsap.set(this.parallaxThree, { x: '', y: '' });
			}
		};
		window.addEventListener('load', decorationResize);
		window.addEventListener('resize', decorationResize);
	},

	parallax: function () {
		this.module.addEventListener('mousemove', (e) => {
			if (this.windowWidth > 992) {
				const cursorXPositionPercentage = e.clientX / this.module.offsetWidth;
				const cursorYPositionPercentage = e.clientY / this.module.offsetHeight;

				const newXPositionOne = cursorXPositionPercentage * 30;
				const newYPositionOne = cursorYPositionPercentage * 30;
				gsap.to(this.parallaxOne, { x: newXPositionOne, y: newYPositionOne, duration: 0.4 });

				const newXPositionTwo = cursorXPositionPercentage * -20;
				const newYPositionTwo = cursorYPositionPercentage * -20;
				gsap.to(this.parallaxTwo, { x: newXPositionTwo, y: newYPositionTwo, duration: 0.4 });

				const newXPositionThree = cursorXPositionPercentage * -10;
				const newYPositionThree = cursorYPositionPercentage * 10;
				gsap.to(this.parallaxThree, { x: newXPositionThree, y: newYPositionThree, duration: 0.4 });
			}
		});
	},
};

export default imageText;
