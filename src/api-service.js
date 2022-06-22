export default class ApiService {

	get members() {
		return this.#load({
			url: './php/members.php',
		});
	}

	// get attempts() {
	// 	return this.#load({
	// 		url: './php/attempts.php',
	// 	});
	// }
	
	#load = async ({
		url,
		method = 'GET',
		body = null,
		headers = new Headers(),
	}) => {
		try {
			const response = await fetch(url, {
				method,
				body,
				headers,
			});

			ApiService.checkStatus(response);

			return ApiService.parseResponse(response);

		} catch (err) {
			ApiService.catchError(err);
		}
	}

	static parseResponse = (response) => response.json();

	static checkStatus = (response) => {
		if (!response.ok) {
			throw new Error(`${response.status}: ${response.statusText}`);
		}
	}

	static catchError = (err) => {
		throw err;
	}
}