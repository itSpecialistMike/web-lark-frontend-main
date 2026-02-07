// models/Cart.ts
import { CartItem } from '../types';
import { EventEmitter } from '../components/base/events';
import Product from './Product';

export default class Cart {
	private items: CartItem[];
	private events: EventEmitter;

	constructor(events: EventEmitter) {
		this.events = events;
		this.items = []
		this.loadFromStorage()
		this.update()
	}

	addItem(product: Product) {
		const existId = this.items.findIndex(i => i.id === product.id);

		const price = product.price ?? 0;

		if (existId !== -1) {
			this.items[existId].quantity++;
		} else {
			const cartItem: CartItem = {
					id: product.id,
					title: product.title,
					price: price,
					quantity: 1,
					image: product.image,
			}
			this.items.push(cartItem);
		}
		this.saveToStorage()
		this.update()
	}

	removeItem(id: string) {
		const idToRemove:number = this.items.findIndex(item => item.id === id)
		if (idToRemove !== -1) {
			this.items.splice(idToRemove, 1);
		}
		this.saveToStorage()
		this.update()
	}

	getTotal(): number {
		return this.items.reduce((total, item) =>
			total + (item.price * item.quantity), 0)
	}

	private loadFromStorage() {
		const saved = localStorage.getItem('cart');
		if (saved) {
			this.items = JSON.parse(saved);
		}
	}

	private saveToStorage() {
		localStorage.setItem('cart', JSON.stringify(this.items));
	}

	private update() {
		this.events.emit('cart:updated', {
			items: this.getItems(),
			total: this.getTotal(),
			count: this.getCount(),
		})
	}

	getItems(): CartItem[] {
		return [...this.items];
	}

	getCount(): number {
		return this.items.reduce((sum, item) => sum + item.quantity, 0);
	}
}