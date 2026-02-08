// views/Succes.ts
import Modal from '../models/Modal';
import { cloneTemplate } from '../utils/utils';

export default class Success extends Modal{
	private template:HTMLElement;
	private closeSuccessButton:HTMLElement;

	constructor() {
		super('modal-container');
		this.template = cloneTemplate('#success');
		this.closeSuccessButton = this.template.querySelector('.order-success__close');

		this.closeSuccessButton.addEventListener('click', () => {
			super.close();
		})
	}

	render(total: number){
		this.template.querySelector('.order-success__description').textContent = `Списано ${total} синапсов`;
	}

	open(): void {
		this.setContent(this.template);
		super.open();
	}
}