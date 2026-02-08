//views/PreviewCard.ts
import Product from '../models/Product';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { settings } from '../utils/constants';
import { EventEmitter } from '../components/base/events';
import Modal from '../models/Modal';


export default class PreviewCard extends Modal {
	private events: EventEmitter;
	private previewTemplate: HTMLElement;
	private addButton: HTMLElement;
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
	}

	render(product: Product): void {
		this.product = product;
		this.setContent(this.previewTemplate);
		this.titleElement.textContent = product.title;
		if (product.price !== null) {
			this.priceElement.textContent = `${product.price}`
		} else {
			this.priceElement.textContent = 'Бесценно'
		}
		this.categoryElement.textContent = product.category;
		this.textElement.textContent = product.description;
		this.open()
	}
}