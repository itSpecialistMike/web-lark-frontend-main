type ProductCategory =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

type PaymentMethod = "online" | "offline";

interface Product {
	id: string;
	description: string;
	image: string;
	title: string;
	category: ProductCategory;
	price: number | null;
}

interface ProductsResponse {
	id: string;
	items: Product[];
}

interface OrderRequest {
	payment: PaymentMethod;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

interface OrderResponse {
	id: string;
	total: number;
}

interface ApiError {
	error: string;
}

// GET /product/
type ProductsApiResponse =
	| { total: number; items: Product[] }  // Успех (200)
	| { error: string };                   // Ошибка (404, 500...)

// GET /product/{id}
type ProductApiResponse =
	| Product                              // Успех (200)
	| { error: string };                   // Ошибка (404)

// POST /order
type OrderApiResponse =
	| { id: string; total: number }        // Успех (200)
	| { error: string };                   // Ошибка (400)

// Для формы создания заказа
type OrderFormData = Omit<OrderRequest, 'total'> & {
	total?: number; // Пока не рассчитана
};

// Тип для отображения товара в корзине
interface CartItem extends Product {
	quantity: number;
	inCart: boolean;
}

// Тип для состояния корзины
interface CartState {
	items: CartItem[];
	total: number;
	isLoading: boolean;
}

// Строгий тип для email
type Email = `${string}@${string}.${string}`;

// Строгий тип для телефона (русский формат)
type Phone = `+7${string}`;

// Строгий тип для UUID
type UUID = `${string}-${string}-${string}-${string}-${string}`;

// Улучшенный интерфейс заказа
interface StrictOrderRequest {
	payment: PaymentMethod;
	email: Email;
	phone: Phone;
	address: string;
	total: number;
	items: UUID[];
}

// Хук для продуктов
interface UseProducts {
	products: Product[];
	loading: boolean;
	error: string | null;
	refetch: () => Promise<void>;
}

// Хук для заказа
interface UseOrder {
	createOrder: (data: OrderRequest) => Promise<OrderResponse>;
	loading: boolean;
	error: string | null;
	reset: () => void;
}