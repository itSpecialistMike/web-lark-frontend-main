// app/App.ts
import { EventEmitter } from '../components/base/events';
import { Api, ApiListResponse } from '../components/base/api';
import Cart from '../models/Cart';
import { API_URL } from '../utils/constants';
import Product from '../models/Product';
import CartItem from '../views/CartItem';
import { CartData, OrderFormData } from '../types';
import Basket from '../views/Basket';
import PreviewCard from '../views/PreviewCard';
import OrderForm from '../views/OrderForm';


export class App {
	private events: EventEmitter
	private api: Api
	private cart: Cart
	private products: Product[] = []
	private basket: Basket
	private orderForm: OrderForm
	private preview: PreviewCard;

	constructor() {
		this.events = new EventEmitter();
		this.api = new Api(API_URL);
		this.cart = new Cart(this.events);
		this.basket = new Basket(this.events);
		this.orderForm = new OrderForm(this.events);
		this.preview = new PreviewCard(this.events) // он тут ждет вротым аргументом продукт, но какой это продукт еще не известно

		this.setupEventListeners();

		this.loadProducts().then(() => {
			this.events.emit('cart:updated', {
				items: this.cart.getItems(),
				total: this.cart.getTotal(),
				count: this.cart.getCount(),
			});
		});


		const basketButton  = document.querySelector('.header__basket');
		basketButton?.addEventListener('click', () => {
			this.basket.open()
		})

	}

	private setupEventListeners(): void {
		// подписать на события
		this.events.on('product:add', (product: Product): void => {
			this.cart.addItem(product);
			console.log('Товар добавлен', product.title);
		})

		this.events.on('cart:updated', (data: CartData) => {
			console.log('корзина обновлена', data);
			this.basket.render(data.items, data.total)

			const counter = document.querySelector('.header__basket-counter');
			if (counter) {
				counter.textContent = String(data.count);
			}
		})

		this.events.on('cart:remove', (data: {id: string}) => {
			this.cart.removeItem(data.id);
		})

		this.events.on('product:preview', (product: Product) => {
			this.preview.render(product);
		})

		this.events.on('order:open', (): void => {
			this.basket.close();
			console.log('гыга откройся блять')
			this.orderForm.open();
		})
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
			const card = new CartItem(product, template, this.events);
			const cardElement = card.render();
			gallery.append(cardElement);
		})
	}
}