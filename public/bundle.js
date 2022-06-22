/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api-service.js":
/*!****************************!*\
  !*** ./src/api-service.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiService)
/* harmony export */ });
class ApiService {

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

/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderPosition": () => (/* binding */ RenderPosition)
/* harmony export */ });
const RenderPosition = {
	BEFORE_BEGIN: 'beforebegin',
	BEFORE_END: 'beforeend',
	AFTER_BEGIN: 'afterbegin',
	AFTER_END: 'afterend',
};


/***/ }),

/***/ "./src/module/members-module.js":
/*!**************************************!*\
  !*** ./src/module/members-module.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MembersModule)
/* harmony export */ });
/* harmony import */ var _utils_pattern_abstract_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/pattern/abstract-observable */ "./src/utils/pattern/abstract-observable.js");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api-service */ "./src/api-service.js");



class MembersModule extends _utils_pattern_abstract_observable__WEBPACK_IMPORTED_MODULE_0__["default"] {
	#members = [];
	// #attempts = [];
	
	#apiService = new _api_service__WEBPACK_IMPORTED_MODULE_1__["default"]();

	get get() {
		return this.#members;
	}

	// get getAttempts() {
	// 	return this.#attempts;
	// }

	init = async () => {
		try {
			this.#members = await this.#apiService.members;
			// this.#attempts = await this.#apiService.attempts;
		} catch(err) {
			console.error(err);
			this.#members = [];
			// this.#attempts = [];
		}

		this._notify();
	}
};


/***/ }),

/***/ "./src/presenter/table-presenter.js":
/*!******************************************!*\
  !*** ./src/presenter/table-presenter.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ tablePresenter)
/* harmony export */ });
/* harmony import */ var _view_member_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/member-view */ "./src/view/member-view.js");
/* harmony import */ var _view_table_content_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/table-content-view */ "./src/view/table-content-view.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const */ "./src/const.js");
/* harmony import */ var _utils_render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/render */ "./src/utils/render.js");





const TBODY_CLASS = '.table-page__tbody';

class tablePresenter {
	#viewportElement = null;
	#tbodyElement = null;

	#memberComponent = new _view_member_view__WEBPACK_IMPORTED_MODULE_0__["default"]();
	#tableContentComponent = new _view_table_content_view__WEBPACK_IMPORTED_MODULE_1__["default"]();
	
	constructor(viewportElement) {
		this.#viewportElement = viewportElement;
	}

	init = () => {
		this.#renderTableContent();
		this.#renderMember();
	}

	#renderTableContent = () => {
		
		this.#tbodyElement = this.#tableContentComponent.element.querySelector(TBODY_CLASS);

		(0,_utils_render__WEBPACK_IMPORTED_MODULE_3__.render)(this.#viewportElement, this.#tableContentComponent, _const__WEBPACK_IMPORTED_MODULE_2__.RenderPosition.BEFORE_END)
	}

	#renderMember = () => {
		for (let i = 0; i < 20; i++) {
			(0,_utils_render__WEBPACK_IMPORTED_MODULE_3__.render)(this.#tbodyElement, new _view_member_view__WEBPACK_IMPORTED_MODULE_0__["default"](), _const__WEBPACK_IMPORTED_MODULE_2__.RenderPosition.BEFORE_END);
		}
	}
}

/***/ }),

/***/ "./src/utils/pattern/abstract-observable.js":
/*!**************************************************!*\
  !*** ./src/utils/pattern/abstract-observable.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AbstractObservable)
/* harmony export */ });
class AbstractObservable {
	#observers = new Set();

	addObserver = (observer) => {
		this.#observers.add(observer)
	}

	removeObserver = (observer) => {
		this.#observers.delete(observer);
	}

	_notify = () => {
		this.#observers.forEach((observer) => observer());
	}
};


/***/ }),

/***/ "./src/utils/render.js":
/*!*****************************!*\
  !*** ./src/utils/render.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "createMarkup": () => (/* binding */ createMarkup)
/* harmony export */ });
/* harmony import */ var _view_abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/abstract-view */ "./src/view/abstract-view.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const */ "./src/const.js");




const render = (container, component, render) => {
	const parent = container instanceof _view_abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"]
		? container.element
		: container;
	const child = component instanceof _view_abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"]
		? component.element
		: component;

		switch(render) {
			case _const__WEBPACK_IMPORTED_MODULE_1__.RenderPosition.BEFORE_BEGIN:
				parent.before(child);
				break;
			case _const__WEBPACK_IMPORTED_MODULE_1__.RenderPosition.BEFORE_END:
				parent.prepend(child);
				break;
			case _const__WEBPACK_IMPORTED_MODULE_1__.RenderPosition.AFTER_BEGIN:
				parent.append(child);
				break;
			case _const__WEBPACK_IMPORTED_MODULE_1__.RenderPosition.AFTER_END:
				parent.after(child);
		}
	
}

const createMarkup = (template) => {
	let newDivElement = document.createElement('div');

	newDivElement.innerHTML = template;
	
	if (newDivElement.firstChild.nodeName === '#text') {
		let newTableElement = document.createElement('tbody');

		newTableElement.innerHTML = template;

		return newTableElement.firstChild;
	}

	return newDivElement.firstChild;
}

/***/ }),

/***/ "./src/view/abstract-view.js":
/*!***********************************!*\
  !*** ./src/view/abstract-view.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AbstractView)
/* harmony export */ });
/* harmony import */ var _utils_render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/render */ "./src/utils/render.js");


class AbstractView {
	#element = null;
	
	constructor() {
		if (new.target === 'AbstractView') {
			throw new Error('Can\'t instantiate abstractView, only concreate one.');
		}
	}

	get element() {
		if (!this.#element) {
			this.#element = (0,_utils_render__WEBPACK_IMPORTED_MODULE_0__.createMarkup)(this.template.trim());
		}

		return this.#element;
	}

	get template() {
		throw new Error('Abstract method not implemented: get template');
	}

	removeElement = () => {
		this.#element = null;
	}
};


/***/ }),

/***/ "./src/view/member-view.js":
/*!*********************************!*\
  !*** ./src/view/member-view.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MemberView)
/* harmony export */ });
/* harmony import */ var _abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view */ "./src/view/abstract-view.js");


const createMemberTemplate = (member) => (
	`<tr class="table-page__row">
		<td class="table-page__cell">Кастоев Азамат Вахитович</td>
		<td class="table-page__cell">1</td>
		<td class="table-page__cell">Галашки</td>
		<td class="table-page__cell">Автомобиль</td>
		<td class="table-page__cell">20</td>
		<td class="table-page__cell">4</td>
		<td class="table-page__cell">16</td>
		<td class="table-page__cell">0</td>
		<td class="table-page__cell">40</td>
	</tr>`
);

class MemberView extends _abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
	get template() {
		return createMemberTemplate();
	}
};


/***/ }),

/***/ "./src/view/table-content-view.js":
/*!****************************************!*\
  !*** ./src/view/table-content-view.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TableContentView)
/* harmony export */ });
/* harmony import */ var _abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view */ "./src/view/abstract-view.js");


const createTableContentTemplate = (member) => (
	` <table class="table-page__content">
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
	</table>`
);

class TableContentView extends _abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"]{
	get template() {
		return createTableContentTemplate();
	}
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _presenter_table_presenter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./presenter/table-presenter */ "./src/presenter/table-presenter.js");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api-service */ "./src/api-service.js");
/* harmony import */ var _module_members_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module/members-module */ "./src/module/members-module.js");





// const viewportElement = document.querySelector('.table-page__viewport');

// const tablePresenter = new TablePresenter(viewportElement);

// tablePresenter.init();

const membersModule = new _module_members_module__WEBPACK_IMPORTED_MODULE_2__["default"]();
membersModule.init().finally(() => {
	console.log(membersModule.get);
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map