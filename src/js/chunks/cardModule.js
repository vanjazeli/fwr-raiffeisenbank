import VanillaTilt from 'vanilla-tilt';

const cardModule = {
	inputs: document.querySelectorAll('.js-card-module-input'),

	init: function () {
		VanillaTilt.init();
		this.showName();
	},

	showName: function () {
		this.inputs.forEach((input) => {
			input.addEventListener('input', (e) => {
				const currentInputValue = e.target.value;
				const cardName = e.target.closest('.js-card-module').querySelector('.js-card-module-name');
				cardName.textContent = currentInputValue;
			});
		});
	},
};

export default cardModule;
