// views/ContentForm.ts
import Modal from '../models/Modal';
import { EventEmitter } from '../components/base/events';
import { cloneTemplate } from '../utils/utils';

export default class ContentForm extends Modal {
	private events: EventEmitter;
	private template: HTMLTemplateElement;
	private phoneField: HTMLInputElement;
	private emailField: HTMLInputElement;
	private submitBtn: HTMLButtonElement;

	constructor(events: EventEmitter) {
		super('modal-container')
		this.events = events;
		this.template = cloneTemplate('#contacts');

		this.phoneField = this.template.querySelector('input[name="phone"]');
		this.emailField = this.template.querySelector('input[name="email"]');
		this.submitBtn = this.template.querySelector('button[type="submit"]');

		// Просто проверяем заполненность полей
		this.phoneField.addEventListener('input', () => this.validate());
		this.emailField.addEventListener('input', () => this.validate());

		this.template.addEventListener('submit', (e) => {
			e.preventDefault();
			this.events.emit('order:step2', {
				phone: this.phoneField.value,
				email: this.emailField.value,
			})
		});
	}

	open() {
		this.setContent(this.template);
		this.validate();
		super.open();
	}

	// Простейшая валидация - просто проверяем что поля не пустые
	private validate() {
		const hasEmail = this.emailField.value.includes('@') && this.emailField.value.length > 5;
		const hasPhone = this.phoneField.value.replace(/\D/g, '').length >= 10;

		this.submitBtn.disabled = !hasEmail || !hasPhone;
	}
}