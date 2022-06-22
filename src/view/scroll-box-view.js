import AbstractView from './abstract-view';

const SCROLLER_CLASS = '.scroll-box__scroller'

const createScrollBoxTemplate = () => (
	`<div class="table-page__scroll-box scroll-box">
		<div class="scroll-box__scrollbar">
			<span class="scroll-box__scroller"></span>
		</div>
	</div>`
);

export default class ScrollBoxView extends AbstractView {
	get template() {
		return createScrollBoxTemplate();
	}

	setScrollerMousedownHandler = (callback) => {
		this._callback.scrollerMousedown = callback;

		const scrollerElement = this.element.querySelector(SCROLLER_CLASS);

		scrollerElement.addEventListener('mousedown', this.#scrollerMousedownHandler);
	}

	#scrollerMousedownHandler = (evt) => {
		const {clientY} = evt;
		this._callback.scrollerMousedown(clientY);
	}
};
