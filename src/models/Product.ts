// models/Product.ts
import { Product as IProduct, ProductCategory } from '../types';

export default class Product implements IProduct {
	id: string;
	title: string;
	description: string;
	image: string;
	category: ProductCategory;
	price: number | null;

	constructor(product: IProduct) {
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

