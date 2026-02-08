// views/OrderForm.ts
import Modal from '../models/Modal';
import { EventEmitter } from '../components/base/events';
import { cloneTemplate } from '../utils/utils';

export default class OrderForm extends Modal {
	private events: EventEmitter;
	private template: HTMLTemplateElement;
	private payment: 'card' | 'cash' | null = null;
	private cardButton: HTMLButtonElement;
	private cashButton: HTMLButtonElement;
	private addressField: HTMLInputElement;
	private nextButton: HTMLButtonElement;

	constructor(events: EventEmitter) {
		super('modal-container')
		this.events = events;
		this.template = cloneTemplate('#order');

		// this.setContent(this.template);
		this.addressField = this.template.querySelector('input[name="address"]');
		this.cardButton = this.template.querySelector('button[name="card"]');
		this.cashButton = this.template.querySelector('button[name="cash"]');
		this.nextButton = this.template.querySelector('button[type="submit"]');

		this.cardButton.addEventListener('click', () => {
			this.payment = 'card';
			this.cardButton.classList.remove('button_alt');
			this.cashButton.classList.add('button_alt');
			this.validate();
		});

		this.cashButton.addEventListener('click', () => {
			this.payment = 'cash';
			this.cashButton.classList.remove('button_alt');
			this.cardButton.classList.add('button_alt');
			this.validate();
		});

		this.addressField.addEventListener('input', () => this.validate());

		this.template.addEventListener('submit', (e) => {
			e.preventDefault();

			if (!this.payment) return;

			this.events.emit('order:step1', {
				payment: this.payment,
				address: this.addressField.value,
			})
		});
	}

	open() {
		this.setContent(this.template); // да костыль, не осуждайте
		super.open();
	}

	private validate() {
		this.nextButton.disabled = !this.payment || !this.addressField.value.trim();
	}
}