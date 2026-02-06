//views/PreviewCard.ts

import Product from '../models/Product';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { settings } from '../utils/constants';
import { EventEmitter } from '../components/base/events';
import Modal from '../models/Modal';


export default class PreviewCard extends Modal {
	private events: EventEmitter;
	private product: Product;
	private previewTemplate: HTMLElement;
	private addButton: HTMLElement;
	private titleElement: HTMLElement;
	private priceElement: HTMLElement;
	private categoryElement: HTMLElement;
	private textElement: HTMLElement;


	constructor(events: EventEmitter, product: Product) {
		super('preview-modal');
		this.product = product;
		this.events = events;
		this.previewTemplate = cloneTemplate('#card-preview');
		this.addButton = this.previewTemplate.querySelector('.card__button')
		this.titleElement = this.previewTemplate.querySelector('.card__title');
		this.priceElement = this.previewTemplate.querySelector('.card__price');
		this.categoryElement = this.previewTemplate.querySelector('.card__category');
		this.textElement = this.previewTemplate.querySelector('.card__text');

		this.render()
		this.setContent(this.previewTemplate);
	}

	render(): void {


		this.titleElement.textContent = this.product.title;
		this.priceElement.textContent = `${this.product.price}`
		this.categoryElement.textContent = this.product.category;
		this.textElement.textContent = this.product.description;



		this.addButton.addEventListener('click', () => this.events.emit('product:add', this.product));
	}
}