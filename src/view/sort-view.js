import AbstractView from './abstract-view';
import { SortType } from '../const';

const createSortTemplate = () => (
	`<div class="table-page__sort table-sort">
	<div class="table-sort__item table-sort__result-all" data-sort-type="${SortType.RESULT_ALL}">Result all</div>
	<div class="table-sort__item table-sort__result-one" data-sort-type="${SortType.RESULT_ONE}">Result one</div>
	<div class="table-sort__item table-sort__result-two" data-sort-type="${SortType.RESULT_TWO}">Result two</div>
	<div class="table-sort__item table-sort__result-three" data-sort-type="${SortType.RESULT_THREE}">Result three</div>
	<div class="table-sort__item table-sort__result-four" data-sort-type="${SortType.RESULT_FOUR}">Result four</div>
</div>`
);

export default class SortView extends AbstractView {
	get template() {
		return createSortTemplate();
	}

	setSortClickHandler = (callback) => {
		this._callback.sortClick = callback;

		const sortWrapElement = this.element;

		sortWrapElement.addEventListener('click', this.#sortClickHandler);
	}

	#sortClickHandler = (evt) => {
		const sortType = evt.target.dataset.sortType;
		
		if (!sortType) {
			return;
		}

		this._callback.sortClick(sortType);
	}
};
