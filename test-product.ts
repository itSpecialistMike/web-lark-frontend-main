import Product from './src/models/Product';

// Тестовые данные (из твоего Postman)
const mockProductData = {
	id: "854cef69-976d-4c2a-a18c-2aa45046c390",
	description: "Если планируете решать задачи в тренажёре, берите два.",
	image: "/5_Dots.svg",
	title: "+1 час в сутках",
	category: "софт-скил" as const, // as const говорит TS что это конкретное значение
	price: 1000
};

// Создаем экземпляр модели
const product = new Product(mockProductData);

// Проверяем
console.log('Product created:', product.title);
console.log('Is available?', product.isAvailable());
console.log('Price:', product.price);