// models/Order.ts
import { Api } from '../components/base/api';
import Cart from './Cart';
import { OrderRequest, OrderFormData } from '../types';


export class Order {
	private api: Api;
	private cart: Cart;

	constructor(api: Api, cart: Cart) {
		this.api = api;
		this.cart = cart;
	}

	create(data: OrderFormData) {
		const request: OrderRequest = {
			payment: data.payment,
			address: data.address,
			email: data.email,
			phone: data.phone,
			total: this.cart.getTotal(),
			items: this.cart.getItems().map(i => i.id)
		}

		return this.api.post('/orders', request)
	}
}