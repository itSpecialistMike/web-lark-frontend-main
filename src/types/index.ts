// types/index.ts
// Тип категории продукта
export type ProductCategory =
	| 'софт-скил'
	| 'хард-скил'
	| 'дополнительное'
	| 'кнопка'
	| 'другое';

// Интерфейс продукта
export interface Product {
	id: string;
	title: string;
	description: string;
	image: string;
	category: ProductCategory;
	price: number | null;
}

// Интерфейс товара в корзине
export interface CartItem {
	id: string;
	title: string;
	price: number;
	quantity: number;
	image: string;
}

// Интерфейс корзины
export interface CartData {
	items: CartItem[];
	total: number;
	count: number;
}

// Интерфейс формы заказа
export interface OrderFormData {
	payment: 'card' | 'cash';
	address: string;
	email: string;
	phone: string;
}

// Интерфейс для запроса к /order
export interface OrderRequest extends OrderFormData {
	total: number;
	items: string[];
}

export interface OrderResponse {
	id: string;
	total: number;
}

