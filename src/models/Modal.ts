// models/Modal.ts
export default class Modal {
	protected container: HTMLElement;
	protected closeButton: HTMLElement;
	protected content: HTMLElement;

	constructor(containerId: string) {
		const container = document.getElementById(containerId);

		if (!container) {
			throw new Error(`No container with id ${containerId}`);
		}

		this.container = container;
		this.closeButton = this.container.querySelector('.modal__close');
		this.content = this.container.querySelector('.modal__content');

		if (!this.content || !this.closeButton) {
			throw new Error(`Required modal elements not found`);
		}

		this.setupEventListeners()
	}

	protected setupEventListeners(): void {
		this.closeButton.addEventListener('click', () => this.close())
		this.container.addEventListener('click', (e) => {
			if (e.target === this.container) {
				this.close();
			}
		});

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && this.isOpened()) {
				this.close();
			}
		});
	}

	open():void {
		this.container.classList.add('modal_active');
	}

	close(): void {
		this.container.classList.remove('modal_active');
	}

	isOpened(): boolean {
		return this.container.classList.contains('modal_active');
	}

	setContent(content: HTMLElement): void {
		this.content.innerHTML = ''
		this.content.appendChild(content);
	}

	clearContent(): void {
		this.content.innerHTML = ''
	}

}