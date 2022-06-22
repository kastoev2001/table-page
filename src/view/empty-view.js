import AbstractView from './abstract-view';

const createEmptyTemplate = () => (
	`<h1 class="title table-page__empty">Not data!</h1>`
);

export default class EmptyView extends AbstractView {
	get template() {
		return createEmptyTemplate();
	}
};
