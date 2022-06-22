import AbstractView from '../view/abstract-view';

import { RenderPosition } from '../const';

export const render = (container, component, render) => {
	const parent = container instanceof AbstractView
		? container.element
		: container;
	const child = component instanceof AbstractView
		? component.element
		: component;

		switch(render) {
			case RenderPosition.BEFORE_BEGIN:
				parent.before(child);
				break;
				case RenderPosition.AFTER_BEGIN:
					parent.prepend(child);
					break;
			case RenderPosition.BEFORE_END:
				parent.append(child);
				break;
			case RenderPosition.AFTER_END:
				parent.after(child);
		}
	
};

export const remove = (component) => {
	if (!component) {
		throw new Error('Not am component!');
	}

	component.element.remove();
	component.removeElement();
};

export const createMarkup = (template) => {
	let newDivElement = document.createElement('div');

	newDivElement.innerHTML = template;
	
	if (newDivElement.firstChild.nodeName === '#text') {
		let newTableElement = document.createElement('tbody');

		newTableElement.innerHTML = template;

		return newTableElement.firstChild;
	}

	return newDivElement.firstChild;
};