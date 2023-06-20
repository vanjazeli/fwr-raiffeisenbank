import { gsap } from 'gsap';
import helpers from './helpers';

const header = {
	openButton: document.querySelector('.js-header-open'),
	closeButton: document.querySelector('.js-header-close'),
	menu: document.querySelector('.js-header-menu'),
	menuItems: document.querySelectorAll('.js-header-item'),

	scrollLine: document.querySelector('.js-header-scroll-line'),

	init: function () {
		this.settings();
		if (!this.scrollLine) return;
		this.floatingLinks();
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
			this.menu.classList.add('header__menu--shadow');
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
			setTimeout(() => {
				this.menu.classList.remove('header__menu--shadow');
			}, 1000);
		});
	},

	floatingLinks: function () {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 100) {
				this.scrollLine.classList.add('header__floating-line--opacity');
			} else {
				this.scrollLine.classList.remove('header__floating-line--opacity');
			}
		});
	},
};

export default header;
