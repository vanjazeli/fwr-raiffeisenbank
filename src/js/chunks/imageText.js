import { gsap } from 'gsap';

const imageText = {
	decoration: document.querySelector('.js-image-text-decoration'),
	module: document.querySelector('.js-image-text'),
	decorationActive: false,

	windowWidth: null,

	init: function () {
		this.decorationSettings();
		this.loadAndResize();
	},

	decorationSettings: function () {
		this.module.addEventListener('mouseenter', () => {
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
		});

		this.module.addEventListener('mouseleave', () => {
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
		});
	},

	loadAndResize: function () {
		const decorationResize = () => {
			this.windowWidth = window.innerWidth;
			if (this.windowWidth > 992 && !this.decorationActive) {
				gsap.set(this.decoration, { width: '2px', height: '32px' });
			}
			if (this.windowWidth > 992 && this.decorationActive) {
				gsap.set(this.decoration, { width: '32px', height: '132px' });
			}
			if (this.windowWidth <= 992 && !this.decorationActive) {
				gsap.set(this.decoration, { width: '2px', height: '16px' });
			}
			if (this.windowWidth <= 992 && this.decorationActive) {
				gsap.set(this.decoration, { width: '16px', height: '66px' });
			}
		};
		window.addEventListener('load', decorationResize);
		window.addEventListener('resize', decorationResize);
	},
};

export default imageText;
