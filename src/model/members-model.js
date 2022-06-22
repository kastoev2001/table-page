import AbstractObservable from '../utils/pattern/abstract-observable';
import ApiService from '../api-service';
import { UpdateType } from '../const';

export default class MembersModel extends AbstractObservable {
	#members = [];
	
	#apiService = new ApiService();

	get get() {
		return this.#members;
	}

	init = async () => {
		try {
			this.#members = await this.#apiService.members;
			this.#members = [this.#members[0]];
		} catch(err) {
			console.error(err);
			this.#members = [];
		}

		this._notify(UpdateType.INIT);
	}
};
