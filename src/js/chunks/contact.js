import { gsap } from 'gsap';

const contact = {
	modules: document.querySelectorAll('.js-contact'),
	decorations: document.querySelectorAll('.js-contact-decoration'),

	windowWidth: null,

	init: function () {
		this.decorationSettings();
		this.loadAndResize();
	},

	decorationSettings: function () {
		const showDecoration = (e) => {
			const decoration = e.target.querySelector('.js-contact-decoration');
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
			const decoration = e.target.querySelector('.js-contact-decoration');
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

	loadAndResize: function () {
		const decorationResize = () => {
			this.windowWidth = window.innerWidth;
			if (this.widnowWidth > 992) {
				gsap.set(this.decorations, { width: '2px', height: '32px' });
			}
			if (this.windowWidth <= 992) {
				gsap.set(this.decorations, { height: '66px', width: '16px' });
			}
		};
		window.addEventListener('load', decorationResize);
		window.addEventListener('resize', decorationResize);
	},
};

export default contact;
