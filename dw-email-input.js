import { DwInput } from './dw-input';

export class DwEmailInput extends DwInput {
  constructor() {
    super();
    this.type = 'email';
    this.errorMessages = { typeMismatch: 'Invalid Email' };
  }
}

customElements.define('dw-email-input', DwEmailInput);
