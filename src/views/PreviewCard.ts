//views/PreviewCard.ts
import Product from '../models/Product';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { settings } from '../utils/constants';
import { EventEmitter } from '../components/base/events';
import Modal from '../models/Modal';


export default class PreviewCard extends Modal {
	private events: EventEmitter;
	private previewTemplate: HTMLElement;
	private addButton: HTMLButtonElement;
	private titleElement: HTMLElement;
	private priceElement: HTMLElement;
	private categoryElement: HTMLElement;
	private textElement: HTMLElement;
	private product: Product | null = null;


	constructor(events: EventEmitter) {
		super('modal-container');
		this.events = events;
		this.previewTemplate = cloneTemplate('#card-preview');
		this.addButton = this.previewTemplate.querySelector('.card__button')
		this.titleElement = this.previewTemplate.querySelector('.card__title');
		this.priceElement = this.previewTemplate.querySelector('.card__price');
		this.categoryElement = this.previewTemplate.querySelector('.card__category');
		this.textElement = this.previewTemplate.querySelector('.card__text');

		this.addButton.addEventListener('click', () => this.events.emit('product:add', this.product));

		// Подписываемся на обновления корзины
		this.events.on('cart:updated', () => {
			if (this.product) {
				this.updateButtonState(this.product.id);
			}
		});
	}

	private updateButtonState(productId: string): void {
		this.events.emit('cart:check', {
			productId,
			callback: (isInCart: boolean) => {
				if (isInCart) {
					this.addButton.disabled = true;
					this.addButton.textContent = 'Уже в корзине';
					this.addButton.classList.add('disabled');
				} else {
					this.addButton.disabled = false;
					this.addButton.textContent = 'В корзину';
					this.addButton.classList.remove('disabled');
				}
			}
		});
	}



	render(product: Product): void {
		this.product = product;
		this.setContent(this.previewTemplate);
		this.titleElement.textContent = product.title;

		this.updateButtonState(product.id);

		if (product.price !== null) {
			this.priceElement.textContent = `${product.price}`
			this.addButton.disabled = false;
			this.addButton.classList.remove('disabled');
		} else {
			this.priceElement.textContent = 'Бесценно'
			this.addButton.disabled = true;
			this.addButton.classList.add('disabled');
		}

		this.categoryElement.textContent = product.category;
		this.textElement.textContent = product.description;
		// Обновляем состояние кнопки при рендере



		this.open()
	}
}