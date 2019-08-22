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
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { MDCTextField } from '@material/textfield';
import { TextfieldStyle } from './mdc-text-field-css.js';
import { DwFormElement } from '@dw/dw-form/dw-form-element';

export class DwInput extends DwFormElement(LitElement) {
  static get styles() {
    return [
      TextfieldStyle,
      css`
        :host {
          --mdc-theme-primary: var(--primary-color);
          --mdc-theme-secondary: var(--accent-color);
          --mdc-theme-on-primary: var(--primary-text-color);
          --mdc-theme-on-secondary: var(--secondary-text-color);
          --mdc-theme-error: var(--error-color);
          
          display: block;
          outline:none;
        }

        :host[hidden] {
          display: none;
        }

        :host([disabled]),
        :host([readOnly]){
          pointer-events: none;
        }

        .mdc-text-field{
          width: 100%;
        }
        
        .mdc-text-field--focused .mdc-text-field__input:required ~ .mdc-notched-outline .mdc-floating-label::after,
        .mdc-text-field--focused:not(.mdc-text-field--invalid):not(.mdc-text-field--disabled) .mdc-floating-label {
          color: var(--primary-color, rgba(98, 0, 238, 0.87));
        }
        
        textarea{
          resize: none;
        }

        /* STARTS style for hide helper text when input is invalid */
        .mdc-text-field--invalid + .mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg {
          display: block;  
        }

        .mdc-text-field--invalid + .mdc-text-field-helper-line .mdc-text-field-helper-text--persistent {
          display: none;  
        }

        .mdc-text-field-helper-text--validation-msg{
          display: none;
        }
        /* ENDS style for hide helper text when input is invalid */

        /* Change prefix color icon when input is invalid */
        .mdc-text-field--invalid.mdc-text-field--with-leading-icon:not(.mdc-text-field--disabled) .mdc-text-field__icon{
          color: var(--mdc-theme-error, #b00020)
        }

        .mdc-text-field--outlined .mdc-text-field__icon{
          height: 24px;
          fill: var(--icon-fill-color, rgba(0, 0, 0, 0.54));
          color: var(--icon-fill-color, rgba(0, 0, 0, 0.54));
        }
  
        :host([disabled]) .mdc-text-field--outlined .mdc-text-field__icon {
          fill: var(--disabled-text-color, rgba(0, 0, 0, 0.38));
          color: var(--disabled-text-color, rgba(0, 0, 0, 0.38));
        }
      `
    ];
  }

  static get properties() {
    return {
      /**
       * A reference to the input element.
       */
      _textFieldInstance: {
        type: Object
      },

      /**
       * The name of input element
       */
      name: { type: String },

      /**
       * Current input value entered by user
       */
      value: { type: String },

      /**
       * The label for this element.
       */
      label: { type: String },

      /**
       * Set to `true` to disable this input.
       */
      disabled: { type: Boolean },

      /**
       * Set to `true` for input without label.
       */
      noLabel: { type: Boolean },

      /**
       * Set this to show input with helper text
       */
      hintText: { type: String },

      /**
       * Set to `true` to mark the input as required.
       */
      required: { type: Boolean },

      /**
       * A pattern to validate the `input` with. Checked during `validate()`.
       * 
       */
      pattern: { type: String },

      /**
       * Set this to specify the pattern allowed by user. Checked at the time user types in the textfield.
       */
      allowedPattern: { type: String },
      
      /**
       * A name of prefix icon
       */
      prefixSvgIcon: { type: String },

       /**
       * A name of suffix icon
       */
      sufixSvgIcon: { type: String },

      /**
       * A placeholder text in addition to the label.
       */
      placeholder: { type: String },
      
      /**
       * The error message to display when the input is invalid.
       */
      errorMessage: { type: String },

      /**
       * Set to true to make input field readonly.
       */
      readOnly: { type: Boolean},

      /**
       * Set this to apply custom validation of input
       * It must be return Boolean
       */
      validator: { type: Function },

      /**
       *  True if the last call to `validate` is invalid.
       */
      invalid: { type: Boolean },

      /**
       * Set to true to auto-select text on focus
       */
      autoSelect: { type: Boolean },

      /**
       * Set to true show input as a text-area
       */
      isTextField: { type: Boolean },
      
      /**
       * The initial number of rows for text-field
       */
      rows: { type: Number },
    };
  }

  render() {
    
    const classes = {
      'mdc-text-field--disabled': this.disabled,
      'mdc-text-field--no-label': this.noLabel,
      'mdc-text-field--with-leading-icon': this.prefixSvgIcon ? true : false,
      'mdc-text-field--with-trailing-icon': this.sufixSvgIcon ? true : false,
      'mdc-text-field--textarea': this.isTextField
    };

    const classesForLabel = {
      'mdc-floating-label--float-above': (this._textFieldInstance && this._textFieldInstance.foundation_.isFocused_) || this.value || this.value === 0
    };
    
    return html`
    
      <div class="mdc-text-field mdc-text-field--outlined ${classMap(classes)}">

        ${this.prefixSvgIcon
          ? html`<span class="mdc-text-field__icon">${unsafeHTML(this.prefixSvgIcon)}</span>`
          : html``
        }

        ${this.sufixSvgIcon
          ? html`<span class="mdc-text-field__icon">${unsafeHTML(this.sufixSvgIcon)}</span>`
          : html``
        }

        ${this.isTextField
          ? html`
            <textarea id="tf-outlined"
            class="mdc-text-field__input"
            rows="${this.rows}"
            .value="${this.value}"
            .name="${this.name}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            ?readonly="${this.readOnly}"
            .placeholder="${this.placeholder}"
            @input="${this._onInput}"
            @blur="${this._onInputBlur}">
            </textarea>

          ` : html`
            <input type="text"
            id="tf-outlined"
            class="mdc-text-field__input"
            .value="${this.value}"
            .name="${this.name}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            ?readonly="${this.readOnly}"
            .pattern="${this.pattern}"
            .placeholder="${this.placeholder}"
            @keypress="${this._preventInvalidInput}"
            @input="${this._onInput}"
            @blur="${this._onInputBlur}"
            @change="${this._triggerChangeEvent}"
            @focus="${this._onFocus}">
        `}

        <div class="mdc-notched-outline">
          <div class="mdc-notched-outline__leading"></div>
          <div class="mdc-notched-outline__notch">
            ${this.noLabel
              ? html``
              : html`<label for="tf-outlined" class="mdc-floating-label ${classMap(classesForLabel)}">${this.label}</label>`
            }
          </div>
          <div class="mdc-notched-outline__trailing"></div>
        </div>
      </div>
      
      ${this.hintText || this.errorMessage
        ? html` 
          <div class="mdc-text-field-helper-line">
            <div class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg">${this.errorMessage}</div>
            <div class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent">${this.hintText}</div>
          </div>`
        : html``
      }
    `;
  }

  constructor() {
    super();
    this.disabled = false;
    this.noLabel = false;
    this.required = false;
    this.readOnly = false;
    this.placeholder = '';
    this.value = '';
    this.errorMessage = '';
    this.name = '';
    this.pattern = '(.*?)';
    this.invalid = false;
    this.autoSelect = false;
    this.isTextField = false;
    this.rows = 2;
  }

  firstUpdated() {
    const el = this.shadowRoot.querySelector('.mdc-text-field');
    this._textFieldInstance = new MDCTextField(el);
    this._textFieldInstance.useNativeValidation = false;
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    if (this._textFieldInstance) {
      this._textFieldInstance.destroy();
      this._textFieldInstance = null;
    }
  }

  updated(changedProps) { 
    if (changedProps.has('value') && this.invalid) { 
      this.validate();
    }
  }

  /* Call this to set focus in the input */
  focus() {
    this._textFieldInstance.focus();
  }

  /* Call this to select text of the input */
  selectText(){
    this._textFieldInstance.input_.select();
  }

  /* Call this to perform validation of the input */
  validate() { 
    let isValid = this._getInputValidity();

    //Updating value only if it's changed because it's setting label as float
    // on `_textFieldInstance.valid` set which shows jerk in label. 
    if (this._textFieldInstance.valid !== isValid) { 
      this._textFieldInstance.valid = isValid;
    }

    this.invalid = !isValid;
    return isValid;
  }

  /**
   * invokes on keys press
   * If `allowedPattern` is available then checks input validitiy again allowedPattern
   * If it's invalid, stops propagation of the event
   * `keypress` event is not triggers for pasted value so it's validation will perform on `input` event
   */
  _preventInvalidInput(event) {
    if (!this.allowedPattern) {
      return;
    }

    let isValid = this._isValidValue(event.key);
    if (!isValid) {
      event.preventDefault();
    }

    this._patternAlreadyChecked = true;
  }

  /**
   * Validates pasted value
   * Triggers `value-changed` event
   */
  _onInput() {
    // Validate value if not already validate like pasted value
    if (this.allowedPattern && !this._patternAlreadyChecked) { 
      this._checkPatternValidity();
    }

    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value: this._textFieldInstance.value }
    }));

    this.value = this._textFieldInstance.value;
    this._patternAlreadyChecked = false;
  }

  /**
   * Validates value against `allowedPattern` 
   * If value is invalid, clears input value
   */
  _checkPatternValidity() { 
    for (let i = 0; i < this._textFieldInstance.value.length; i++) {
      let isValid = this._isValidValue(this._textFieldInstance.value[i]);

      if (!isValid) {
        this._textFieldInstance.value = '';
      }
    }
  }

  /**
   * checks `value` again `allowedPattern`
   * Returns true if value is valid 
   */
  _isValidValue(value) { 
    return RegExp(this.allowedPattern).test(value);
  }

  /**
   * Invokes on input focus
   * Selects input text if `autoSelect` property is true
   */
  _onFocus() { 
    if (this.autoSelect) { 
      this.selectText();
    }
  }

  /**
   * Invokes on input blur
   * Validates input value
   */
  _onInputBlur() { 
    this.validate();
  }

  /**
   * Perfomrs validatio of input
   * It also invokes `validator` if provided
   * Returns true if validation is passed
   */
  _getInputValidity() { 
    let isValid = this._textFieldInstance.input_.checkValidity();

    if (!isValid) { 
      return false;
    }

    if (this.validator) { 
      isValid = this.validator(this.value);
    }

    return isValid;
  }
}

window.customElements.define('dw-input', DwInput);