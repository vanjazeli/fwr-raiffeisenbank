import { gsap } from 'gsap';
import helpers from './helpers';

const modalCards = {
	modules: document.querySelectorAll('.js-modal-cards'),
	decorations: document.querySelectorAll('.js-modal-cards-decoration'),

	buttonsOpen: document.querySelectorAll('.js-modal-cards-button'),
	buttonsClose: document.querySelectorAll('.js-modal-cards-modal-button'),

	windowWidth: null,

	init: function () {
		this.decorationSettings();
		this.buttonSettings();
		this.loadAndResize();
	},

	decorationSettings: function () {
		const showDecoration = (e) => {
			const decoration = e.target.querySelector('.js-modal-cards-decoration');
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
			const decoration = e.target.querySelector('.js-modal-cards-decoration');
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

	buttonSettings: function () {
		this.buttonsOpen.forEach((button) => {
			button.addEventListener('click', () => {
				helpers.disableScroll();
				const index = parseInt(button.getAttribute('data-index'));
				const modal = document.querySelector(`.js-modal-cards-modal[data-index="${index}"]`);
				const holder = modal.querySelector('.js-modal-cards-modal-holder');
				gsap
					.timeline()
					.add('start')
					.add(gsap.set(modal, { display: 'block' }), 'start')
					.add('reveal')
					.add(gsap.fromTo(modal, { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }), 'reveal')
					.add('uncover')
					.add(gsap.fromTo(holder, { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' }, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }), 'uncover');
			});
		});

		this.buttonsClose.forEach((button) => {
			button.addEventListener('click', () => {
				helpers.enableScroll();
				const index = parseInt(button.getAttribute('data-index'));
				const modal = document.querySelector(`.js-modal-cards-modal[data-index="${index}"]`);
				const holder = modal.querySelector('.js-modal-cards-modal-holder');
				gsap
					.timeline()
					.add('uncover')
					.add(gsap.fromTo(holder, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }, { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' }), 'uncover')
					.add('reveal')
					.add(gsap.fromTo(modal, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }, { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }), 'reveal')
					.add('end')
					.add(gsap.set(modal, { display: 'none' }), 'end');
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

export default modalCards;
