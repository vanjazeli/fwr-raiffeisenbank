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
			gsap
				.timeline()
				.add('start')
				.add(helpers.disableScroll(), 'start')
				.add(gsap.set(this.menu, { display: 'block' }), 'start')
				.add('slideMenu')
				.add(gsap.to(this.menu, { right: 0 }), 'slide')
				.add('showItems')
				.add(gsap.to(this.menuItems, { opacity: 1, stagger: 0.05 }), 'showItems')
				.add(this.closeButton.classList.add('header__button--active'), 'showItems');
		});

		this.closeButton.addEventListener('click', () => {
			gsap
				.timeline()
				.add('changeButton')
				.add(this.closeButton.classList.remove('header__button--active'), 'changeButton')
				.add('hideItems')
				.add(gsap.to(this.menuItems, { opacity: '0', stagger: -0.05 }), 'hideItems')
				.add('slideMenu')
				.add(gsap.to(this.menu, { right: '-100%' }), 'slideMenu')
				.add('end')
				.add(helpers.enableScroll(), 'end')
				.add(gsap.set(this.menu, { display: 'none' }), 'end');
		});
	},
};

export default header;
