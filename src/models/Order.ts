// models/Order.ts
import { Api } from '../components/base/api';
import Cart from './Cart';
import { OrderRequest, OrderFormData, OrderResponse } from '../types';


export class Order {
	private api: Api;
	private cart: Cart;

	constructor(api: Api, cart: Cart) {
		this.api = api;
		this.cart = cart;
	}

	async create(data: OrderFormData): Promise<OrderResponse> {
		const request: OrderRequest = {
			payment: data.payment,
			address: data.address,
			email: data.email,
			phone: data.phone,
			total: this.cart.getTotal(),
			items: this.cart.getItems().map((i) => i.id),
		};

		return await this.api.post('/order/', request) as OrderResponse;
	}
}