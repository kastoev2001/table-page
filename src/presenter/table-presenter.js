import MemberView from '../view/member-view';
import TableContentView from '../view/table-content-view';
import LoadingView from '../view/loading-view';
import EmptyView from '../view/empty-view';
import SortView from '../view/sort-view';
import ScrollBoxPresenter from './scroll-box-presenter';
import { RenderPosition, UpdateType, TableClass } from '../const';
import { render, remove } from '../utils/render';
import { sortByAttempts } from '../utils/member';
import { deepClone } from '../utils/commonds';
import { SortType } from '../const';

export default class tablePresenter {
	#tableWrapElement = null;
	#viewportElement = null;
	#tbodyElement = null;
	#theadElement = null;

	#membersModel = null;
	#tableContentComponent = new TableContentView();
	#emptyComponent = new EmptyView();
	#loadingComponent = new LoadingView();
	#sortComponent = new SortView();
	#scrollBoxPresenter = null;

	#initedMembers = new Map();

	#currentSort = SortType.RESULT_ALL;
	#isLoading = true;
	#place;
	#currentViewportScrollTop = 0;

	constructor(tableElement, membersModel) {
		this.#tableWrapElement = tableElement.querySelector(TableClass.WRAP);
		this.#viewportElement = tableElement.querySelector(TableClass.VIEWPORT);

		this.#membersModel = membersModel;
	}

	get members() {
		const members = deepClone(this.#membersModel.get);

		switch (this.#currentSort) {
			case SortType.RESULT_ALL:
				return sortByAttempts({members});
			case SortType.RESULT_ONE:
				return sortByAttempts({members, type: 0});
			case SortType.RESULT_TWO:
				return sortByAttempts({members, type: 1});
			case SortType.RESULT_THREE:
				return sortByAttempts({members, type: 2});
			case SortType.RESULT_FOUR:
				return sortByAttempts({members, type: 3});
		}

		return members;
	}

	init = () => {
		this.#membersModel.addObserver(this.#handleModelEvent);

		this.#render();
		this.#setHandlers();
	}

	#handleModelEvent = (updateType) => {
		switch (updateType) {
			case UpdateType.INIT:
				this.#isLoading = false;

				remove(this.#loadingComponent);

				this.#render();
				break;
		}
	}

	#setHandlers = () => {
		this.#viewportElement.addEventListener('scroll', this.#viewportScrollHandler);
	}

	#render = () => {
		if (this.#isLoading) {
			render(this.#viewportElement, this.#loadingComponent, RenderPosition.AFTER_BEGIN);
			return;
		}

		if (!this.members.length) {
			render(this.#viewportElement, this.#emptyComponent, RenderPosition.AFTER_BEGIN);
			return;
		}

		this.#renderSort();
		this.#renderTableContent();
		this.#renderMembers();
		this.#renderScrollBox();

	}

	#renderScrollBox = () => {
		this.#scrollBoxPresenter = new ScrollBoxPresenter(this.#tableWrapElement);

		this.#scrollBoxPresenter.init();

	};

	#renderSort = () => {
		this.#sortComponent.setSortClickHandler(this.#handleSortTypeChange);

		render(this.#tableWrapElement, this.#sortComponent, RenderPosition.AFTER_BEGIN);
	}

	#renderTableContent = () => {
		this.#tbodyElement = this.#tableContentComponent.element.querySelector(TableClass.TBODY);
		this.#theadElement = this.#tableContentComponent.element.querySelector(TableClass.THEAD);

		render(this.#viewportElement, this.#tableContentComponent, RenderPosition.AFTER_BEGIN)
	}

	#renderMembers = () => {
		const members = this.members;
		this.#place = 1;
		members.forEach((member) => this.#renderMember(member));

		this.#viewportElement.scrollBy(0, this.#currentViewportScrollTop);
	}

	#renderMember = (member) => {
		const memberComponent = new MemberView(member, this.#place);
		render(this.#tbodyElement, memberComponent, RenderPosition.BEFORE_END);
		this.#place++;

		this.#initedMembers.set(member.id, memberComponent);
	}

	#clear = () => {
		this.#initedMembers.forEach((memberComponent) => {
			remove(memberComponent);
		});

		this.#initedMembers.clear();
	}

	#handleSortTypeChange = (sortType) => {
		if (this.#currentSort === sortType) {
			return;
		}

		this.#currentSort = sortType;

		this.#currentViewportScrollTop = this.#viewportElement.scrollTop;

		this.#clear();

		this.#renderMembers();
	}

	#viewportScrollHandler = (evt) => {
		const viewportScrollTop = this.#viewportElement.scrollTop;

		this.#theadElement.style.top = `${viewportScrollTop}px`;
	}
};
