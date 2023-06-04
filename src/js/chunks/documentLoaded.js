const documentLoaded = {
	init: function () {
		this.loadDetection();
	},

	loadDetection: function () {
		window.addEventListener('load', () => {
			const html = document.querySelector('html');
			html.classList.add('loaded');
			const body = document.querySelector('body');
			body.classList.add('body--opacity');
		});
	},
};

export default documentLoaded;
