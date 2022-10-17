import { html, css, LitElement } from '@dreamworld/pwa-helpers/lit.js';
import '../dw-textarea';

class DwAutogrowTextareaDemo extends LitElement {
  static get styles() {
    return [
      css`
        :host{
          display: block;
        }
        dw-textarea {
          max-width: 300px;
          background-color: #0000001a;
          margin-bottom: 24px;
          --dw-textarea-padding: 8px;
        }
      `
    ];
  }

  render() {
    
    return html`
      <h4>Auto grow textarea</h4>
      <dw-textarea .minHeight=${42} 
        .maxHeight=${154}
        .placeholder=${"Enter a new value"} 
        @esc=${this._onEscKey} 
        @enter=${this._onEnter} 
        @value-changed=${this._onValueChange}
        @blur=${this._onBlur}>
      </dw-textarea>

      <h4>Fix hieght textarea</h4>
      <dw-textarea .minHeight=${52} .maxHeight=${52} 
        .placeholder=${"Enter a new value"} 
        @esc=${this._onEscKey} 
        @enter=${this._onEnter} 
        @value-changed=${this._onValueChange}
        @blur=${this._onBlur}>
      </dw-textarea>

      <h4>Disabled enter</h4>
      <dw-textarea .minHeight=${52} .maxHeight=${52} 
        .placeholder=${"Enter a new value"} 
        @esc=${this._onEscKey} 
        @enter=${this._onEnter} 
        @value-changed=${this._onValueChange}
        @blur=${this._onBlur}
        .disabledEnter=${true}>
      </dw-textarea>
    `;
  }

  _onEscKey(e) {
    console.log("on esc key", e.detail);
  }
  
  _onEnter(e) {
    console.log("on enter", e.detail);
  }

  _onValueChange(e) {
    console.log("on value changed", e.detail);
  }

  _onBlur(e){
    console.log("on blur", e.detail);
  }
}

window.customElements.define('dw-autogrow-textarea-demo', DwAutogrowTextareaDemo);