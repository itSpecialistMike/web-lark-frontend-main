// views/CartItem.ts
import Product from '../models/Product';
import { cloneTemplate } from '../utils/utils';
import { EventEmitter } from '../components/base/events';

export default class CartItem {
	product: Product;
	container: HTMLElement;
	events: EventEmitter;

	constructor(product: Product, template: HTMLTemplateElement, events: EventEmitter) {
		this.product = product;
		this.container = cloneTemplate(template);
		this.events = events;
		this.fillData()
		this.container.addEventListener('click', () => this.events.emit('product:preview', this.product))
	}

	private fillData(): void {
		const titleElement = this.container.querySelector('.card__title')
		const priceElement = this.container.querySelector('.card__price')
		const categoryElement = this.container.querySelector('.card__category')

		if (titleElement) {
			titleElement.textContent = this.product.title;
		}

		if (priceElement) {
			priceElement.textContent = this.product.price
				? `${ this.product.price } синапсов`
				: 'Бесценно';
		}


		if (categoryElement) {
			categoryElement.textContent = this.product.category;
			categoryElement.classList.remove(
				'card__category_soft',
				'card__category_hard',
				'card__category_additional',
				'card__category_button',
				'card__category_other'
			);
			categoryElement.classList.add(this.getCategoryClass(categoryElement.textContent));
		}
	}

	private getCategoryClass(category: string): string {
		if (!category || category == 'другое') return 'card__category_other';
		if (category === 'софт-скил') return 'card__category_soft';
		if (category === 'хард-скил') return 'card__category_hard';
		if (category === 'дополнительное') return 'card__category_additional';
		if (category === 'кнопка') return 'card__category_button';
		if (category === 'другое') return 'card__category_other';
	}

	render(): HTMLElement {
		return this.container;
	}

}
