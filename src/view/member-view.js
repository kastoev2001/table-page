import AbstractView from './abstract-view';

const createResultTemplate = (results) => (
	`
	${results.map((result) => `<td class="table-page__cell">${result}</td>`).join(' ')}
	<td class="table-page__cell">${results.reduce((a, b) => a + b, 0)}</td>
	`
);

const createMemberTemplate = (member, place) => {
	const {
		car,
		city,
		name,
		results,
	} = member;
	
	const resultsTemplate = createResultTemplate(results);
	

	return (
		`<tr class="table-page__row">
		<td class="table-page__cell">${name}</td>
		<td class="table-page__cell">${place}</td>
		<td class="table-page__cell">${city}</td>
		<td class="table-page__cell">${car}</td>
		${resultsTemplate}
	</tr>`
	);
};

export default class MemberView extends AbstractView {
	#member = null;
	#place = null
	
	constructor(member, place) {
		super();
		this.#member = member;
		this.#place = place;
	}
	
	get template() {
		return createMemberTemplate(this.#member, this.#place);
	}
};
