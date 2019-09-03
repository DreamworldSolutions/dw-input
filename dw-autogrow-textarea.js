/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css } from 'lit-element';
import { DwFormElement } from '@dw/dw-form/dw-form-element';
import { styleMap } from 'lit-html/directives/style-map.js';
export class DwAutogrowTextarea extends DwFormElement(LitElement) {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          outline:none;
        }

        :host[hidden] {
          display: none;
        }

        :host([readOnly]) textarea {
          opacity: 0.3;
          pointer-events: none;
        }

        textarea {
          font-size: 20px;
          height: 42px;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          resize: none;
          border: none;
          padding: var(--dw-autogrow-textarea-padding, 8px);
          margin: var(--dw-autogrow-textarea-margin, 0px);
          width: var(--dw-autogrow-textarea-width, 100%); 
          background-color: var(--dw-autogrow-textarea-background-color, inherit);
          color: var(--dw-autogrow-textarea-color, inherit);
        }

        textarea:focus {
          outline:none;
        }
      `
    ];
  }

  static get properties() {
    return {
      /**
       * The name of input element
       */
      name: { type: String },

      /**
       * Represent textarea value.
       */
      value: { type: String },

      /**
       * By default it is true. Set false to display textarea in its min height
       * When it is false, then enter is not allowed
       */
      autoGrow: { type: Boolean },

      /**
       * Minimum height of textarea
       */
      minHeight: { type: Number },

      /**
       * Max height of textarea. After that vertical scroll is available.
       */
      maxHeight: { type: Number },

      /**
       * Set to true to make input field readonly.
       */
      readOnly: { type: Boolean, reflect: true },

      /**
       * Set to `true` to mark the input as required.
       */
      required: { type: Boolean },

      /**
       * A placeholder for textarea.
       */
      placeholder: { type: String },

      /**
       * A reference to the textarea element.
       */
      _textarea: {
        type: Object
      }
    };
  }

  render() {
    return html`
      <textarea id="autogrow-textarea"
        style=${styleMap(this._textareaStyle())}
        .value="${this.value}"
        .name="${this.name}"
        ?disabled="${this.disabled}"
        ?required="${this.required}"
        ?readonly="${this.readOnly}"
        .placeholder="${this.placeholder}"
        @input="${this._onInput}"
        @blur="${this._onInputBlur}"
        @cut="${this.resize}"
        @paste="${this.resize}"
        @keydown="${this._onKeyDown}">
      </textarea>`;
  }

  constructor() {
    super();
    this.name = '';
    this.value = '';
    this.disabled = false;
    this.required = false;
    this.placeholder = '';
    this.readOnly = false;
    this.autoGrow = true;
  }

  firstUpdated() {
    super.firstUpdated && super.firstUpdated();
    this._textarea = this.shadowRoot.querySelector('#autogrow-textarea');

    //Set intial value to textarea.
    this._textarea.value = (this.value) ? this.value : null;
  }

  disconnectedCallback() {
    if (this._textarea) {
      this._textarea = null;
    }
    super.disconnectedCallback();
  }

  /**
   * Call this to set focus in the input.
   * @public
   */
  focus() {
    this._textarea.focus();
  }

  /**
   * Set focus to end of text.
   * @protected
   */
  focusToEnd() {
    if (typeof this._textarea.selectionStart == "number") {
      this._textarea.selectionStart = this._textarea.selectionEnd = this._textarea.value.length;
      this._textarea.focus();
    } else if (typeof ele.createTextRange != "undefined") {
      this._textarea.focus();
      let range = this._textarea.createTextRange();
      range.collapse(false);
      range.select();
    }
  }

  /**
   * Call this to remove focus in the input.
   * @public
   */
  blur() {
    this._textarea.blur();
  }

  /**
   * Call this to perform validation of the textarea.
   * @public
   */
  validate() {
    return this._textarea.checkValidity();;
  }

  /**
   * Call this to reset texarea size and value.
   * @public
   */
  reset() {
    if (this._textarea) {
      this._textarea.value = '';
    }
    this.value = '';
    window.setTimeout(() => {
      this.resize();
    }, 0);
  }

  /**
   * Resize input based on content.
   * @public
   */
  resize() {
    if (!this.autoGrow) {
      return;
    }

    this._textarea.style.height = (this.minHeight) ? this.minHeight + 'px' : 'auto';
    let computed = window.getComputedStyle(this._textarea);
    let height = parseInt(computed.getPropertyValue('border-top-width'), 0)
      + this._textarea.scrollHeight
      + parseInt(computed.getPropertyValue('border-bottom-width'), 0);
    this._textarea.style.height = height + 'px';
  }

  /**
   * Invoked when any key down on `textarea`.
   * @protected
   */
  _onKeyDown(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      this._onEnterKeyDown(e);
      return;
    }

    if (keyCode === 27) {
      this._onEscKeyDown(e);
    }
  }

  /**
   * Invoked when `enter` key press on `textarea`.
   * @protected
   */
  _onEnterKeyDown(e) {
    this.dispatchEvent(new CustomEvent('enter', {
      detail: { value: this._textarea.value, event: e }
    }));

    if (!this.autoGrow) {
      e.preventDefault();
      return false;
    }
  }

  /**
   * Invoked when `esc` key press on `texarea`.
   * @protected
   */
  _onEscKeyDown(e) {
    this.dispatchEvent(new CustomEvent('esc', {
      detail: { value: this._textarea.value, event: e }
    }));
  }

  /**
   * @returns {Object} - Text area style based on `autoGrow`, `minHeight` and `maxHeight` property.
   * @protected
   */
  _textareaStyle() {
    if (!this.autoGrow) {
      return {
        'min-height': this.minHeight + 'px',
      }
    }

    return {
      'min-height': this.minHeight + 'px',
      'max-height': this.maxHeight + 'px'
    }
  }

  /**
   * Invoked when user type in the input.
   * Triggers `value-changed` event.
   * @protected
   */
  _onInput() {
    this.resize();
    this.value = this._textarea.value;
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value: this.value }
    }));
  }

  /**
   * Invokes on input blur.
   * Validates input value.
   * Trigger `blur` event.
   * @protected
   */
  _onInputBlur(e) {
    this.dispatchEvent(new CustomEvent('blur', {
      detail: { value: this._textarea.value, event: e }
    }));
    this.validate();
  }
}

window.customElements.define('dw-autogrow-textarea', DwAutogrowTextarea);