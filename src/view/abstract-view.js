import { createMarkup } from '../utils/render';

export default class AbstractView {
	#element = null;
	_callback = [];
	
	constructor() {
		if (new.target === 'AbstractView') {
			throw new Error('Can\'t instantiate abstractView, only concreate one.');
		}
	}

	get element() {
		if (!this.#element) {
			this.#element = createMarkup(this.template.trim());
		}

		return this.#element;
	}

	get template() {
		throw new Error('Abstract method not implemented: get template');
	}

	removeElement = () => {
		this.#element = null;
	}
};
