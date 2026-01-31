// types/index.ts
export type ProductCategory =
	| 'софт-скил'
	| 'хард-скил'
	| 'дополнительное'
	| 'кнопка'
	| 'другое';

export interface Product {
	id: string;
	title: string;
	description: string;
	image: string;
	category: ProductCategory;
	price: number | null;
}

// Тип для товара в корзине
export interface CartItem {
	id: string;
	title: string;
	price: number;
	quantity: number;
	image: string;
}

export interface CartData {
	items: CartItem[];
	total: number;
	count: number;
}