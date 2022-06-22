import ScrollBoxView from '../view/scroll-box-view';
import { render, remove } from '../utils/render';
import { RenderPosition, TableClass } from '../const';

const SCROLLER_CLASS = '.scroll-box__scroller';

export default class ScrollBoxPresenter {
	#tableWrapElement = null;
	#viewportElement = null;
	#tableContentElement = null;
	#scrollboxElement = null;
	#scrollerElement = null;
	#theadElement = null;

	#scrollBoxComponent = new ScrollBoxView();

	#viewportHeight = null;
	#scrollBoxHeight = null;
	#tableContentHeight = null;
	#scrollerHeight = null;
	#ratio = null;
	#startY = null;

	#isPressed = false;

	constructor(tableWrapElement) {
		this.#tableWrapElement = tableWrapElement;
		this.#viewportElement = tableWrapElement.querySelector(TableClass.VIEWPORT);
		this.#tableContentElement = tableWrapElement.querySelector(TableClass.CONTENT);
		this.#theadElement = tableWrapElement.querySelector(TableClass.THEAD);
	}

	init = () => {
		this.#render();
	}

	#render = () => {
		this.#viewportHeight = this.#viewportElement.clientHeight;
		this.#scrollBoxHeight = this.#viewportHeight - this.#theadElement.clientHeight - 12;
		this.#tableContentHeight = this.#tableContentElement.clientHeight;

		if (this.#viewportHeight >= this.#tableContentHeight) {
			return;
		}

		this.#ratio = {
			scroller: this.#viewportHeight / this.#tableContentHeight,
			scroll: this.#scrollBoxHeight / this.#tableContentHeight,
		};

		this.#renderScrollBox();
		this.#setHandlers();
	}

	#renderScrollBox = () => {
		this.#scrollboxElement = this.#scrollBoxComponent.element;
		this.#scrollerElement = this.#scrollBoxComponent.element.querySelector(SCROLLER_CLASS);
		this.#scrollerHeight = Math.ceil(this.#scrollBoxHeight * this.#ratio.scroll);

		this.#scrollboxElement.style.height = `${this.#scrollBoxHeight}px`;
		this.#scrollerElement.style.height = `${this.#scrollerHeight}px`;

		render(this.#tableWrapElement, this.#scrollBoxComponent, RenderPosition.BEFORE_END);
	}

	#setHandlers = () => {
		this.#viewportElement.addEventListener('scroll', this.#viewportScrollHandler)
		this.#scrollBoxComponent.setScrollerMousedownHandler(this.#scrollerMousedownHandler);
	}

	#viewportScrollHandler = (evt) => {
		if (this.#isPressed) {
			return;
		}
		const viewportScrollTop = this.#viewportElement.scrollTop;
		const allShiftTableContentHeight = this.#tableContentHeight - this.#viewportHeight;
		const allShiftScrollerHeight = this.#scrollBoxHeight - this.#scrollerHeight;

		if (allShiftTableContentHeight <= viewportScrollTop) {
			this.#scrollerElement.style.top = `${allShiftScrollerHeight}px`;
			return;
		}

		this.#scrollerElement.style.top = `${viewportScrollTop * this.#ratio.scroller}px`;
	}

	#scrollerMousedownHandler = (clientY) => {
		this.#isPressed = true;
		this.#startY = clientY;

		document.addEventListener('mousemove', this.#documentMousemoveHandler);
		document.addEventListener('mouseup', this.#documentMouseupHandler);
	}

	#documentMousemoveHandler = (evt) => {
		evt.preventDefault();

		const currentScrollerTop = this.#scrollerElement.offsetTop;

		const shiftScrollerY = this.#startY - evt.clientY;
		const allShiftScrollerHeight = this.#scrollBoxHeight - this.#scrollerHeight;
		const shiftScrollerTop = currentScrollerTop - shiftScrollerY;
		if (shiftScrollerTop < 0) {
			this.#scrollerElement.style.top = 0;
			return;
		}

		if (shiftScrollerTop >= allShiftScrollerHeight) {
			const allShiftTableContentHeight = this.#tableContentHeight - this.#viewportHeight;

			console.log(allShiftTableContentHeight)

			this.#scrollerElement.style.top = `${allShiftScrollerHeight}px`;

			this.#viewportElement.scrollTo(0, allShiftTableContentHeight);

			return;
		}

		this.#scrollerElement.style.top = `${shiftScrollerTop}px`;

		const shiftViewportTop = shiftScrollerTop / this.#ratio.scroller;

		this.#viewportElement.scrollTo(0, shiftViewportTop);
		this.#startY = evt.clientY;
	}

	#documentMouseupHandler = (evt) => {
		this.#isPressed = false;

		document.removeEventListener('mousemove', this.#documentMousemoveHandler);
		document.removeEventListener('mouseup', this.#documentMouseupHandler);
	}
};