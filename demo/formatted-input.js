import { DwInput } from '../dw-input.js';
import '@material/mwc-switch';
import '@material/mwc-formfield';

class FormattedInput extends DwInput {

  formatText(value) { 
    value = value.toString();
    value = value.replace(/,/g, '');
    value = value.replace(/ /g, '');
    return Number(value).toLocaleString();
  }

  parseValue(text) { 
    text = text.replace(/,/g, '');
    text = text.replace(/ /g, '');
    return Number(text);
  }

}

window.customElements.define('formatted-input', FormattedInput);