// models/Product.ts

import { Product as Iproduct, ProductCategory } from '../types';

export default class Product implements Iproduct {
	id: string;
	title: string;
	description: string;
	image: string;
	category: ProductCategory;
	price: number | null;

	constructor(product: Iproduct) {
		this.id = product.id;
		this.title = product.title;
		this.description = product.description;
		this.image = product.image;
		this.category = product.category;
		this.price = product.price;
	}

	isAvailable() : boolean  {
		return this.price !== null && this.price > 0;
	}
}

