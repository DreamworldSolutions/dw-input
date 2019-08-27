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
import { MDCTextFieldCharacterCounter } from '@material/textfield/character-counter';
import { TextfieldStyle } from './mdc-text-field-css.js';
import { DwFormElement } from '@dw/dw-form/dw-form-element';

export class DwInput extends DwFormElement(LitElement) {
  static get styles() {
    return [
      TextfieldStyle,
      css`
        :host {
          display: block;
          outline:none;
          position: relative;
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
        
        /* Add a way to customize label color */
        .mdc-text-field--focused .mdc-text-field__input:required ~ .mdc-notched-outline .mdc-floating-label::after,
        .mdc-text-field--focused:not(.mdc-text-field--invalid):not(.mdc-text-field--disabled) .mdc-floating-label {
          color: var(--mdc-theme-primary, rgba(98, 0, 238, 0.87));
        }
        
        /* Hide right bottom corner icon */
        textarea{
          resize: none;
        }

        /* STARTS style for hide helper text when input is invalid */
        .mdc-text-field--invalid + .mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg {
          display: block;  
        }

        .mdc-text-field--invalid + .mdc-text-field-helper-line .helper-text {
          display: none;  
        }

        .mdc-text-field-helper-text--validation-msg{
          display: none;
        }
        /* ENDS style for hide helper text when input is invalid */

        /* Add a way to configure icon color */
        .mdc-text-field--outlined .mdc-text-field__icon{
          height: 24px;
          fill: var(--dw-icon-color, rgba(0, 0, 0, 0.54));
          color: var(--dw-icon-color, rgba(0, 0, 0, 0.54));
        }
        
         /* Add a way to configure disabled icon color */
        :host([disabled]) .mdc-text-field--outlined .mdc-text-field__icon {
          fill: var(--dw-icon-color-disabled, rgba(0, 0, 0, 0.38));
          color: var(--dw-icon-color-disabled, rgba(0, 0, 0, 0.38));
        }

        /* Add a way to configure idle border color */
        .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,
        .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,
        .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing {
          border-color: var(--dw-input-outlined-idle-border-color, rgba(0, 0, 0, 0.38));
        }

        /* Add a way to configure disabled border color */
        .mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__leading,
        .mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__notch,
        .mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__trailing {
          border-color: var(--dw-input-outlined-disabled-border-color, rgba(0, 0, 0, 0.06));
        }

        /* Add a way to configure hover border color */
        .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover ~ .mdc-notched-outline .mdc-notched-outline__leading,
        .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover ~ .mdc-notched-outline .mdc-notched-outline__notch,
        .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__input:hover ~ .mdc-notched-outline .mdc-notched-outline__trailing,
        .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover ~ .mdc-notched-outline .mdc-notched-outline__leading,
        .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover ~ .mdc-notched-outline .mdc-notched-outline__notch,
        .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover ~ .mdc-notched-outline .mdc-notched-outline__trailing {
          border-color: var(--dw-input-outlined-hover-border-color, rgba(0, 0, 0, 0.87));
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
       * Sets floating label value.
       */
      label: { type: String },

      /**
       * Set to `true` to disable this input.
       */
      disabled: { type: Boolean },

      /**
       * Helper text to display below the input. Display default only when focused.
       */
      hint: { type: String },

      /**
       * Set to `true` to mark the input as required. Displays error state if value is empty and input is blurred.
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
       * Leading icon to display in input
       */
      prefixSvgIcon: { type: String },

       /**
       * Trailing icon to display in input
       */
      sufixSvgIcon: { type: String },

      /**
       * A placeholder text in addition to the label.
       */
      placeholder: { type: String },
      
      /**
       * Message to show in the error color when the textfield is invalid. 
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
      multiline: { type: Boolean },
      
      /**
       * The initial number of rows for text-field
       */
      rows: { type: Number },
      
      isDense: { type: Boolean },

      /**
       * Always show the helper text despite focus.
       */
      hintPersistent: { type: Boolean },

      /**
       * Maximum length to accept input.
       */
      maxLength: { type: Number },

      /**
       * Display character counter with max length. Note: requries maxLength to be set.
       */
      charCounter: { type: Boolean },
    };
  }

  render() {
    
    const wrapperClasses = {
      'mdc-text-field--disabled': this.disabled,
      'mdc-text-field--no-label': !this.label,
      'mdc-text-field--with-leading-icon': this.prefixSvgIcon ? true : false,
      'mdc-text-field--with-trailing-icon': this.sufixSvgIcon ? true : false,
      'mdc-text-field--textarea': this.multiline,
      'mdc-text-field--dense': this.isDense && !this.multiline
    };

    const labelClasses = {
      'mdc-floating-label--float-above': (this._textFieldInstance && this._textFieldInstance.foundation_.isFocused_) || this.value || this.value === 0
    };

    const helperTextClasses = {
      'mdc-text-field-helper-text--persistent': this.hintPersistent
    };
    
    return html`
    
      <div class="mdc-text-field mdc-text-field--outlined ${classMap(wrapperClasses)}">

        ${this.prefixSvgIcon
          ? html`<span class="mdc-text-field__icon">${unsafeHTML(this.prefixSvgIcon)}</span>`
          : html``
        }

        ${this.sufixSvgIcon
          ? html`<span class="mdc-text-field__icon">${unsafeHTML(this.sufixSvgIcon)}</span>`
          : html``
        }

        ${this.multiline ? html`${ this.textareaTemplate}` : html`${this.inputTemplate}`}

        <div class="mdc-notched-outline">
          <div class="mdc-notched-outline__leading"></div>
          <div class="mdc-notched-outline__notch">
            ${this.label
              ? html`<label for="tf-outlined" class="mdc-floating-label ${classMap(labelClasses)}">${this.label}</label>`
              : html``
            }
          </div>
          <div class="mdc-notched-outline__trailing"></div>
        </div>
      </div>
      
      ${this.hint || this.errorMessage || this.charCounter
        ? html` 
          <div class="mdc-text-field-helper-line">
            <div class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg">${this.errorMessage}</div>
            <div class="mdc-text-field-helper-text helper-text ${classMap(helperTextClasses)}">${this.hint}</div>
            ${this.charCounter ? html`<div class="mdc-text-field-character-counter"></div>` : html``}
          </div>`
        : html``
      }
    `;
  }

  constructor() {
    super();
    this.disabled = false;
    this.required = false;
    this.readOnly = false;
    this.placeholder = '';
    this.value = '';
    this.errorMessage = '';
    this.name = '';
    this.pattern = '(.*?)';
    this.invalid = false;
    this.autoSelect = false;
    this.multiline = false;
    this.rows = 2;
    this.isDense = false;
    this.hintPersistent = false;
    this.charCounter = false;
    this.maxLength = 524288;
  }

  get inputTemplate() { 
    return html`
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
        .maxLength="${this.maxLength}"
        ?charCounter="${this.charCounter}"
        @keypress="${this._preventInvalidInput}"
        @input="${this._onInput}"
        @blur="${this._onInputBlur}"
        @focus="${this._onFocus}">
    `;
  }

  get textareaTemplate() {
    return html`
      <textarea id="tf-outlined"
        class="mdc-text-field__input"
        rows="${this.rows}"
        .value="${this.value}"
        .name="${this.name}"
        ?disabled="${this.disabled}"
        ?required="${this.required}"
        ?readonly="${this.readOnly}"
        .maxLength="${this.maxLength}"
        ?charCounter="${this.charCounter}"
        .placeholder="${this.placeholder}"
        @input="${this._onInput}"
        @blur = "${this._onInputBlur}" >
      </textarea>
    `;
  }

  firstUpdated() {
    const el = this.shadowRoot.querySelector('.mdc-text-field');
    this._textFieldInstance = new MDCTextField(el);
    this._textFieldInstance.useNativeValidation = false;
    new MDCTextFieldCharacterCounter(document.querySelector('.mdc-text-field-character-counter'));
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

    if (this.invalid) { 
      this.validate();
    }
    
    this.value = this._textFieldInstance.value;

    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value: this._textFieldInstance.value }
    }));

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
   * Performs validatio of input
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