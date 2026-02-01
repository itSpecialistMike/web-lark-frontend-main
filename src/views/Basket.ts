//views/Basket.ts

import Product from '../models/Product';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { settings } from '../utils/constants';
import { EventEmitter } from '../components/base/events';
import { CartItem } from '../types';
import Modal from '../models/Modal';


export default class Basket extends Modal {
	private list: HTMLElement;
	private totalElement: HTMLElement;
	private events: EventEmitter;

	constructor(events: EventEmitter) {
		super('basket-modal');
		this.events = events;

		const basketTemplate: HTMLElement = cloneTemplate('#basket');

		this.list = basketTemplate.querySelector('.basket__list');
		this.totalElement = basketTemplate.querySelector('.basket__price');

		if (!this.list || !this.totalElement) {
			throw new Error('Required basket elements not found.');
		}

		this.setContent(basketTemplate);

		// const orderButton = basketTemplate.querySelector('.basket__order');
	}

	render(items: CartItem[], total: number): void {
		this.list.innerHTML = '';

		items.forEach((item, index) => {
			const itemTemplate = cloneTemplate('#card-basket')

			const indexElement = itemTemplate.querySelector('.basket__item-index');
			const titleElement = itemTemplate.querySelector('.card__title');
			const priceElement = itemTemplate.querySelector('.card__price');
			const deleteButton = itemTemplate.querySelector('.basket__item-delete');


			if (deleteButton) {
				deleteButton.addEventListener('click', () => {
					this.events.emit('cart:remove', {id: item.id});
					console.log('Удалить товар:', item.id);
				})
			}
			if (indexElement) indexElement.textContent = (index + 1).toString();
			if (titleElement) titleElement.textContent = item.title
			if (priceElement) priceElement.textContent = `${item.price} ${settings.currency}`


			this.list.appendChild(itemTemplate);
		});

		this.totalElement.textContent = `${total} ${settings.currency}`;
	}

}