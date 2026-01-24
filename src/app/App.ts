import { EventEmitter } from '../components/base/events';
import { Api, ApiListResponse } from '../components/base/api';
import Cart from '../models/Cart';
import { API_URL } from '../utils/constants';
import Product from '../models/Product';
import ProductCard from '../views/ProductCard';

export class App {
	private events: EventEmitter
	private api: Api
	private cart: Cart
	private products: Product[] = []

	constructor() {
		this.events = new EventEmitter();
		this.api = new Api(API_URL);
		this.cart = new Cart(this.events);

		this.setupEventListeners();

		this.loadProducts();
	}

	private setupEventListeners(): void {
		// подписать на события
	}

	private async loadProducts(): Promise<void> {
		// долбим api
		try {
			const response = await this.api.get<ApiListResponse<Product>>('/product/');

			this.products = response.items.map(item => new Product(item));

			this.renderProducts()
		} catch (error) {
			console.error(error);
		}
	}

	private renderProducts(): void {
		const gallery = document.querySelector('.gallery');
		const template = document.getElementById('card-catalog') as HTMLTemplateElement;

		if (!gallery || !template) return;
		gallery.innerHTML = '';

		this.products.forEach(product =>  {
			const card = new ProductCard(product, template, this.events);
			const cardElement = card.render();
			gallery.append(cardElement);
		})
	}
}