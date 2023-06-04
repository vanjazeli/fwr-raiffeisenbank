import { gsap } from 'gsap';
import helpers from './helpers';

const header = {
	openButton: document.querySelector('.js-header-open'),
	closeButton: document.querySelector('.js-header-close'),
	menu: document.querySelector('.js-header-menu'),
	menuItems: document.querySelectorAll('.js-header-item'),

	init: function () {
		this.settings();
	},

	settings: function () {
		this.openButton.addEventListener('click', () => {
			helpers.disableScroll();
			setTimeout(() => {
				this.closeButton.classList.add('header__button--active');
			}, 500);
			gsap
				.timeline()
				.add('start')
				.add(gsap.set(this.menu, { display: 'block' }), 'start')
				.add('slideMenu')
				.add(gsap.to(this.menu, { right: 0 }), 'slide')
				.add('showItems')
				.add(gsap.to(this.menuItems, { opacity: 1, stagger: 0.1 }), 'showItems');
		});

		this.closeButton.addEventListener('click', () => {
			helpers.enableScroll();
			gsap
				.timeline()
				.add('changeButton')
				.add(this.closeButton.classList.remove('header__button--active'), 'changeButton')
				.add('hideItems')
				.add(gsap.to(this.menuItems, { opacity: '0', stagger: -0.05 }), 'hideItems')
				.add('slideMenu')
				.add(gsap.to(this.menu, { right: '-100%' }), 'slideMenu')
				.add('end')
				.add(gsap.set(this.menu, { display: 'none' }), 'end');
		});
	},
};

export default header;
