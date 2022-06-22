const createScrollbarBottomTemplate = () => (
	`<div class="scrollbar-bottom-wrap">
        <div class="scrollbar-bottom-wrap__scroller"></div>
    </div>`
)

const createScrollbarRightTemplate = () => (
	`<div class="scrollbar-right-wrap">
        <div class="scrollbar-right-wrap__scroller"></div>
    </div>`
)

const createElement = ({ tagName = 'div', ...attrs } = elem) => {
	let element = document.createElement(tagName);

	Object.entries(attrs).forEach(([attr, value]) => {
		element[attr] = value;
	})

	return element;
}

export default class ScrollBox {
	#viewportBottomElement = null;
	#tableContentElement = null;
	#scrollbarBottomElement = null;
	#scrollerBottomElement = null;
	#scrollbarRightElement = null;
	#scrollerRightElement = null;
	#allLeftCells = [];

	#startScrollerX = null;
	#startScrollerY = null;
	#viewportWidth = null;
	#viewportHeight = null;
	#maxWidth = null;
	#maxHeight = null;
	#scrollerHeight = null;
	#scrollerWidth = null;
	#ratioX = null;
	#ratioY = null;

	#isShiftRightPressed = false;
	#isPressedScroller = false;
	#isPressedScrollerBottom = false;

	constructor(tableBottomElement) {
		this.#viewportBottomElement = tableBottomElement.querySelector('.table-page__viewport-bottom');
		this.#tableContentElement = tableBottomElement.querySelector('.table-page__content');
		this.#allLeftCells = tableBottomElement.querySelectorAll('.table-page__cell:first-of-type');
	}

	init = () => {
		this.#viewportWidth = this.#viewportBottomElement.offsetWidth - 6;
		this.#viewportHeight = this.#viewportBottomElement.offsetHeight - 6;
		this.#maxWidth = this.#tableContentElement.offsetWidth - this.#viewportWidth;
		this.#maxHeight = this.#tableContentElement.offsetHeight - this.#viewportHeight;
		this.#ratioY = this.#viewportBottomElement.offsetHeight / this.#tableContentElement.offsetHeight;
		this.#ratioX = this.#viewportBottomElement.offsetWidth / this.#tableContentElement.offsetWidth;

		this.#renderScrollbar();
		this.#registerEventsHandler();
	};

	#renderScrollbar = () => {
		this.#renderScrollbarBottom();
		this.#renderScrollbarRight();
	}
	#renderScrollbarBottom = () => {
		const scrollbarBottomElement = createElement({
			tagName: 'div',
			className: 'scrollbar-bottom-wrap',
		});
		const scrollerBottomElement = createElement({
			tagName: 'div',
			className: 'scrollbar-bottom-wrap__scroller',
		});

		this.#scrollerWidth = (this.#viewportWidth * this.#ratioX) - 6;

		scrollbarBottomElement.style.width = `${this.#viewportWidth}px`;
		scrollerBottomElement.style.width = `${this.#scrollerWidth}px`;

		scrollbarBottomElement.insertAdjacentElement('afterbegin', scrollerBottomElement);
		this.#viewportBottomElement.insertAdjacentElement('afterbegin', scrollbarBottomElement);

		this.#scrollbarBottomElement = scrollbarBottomElement;
		this.#scrollerBottomElement = scrollerBottomElement;
	}

	#renderScrollbarRight = () => {
		const scrollbarRightElement = createElement({
			tagName: 'div',
			className: 'scrollbar-right-wrap',
		});
		const scrollerRightElement = createElement({
			tagName: 'div',
			className: 'scrollbar-right-wrap__scroller',
		});
		this.#scrollerHeight = (this.#viewportHeight * this.#ratioY) - 6;

		scrollbarRightElement.style.height = `${this.#viewportHeight}px`;
		scrollerRightElement.style.height = `${this.#scrollerHeight}px`;

		scrollbarRightElement.insertAdjacentElement('afterbegin', scrollerRightElement);

		this.#viewportBottomElement.insertAdjacentElement('afterbegin', scrollbarRightElement);

		this.#scrollbarRightElement = scrollbarRightElement;
		this.#scrollerRightElement = scrollerRightElement;
	}

	#registerEventsHandler = () => {
		this.#viewportBottomElement.addEventListener('scroll', this.#viewportBottomScrollHandler);
		this.#scrollerRightElement.addEventListener('mousedown', this.#scrollerRightMousedownHandler);
		this.#scrollerBottomElement.addEventListener('mousedown', this.#scrollerBottomMousedownHandler);

		document.addEventListener('keydown', this.#documentKeydownHandler);
		document.addEventListener('keydown', this.#documentKeyupHandler);
	}

	#viewportBottomScrollHandler = (evt) => {
		evt.preventDefault();
		
		if (this.#isPressedScroller) {
			this.#isPressedScroller = false;
			
			return;
		}

		const shiftScrollerTop = this.#viewportBottomElement.scrollTop * this.#ratioY;
		const shiftScrollerLeft = this.#viewportBottomElement.scrollLeft * this.#ratioX;

		this.#scrollerRightElement.style.top = `${shiftScrollerTop}px`;
		this.#scrollerBottomElement.style.left = `${shiftScrollerLeft}px`;
		
		for (let cell of this.#allLeftCells) {
			cell.style.left = `${this.#viewportBottomElement.scrollLeft}px`
		}
	}

	#scrollerRightMousedownHandler = (evt) => {
		this.#startScrollerY = evt.clientY;

		document.addEventListener('mousemove', this.#documentMousemoveHandler);
		document.addEventListener('mouseup', this.#documentMouseupHandler);
	}

	#scrollerBottomMousedownHandler = (evt) => {
		this.#startScrollerX = evt.clientX;

		this.#isPressedScrollerBottom = true;

		document.addEventListener('mousemove', this.#documentMousemoveHandler);
		document.addEventListener('mouseup', this.#documentMouseupHandler);
	}

	#documentMousemoveHandler = (evt) => {
		evt.preventDefault();

		const currentScrollerLeft = this.#scrollerBottomElement.offsetLeft;
		const currentScrollerTop = this.#scrollerRightElement.offsetTop;

		this.#isPressedScroller = true;

		if (this.#isPressedScrollerBottom) {
			const shiftScrollerX = this.#startScrollerX - evt.clientX;
			const shiftScrollerLeft = currentScrollerLeft - shiftScrollerX;
			const allShiftScrollerWidth = this.#viewportWidth - this.#scrollerWidth;
			
			if (shiftScrollerLeft < 0) {
				this.#scrollerBottomElement.style.left = 0;
				return;
			}

			if (shiftScrollerLeft >= allShiftScrollerWidth) {
				this.#scrollerBottomElement.style.left = `${allShiftScrollerWidth}px`;
				return;
			}

			const shiftViewportBottomLeft = shiftScrollerLeft / this.#ratioX;
			
			this.#scrollerBottomElement.style.left = `${shiftScrollerLeft}px`;

			this.#viewportBottomElement.scrollTo(shiftViewportBottomLeft, currentScrollerTop);

			this.#startScrollerX = evt.clientX;

			return;
		}

		const shiftScrollerY = this.#startScrollerY - evt.clientY;
		const allShiftScrollerHeight = this.#viewportHeight - this.#scrollerHeight;
		const shiftScrollerTop = currentScrollerTop - shiftScrollerY;

		if (shiftScrollerTop < 0) {
			this.#scrollerRightElement.style.top = 0;
			return;
		}
		
		if (shiftScrollerTop >= allShiftScrollerHeight) {
			this.#scrollerRightElement.style.top = `${allShiftScrollerHeight}px`;
			return;
		}

		this.#scrollerRightElement.style.top = `${shiftScrollerTop}px`;

		const shiftViewportBottomTop = shiftScrollerTop / this.#ratioY;

		this.#viewportBottomElement.scrollTo(currentScrollerLeft, shiftViewportBottomTop);
		this.#startScrollerY = evt.clientY;
	}

	#documentMouseupHandler = (evt) => {
		this.#isPressedScrollerBottom = false;

		document.removeEventListener('mousemove', this.#documentMousemoveHandler);
		document.removeEventListener('mouseup', this.#documentMouseupHandler);
	}

	#documentKeydownHandler = (evt) => {
		if (evt.key === 'ShiftRight') {
			this.#isShiftRightPressed = true;
		}
	}

	#documentKeyupHandler = (evt) => {
		if (evt.key === 'ShiftRight') {
			this.#isShiftRightPressed = false;
		}
	}
};