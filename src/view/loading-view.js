import AbstractView from './abstract-view';

const createLoadingTemplate = () => (
	`<h1 class="title table-page__loading">Loading...</h1>`
);

export default class LoadingView extends AbstractView {
	get template() {
		return createLoadingTemplate();
	}
};
