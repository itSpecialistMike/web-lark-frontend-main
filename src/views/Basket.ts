//views/Basket.ts
import { cloneTemplate } from '../utils/utils';
import { settings } from '../utils/constants';
import { EventEmitter } from '../components/base/events';
import { CartItem } from '../types';
import Modal from '../models/Modal';
import Cart from '../models/Cart';


export default class Basket extends Modal {
	private list: HTMLElement;
	private totalElement: HTMLElement;
	private events: EventEmitter;
	private template: HTMLElement;
	private total: Cart;
	private orderButton: HTMLButtonElement;

	constructor(events: EventEmitter) {
		super('modal-container');
		this.events = events;
		this.template = cloneTemplate('#basket');
		this.list = this.template.querySelector('.basket__list');
		this.totalElement = this.template.querySelector('.basket__price');



		this.orderButton = this.template.querySelector('.basket__button');
		this.orderButton.addEventListener('click', () => {
			this.events.emit('order:open');
		});
	}

	open() {
		this.setContent(this.template); // это уже не костыль, а кресло каталка
		super.open();
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
			if (priceElement) {
				item.price == 0 ? priceElement.textContent = 'Бесценно' : priceElement.textContent = `${item.price} ${settings.currency}`
			}
			this.list.appendChild(itemTemplate);
		});


		this.totalElement.textContent = `${total} ${settings.currency}`;

		if (total < 1) {
			this.orderButton.disabled = true;
			this.orderButton.textContent = 'Слишком мало для заказа';
		} else {
			this.orderButton.disabled = false;
			this.orderButton.textContent = 'Оформить';
		}
	}

}