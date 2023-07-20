import { gsap } from 'gsap';
import helpers from './helpers';

const header = {
	openButton: document.querySelector('.js-header-open'),
	closeButton: document.querySelector('.js-header-close'),
	menu: document.querySelector('.js-header-menu'),
	menuItems: document.querySelectorAll('.js-header-item'),

	scrollLine: document.querySelector('.js-header-scroll-line'),

	isMenuOpen: false,
	menuCtas: document.querySelectorAll('.js-header-menu button, .js-header-menu a'),

	init: function () {
		this.settings();
		if (!this.scrollLine) return;
		this.floatingLinks();
	},

	settings: function () {
		this.openButton.addEventListener('click', () => this.openMenu());
		this.closeButton.addEventListener('click', () => this.closeMenu());

		document.addEventListener('keydown', (e) => {
			if (this.isMenuOpen && e.key === 'Tab') {
				this.trapFocus(e);
			}
			if (this.isMenuOpen && e.key === 'Escape') {
				this.closeMenu();
			}
		});
	},

	openMenu: function () {
		this.isMenuOpen = true;
		helpers.disableScroll();
		setTimeout(() => {
			this.menuCtas[0].focus();
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
	},

	closeMenu: function () {
		this.isMenuOpen = false;
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

	trapFocus: function (event) {
		const focusableElements = this.menu.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
		const firstFocusableElement = focusableElements[0];
		const lastFocusableElement = focusableElements[focusableElements.length - 1];

		if (event.shiftKey) {
			if (document.activeElement === firstFocusableElement) {
				event.preventDefault();
				lastFocusableElement.focus();
			}
		} else {
			if (document.activeElement === lastFocusableElement) {
				event.preventDefault();
				firstFocusableElement.focus();
			}
		}
	},
};

export default header;
