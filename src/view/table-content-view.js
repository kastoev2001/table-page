import AbstractView from './abstract-view';

const createTableContentTemplate = (member) => (
	`<table class="table-page__content">
			<thead class="table-page__thead">
				<tr class="table-page__row">
					<th class="table-page__column">ФИО</th>
					<th class="table-page__column">Место</th>
					<th class="table-page__column">Город</th>
					<th class="table-page__column">Автомобиль</th>
					<th class="table-page__column">Попытки №1</th>
					<th class="table-page__column">Попытки №2</th>
					<th class="table-page__column">Попытки №3</th>
					<th class="table-page__column">Попытки №4</th>
					<th class="table-page__column">Общее</th>
				</tr>
			</thead>
			<tbody class="table-page__tbody">
			</tbody>
		</table>
	</div>`
);

export default class TableContentView extends AbstractView{
	get template() {
		return createTableContentTemplate();
	}
};
