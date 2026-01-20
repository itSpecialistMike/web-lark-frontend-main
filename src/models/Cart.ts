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
		//this.loadFromStorage()
		//this.update
	}

	addItem(product: Product) {
		if (!product.isAvailable()) return;
		const existId = this.items.findIndex(i => i.id === product.id);

		if (existId !== -1) {
			this.items[existId].quantity++;
		} else {
			const cartItem: CartItem = {
					id: product.id,
					title: product.title,
					price: product.price!,
					quantity: 1,
					image: product.image,
			}
			this.items.push(cartItem);
		}
		//this.saveToStorage()
		//this.update
	}

	removeItem(id: string) {
		const idToRemove:number = this.items.findIndex(item => item.id === id)
		if (idToRemove !== -1) {
			this.items.splice(idToRemove, 1);
		}
		//this.saveToStorage()
		//this.update
	}

	getTotal(): number {
		return this.items.reduce((total, item) =>
			total + (item.price * item.quantity), 0)
	}
}