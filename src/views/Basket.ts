//views/Basket.ts

import Product from '../models/Product';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { settings } from '../utils/constants';
import { EventEmitter } from '../components/base/events';
import { CartItem } from '../types';


export default class Basket {
	private modal: HTMLElement;
	private content: HTMLElement;
	private list: HTMLElement;
	private totalElement: HTMLElement;
	private closeButton: HTMLElement;
	private events: EventEmitter;

	constructor(events: EventEmitter) {
		this.modal = document.querySelector('.modal');
		this.content = document.querySelector('.modal__content');
		this.content.innerHTML = '';
		this.events = events;

		const basketTemplate: HTMLElement = cloneTemplate('#basket');
		this.content.appendChild(basketTemplate);

		this.list = basketTemplate.querySelector('.basket__list');
		this.totalElement = basketTemplate.querySelector('.basket__price');
		this.closeButton = this.modal.querySelector('.modal__close');

		this.closeButton.addEventListener('click', () => {
			this.closeModal();
		})
	}

	openModal(): void { this.modal.classList.add('modal_active'); }
	closeModal(): void { this.modal.classList.remove('modal_active'); }

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