import { EventEmitter } from './src/components/base/events';
import Cart from './src/models/Cart';
import Product from './src/models/Product';

const events = new EventEmitter();
const cart = new Cart(events);

// Подписываемся на события
events.on('cart:updated', (data) => {
	console.log('Cart updated:', data);
});

// Создаем тестовый товар
const product = new Product({
	id: '1',
	title: 'Тест',
	description: '...',
	image: '/test.jpg',
	category: 'другое',
	price: 100
});

// Тестируем
cart.addItem(product);
console.log('Total:', cart.getTotal());
//console.log('Items in cart:', cart.items); // Если сделаешь геттер