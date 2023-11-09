/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, css, LitElement, nothing } from '@dreamworld/pwa-helpers/lit.js';
import { classMap } from 'lit/directives/class-map.js';
import {repeat} from 'lit/directives/repeat.js';
import {styleMap} from 'lit/directives/style-map.js';
import { MDCTextField } from '@material/textfield/index.js';
import { MDCTextFieldCharacterCounter } from '@material/textfield/character-counter/index.js';
import { TextfieldStyle } from './mdc-text-field-css.js';
import { DwFormElement } from '@dreamworld/dw-form/dw-form-element.js';
import '@dreamworld/dw-icon-button/dw-icon-button.js';
import './dw-textarea.js';
import '@dreamworld/dw-tooltip';
import '@dreamworld/dw-button';
import { unsafeHTML } from "lit/directives/unsafe-html.js";


const defaultErrorMessages = {
  badInput: 'Bad input',
  patternMismatch: 'Pattern is mismatched',
  rangeOverflow: 'Range is overflowed',
  rangeUnderflow: 'Range is underflowed',
  stepMismatch: 'Step is mismatched',
  tooLong: 'Too long',
  tooShort: 'Too short',
  typeMismatch: "Type is mismatched",
  valueMissing: "Required"
};

export class DwInput extends DwFormElement(LitElement) {
  static get styles() {
    return [
      TextfieldStyle,
      css`
        :host {
          display: block;
          outline:none;
          position: relative;
          --dw-input-outlined-idle-border-color: var(--mdc-theme-text-secondary);
          --dw-input-outlined-hover-border-color: var(--mdc-theme-text-primary);
          --dw-input-outlined-disabled-border-color: var(--mdc-theme-text-disabled);
        }

        :host[hidden] {
          display: none;
        }

        :host([disabled]),
        :host([readonly]){
          pointer-events: none;
        }

        /* When input type is number, remove up-down button  */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type=number]{
          -moz-appearance: textfield;
        }

        .mdc-text-field{
          width: 100%;
        }

        :not(.mdc-text-field--focused) .mdc-text-field__input {
          white-space: var(--dw-input-white-space);
          text-overflow: var(--dw-input-text-overflow);
          overflow: var(--dw-input-overflow);
          direction: var(--dw-input-direction);
          text-align: var(--dw-input-text-align);
        }

        /* Add a way to customize label color */
        .mdc-text-field--focused .mdc-text-field__input:required ~ .mdc-notched-outline .mdc-floating-label::after,
        .mdc-text-field--focused:not(.mdc-text-field--invalid):not(.mdc-text-field--disabled) .mdc-floating-label {
          color: var(--mdc-theme-primary, rgba(98, 0, 238, 0.87));
        }

         /* STARTS: style for dark/light theme */
         .mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input{
          color: var(--dw-input-text-field-color,  var(--mdc-theme-text-primary, rgba(0, 0, 0, 0.87)))
        }

        .mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder,
        .mdc-text-field:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):not(.mdc-text-field--invalid) .mdc-floating-label{
          color: var(--mdc-theme-text-secondary ,rgba(0, 0, 0, 0.6));
        }

        .mdc-text-field.mdc-text-field--disabled .mdc-text-field__input::placeholder,
        .mdc-text-field.mdc-text-field--disabled .mdc-text-field__input,
        .mdc-text-field.mdc-text-field--disabled .mdc-floating-label{
          color: var(--mdc-theme-text-disabled ,rgba(0, 0, 0, 0.38));
        }

        .mdc-text-field:not(.mdc-text-field--disabled) + .mdc-text-field-helper-line .mdc-text-field-helper-text{
          color: var(--mdc-theme-text-secondary, rgba(0, 0, 0, 0.6));
        }
        /* ENDS: style for dark theme */

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

        /* STARTS: Change border/label color when value is changed */
        :host([_valueUpdated]) .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--invalid) .mdc-notched-outline__leading,
        :host([_valueUpdated]) .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--invalid) .mdc-notched-outline__notch,
        :host([_valueUpdated]) .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--invalid) .mdc-notched-outline__trailing,
        :host([_valueUpdated]) .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--invalid) .mdc-text-field__input:hover ~ .mdc-notched-outline .mdc-notched-outline__leading,
        :host([_valueUpdated]) .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--invalid) .mdc-text-field__input:hover ~ .mdc-notched-outline .mdc-notched-outline__notch,
        :host([_valueUpdated]) .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--invalid) .mdc-text-field__input:hover ~ .mdc-notched-outline .mdc-notched-outline__trailing,
        :host([_valueUpdated]) .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover ~ .mdc-notched-outline .mdc-notched-outline__leading,
        :host([_valueUpdated]) .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover ~ .mdc-notched-outline .mdc-notched-outline__notch,
        :host([_valueUpdated]) .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused) .mdc-text-field__icon:hover ~ .mdc-notched-outline .mdc-notched-outline__trailing{
          border-color: var(--dw-input-value-updated-color, var(--mdc-theme-primary, #02afcd));
        }
        /* ENDS: Change  border/label color when value is changed */


        /* STARTS: Style for dense field */
        .mdc-text-field--outlined.mdc-text-field--dense .mdc-text-field__input{
          padding-top: 7px;
        }

        .mdc-text-field--outlined.mdc-text-field--dense .mdc-floating-label{
          font-size: 1rem;
        }
        /* ENDS: Style for dense field */

        .mdc-text-field + .mdc-text-field-helper-line{
           position: var(--dw-input-helper-line-position, relative);
        }

        .mdc-text-field__icon{
          outline: none;
        }

        :host([clickableIcon]) dw-icon-button.mdc-text-field__icon{
          pointer-events: auto;
          cursor: pointer;
        }

        /* Add a way to customize the background color of the text field when showAsFilled is true */
        :host([showAsFilled]) .mdc-text-field:not(.mdc-text-field--disabled) {
          background-color: var(--dw-input-fill-color, whitesmoke);
        }

        :host([showAsFilled]) .mdc-text-field:not(.mdc-text-field--disabled):not(.mdc-text-field--outlined):not(.mdc-text-field--textarea) .mdc-text-field__input {
          border-bottom-color: var(--dw-input-filled-bottom-border-color, rgba(0, 0, 0, 0.42));
        }

        :host([showAsFilled]) .mdc-text-field:not(.mdc-text-field--disabled):not(.mdc-text-field--outlined):not(.mdc-text-field--textarea) .mdc-text-field__input:hover {
          border-bottom-color: var(--dw-input-filled-hover-bottom-border-color, rgba(0, 0, 0, 0.87));
        }

        :host([noHintWrap]) .mdc-text-field:not(.mdc-text-field--disabled) + .mdc-text-field-helper-line .mdc-text-field-helper-text,
        :host([noHintWrap]) .mdc-text-field--disabled + .mdc-text-field-helper-line .mdc-text-field-helper-text {
          white-space: nowrap;
        }

        /* START: prefix/suffix text style */
        :host(:not([prefixText=''])) .mdc-notched-outline__leading{
          width: auto;
        }

        .prefix-text.hide{
          visibility: hidden;
          padding-right: 8px;
        }

        .prefix-text,
        .suffix-text{
          font-family: Roboto, sans-serif;
          font-size: 1rem;
          line-height: 1.75rem;
          font-weight: 400;
          letter-spacing: 0.009375em;
          padding-top: 13px;
          padding-bottom: 14px;
          color: var(--mdc-theme-text-primary, rgba(0, 0, 0, 0.87));
        }

        .prefix-text{
          padding-left: 16px;
        }

        .suffix-text{
          padding-right: 16px;
        }

        :host([disabled]) .suffix-text {
          color: var(--mdc-theme-text-disabled-on-surface);
        }

        .mdc-text-field--dense .prefix-text,
        .mdc-text-field--dense .suffix-text{
          padding-top: 10px;
          padding-bottom: 10px;
        }
        /* END: prefix/suffix text style */

        /* STARTS warning text style */
        .mdc-text-field--focused.mdc-text-field--invalid:not(.mdc-text-field--disabled)  + .mdc-text-field-helper-line .mdc-text-field-helper-text.mdc-text-field-warning-text {
          display: none;
        }

        .mdc-text-field:not(.mdc-text-field--disabled):not(.mdc-text-field--invalid) + .mdc-text-field-helper-line .mdc-text-field-helper-text.mdc-text-field-warning-text {
          opacity: 1;
          color: var(--mdc-theme-text-warning, #FFA726);
        }

        .mdc-text-field--focused .mdc-text-field__input:required ~ .mdc-notched-outline .mdc-text-field-warning-text::after,
        .mdc-text-field--focused:not(.mdc-text-field--invalid):not(.mdc-text-field--disabled) .mdc-floating-label.mdc-text-field-warning-text,
        .mdc-text-field:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):not(.mdc-text-field--invalid) .mdc-floating-label.mdc-text-field-warning-text {
          color: var(--mdc-theme-text-warning, #FFA726);
        }

        .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--invalid) .mdc-notched-outline__leading.mdc-text-field-warning-text,
        .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--invalid) .mdc-notched-outline__notch.mdc-text-field-warning-text,
        .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--invalid) .mdc-notched-outline__trailing.mdc-text-field-warning-text,
        .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):not(.mdc-text-field--invalid) .mdc-text-field__input:hover ~ .mdc-notched-outline .mdc-notched-outline__leading.mdc-text-field-warning-text,
        .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):not(.mdc-text-field--invalid) .mdc-text-field__input:hover ~ .mdc-notched-outline .mdc-notched-outline__notch.mdc-text-field-warning-text,
        .mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):not(.mdc-text-field--invalid) .mdc-text-field__input:hover ~ .mdc-notched-outline .mdc-notched-outline__trailing.mdc-text-field-warning-text {
          border-color: var(--mdc-theme-text-warning, #FFA726);
        }
        /* END warning text style */

        :host([readonly]) {
          --dw-input-outlined-idle-border-color: var(--dw-input-outlined-readonly-idle-border-color)
        }

        :host([_valueUpdated]) .mdc-notched-outline__notch,
        :host([_valueUpdated]) .mdc-notched-outline__leading,
        :host([_valueUpdated]) .mdc-notched-outline__trailing {
          position: relative;
        }

        :host([_valueUpdated]) .mdc-notched-outline__leading::before,
        :host([_valueUpdated]) .mdc-notched-outline__trailing::before {
          content: "";
          background-color: var(--dw-input-value-updated-color, var(--mdc-theme-primary, #02afcd));
          opacity: var(--mdc-theme-on-surface-overlay-opacity-hover, 0.04);
          position: absolute;
          height: -webkit-fill-available;
          width: 100%;
        }

        :host([_valueUpdated]) .mdc-notched-outline__notch::before {
          content: "";
          background-color: var(--dw-input-outlined-updated-bg-color, var(--mdc-theme-primary, #02afcd));
          opacity: var(--mdc-theme-on-surface-overlay-opacity-hover, 0.04);
          position: absolute;
          height: -webkit-fill-available;
          width: 100%;
          top: 8px;
        }

        :host([_valueUpdated][dense]) .mdc-notched-outline__notch::before {
          top: 10px;
        }

        .mdc-text-field:not(.mdc-text-field--disabled):not(.mdc-text-field--textarea) {
          display: flex;
          align-items: center;
        }

        .error {
          --dw-icon-color: var(--mdc-theme-error, #b00020);
          cursor: pointer;
        }

        .warning {
          --dw-icon-color: var(--mdc-theme-text-warning, #FFA726);
          cursor: pointer;
        }
      `
    ];
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    this.updateComplete.then(() => {
      this._initMdcTextField();
      this._updateTextfieldValue();

      // Setting timeout here for proper label placement
      setTimeout(() => {
        if (!this._textFieldInstance) {
          console.warn('dw-input : Somehow element has been disconnected before finish layout.');
        }

        this._textFieldInstance && this._textFieldInstance.layout();
      }, 200);
    });
  }

  static get properties() {
    return {
      /**
       * The name of input element
       */
      name: { type: String },

      /**
       * Current input value entered by user
       */
      value: { type: String },

      /**
       * Input type. e.g ("text", "email", "number")
       * Default is "text"
       */
      type: { type: String },

      /**
       * When type is `number`, sets max number
       */
      maxNumber: { type: Number},

      /**
       * When type is `number`, sets min number
       */
      minNumber: { type: Number},

      /**
       * When type is `password` & `_showVisibilityIcon` is `true`, toggle this to 'text' & 'password'
       */
      _type: { type: String },

      /**
       * Used to show visibility icon when type is 'password'.
       * Default is `true`
       */
      _showVisibilityIcon: { type: Boolean },

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
       * Doens't work when custom validator is provided through `validator` property.
       */
      pattern: { type: String },

      /**
       * Set this to specify the pattern allowed by user. Checked at the time user types in the textfield.
       */
      allowedPattern: { type: String },

      /**
       * Leading icon to display in input
       */
      icon: { type: String },

       /**
       * Trailing icon to display in input
       */
      iconTrailing: { type: String },

      /**
       * Trailing and Leading icon size.
       */
      iconSize: { type: Number },

      /**
       * Trailing and Leading icon button size.
       */
      iconButtonSize: { type: Number },

      /**
       * A placeholder text in addition to the label.
       */
      placeholder: { type: String },

      /**
       * Message to show in the error color when the textfield is invalid.
       */
      error: { type: String },

      /**
       * Set to true to make input field readonly.
       */
      readOnly: { type: Boolean, reflect: true },

      /**
       * Set this to apply custom validation of input. Receives value to be validated as argument.
       * It must return Boolean.
       */
      validator: { type: Function },

      /**
       * Set to `true` when the last call to `validate` is invalid. Mostly, you don't need to manually set/change this
       * property. It's automatically updated as the part of the validation logic. Generally, validation is performed
       * on blur & value change if the current value is invalid.
       */
      invalid: { type: Boolean, reflect: true },

      /**
       * Set to true to auto-select text on focus
       */
      autoSelect: { type: Boolean },

      /**
       * Set to true show input as a text-area
       */
      multiline: { type: Boolean },

      dense: { type: Boolean },

      /**
       * Always show the helper text despite focus.
       */
      hintPersistent: { type: Boolean },

      /**
       * Mininum number of characters.
       */
      minLength: { type: Number },

      /**
       * Maximum length to accept input.
       */
      maxLength: { type: Number },

      /**
       * Display character counter with max length. Note: requires maxLength to be set to some value.
       */
      charCounter: { type: Boolean },

      /**
       * A string which used to check whether user has updated value or not
       * When `originalValue` and `value` is different input style is changed.
       * Used only when `highlightChanged=true`.
       */
      originalValue: { type: String },

      /**
       * Set to true to highLight textfield when value is changed
       * Make sure to provide `originalValue` when setting this to true
       * It will highLight field when `value` and `originalValue` is not same
       */
      highlightChanged: { type: Boolean },

      /**
       * Set this to configure custom logic to detect whether value is changed or not.
       * By default it will check by equality check of `value` and `originalValue`.
       * It must return a Boolean.
       * Function receives 2 arguments: (val1, val2). Should return `true` when both values are same otherwise `false`.
       */
      valueEqualityChecker: { type: Function },

      /**
       * Set this to true to make icon clickable.
       * Default is false
       */
      clickableIcon: { type: Boolean },

      /**
       * Minimum height of textarea
       * Applicable when `multiline` is true
       */
      minHeight: { type: Number },

      /**
       * Max height of textarea. After that vertical scroll is available.
       * Applicable when `multiline` is true
       */
      maxHeight: { type: Number },

      /**
       * Disabled enter in input.
       * Applicable when `multiline` is true
       */
      disabledEnter: { type: Boolean },

      /**
       * Set to true to trim value on input blur
       */
      truncateOnBlur: { type: Boolean },

      /**
       * Input property
       * Set to true to render input in filled style
       */
      showAsFilled: { type: Boolean, value: false, reflect: true},

      /**
       * `true` if when to show hint text in oneline. Default hint text is shown in dropdown width area in multiline.
       */
      noHintWrap: { type: Boolean, reflect: true },

      /**
       * Input property
       * provided text will be shown as the prefix text of the input
       */
      prefixText: { type: String, reflect: true },

       /**
       * Input property
       * provided text will be shown as the suffix text of the input
       */
      suffixText: { type: String },

      /**
       * True when `originalValue` available and it's not equal to `value`
       */
      _valueUpdated: { type: Boolean, reflect: true },

      /**
       * A reference to the input element.
       */
      _textFieldInstance: { type: Object },

      /**
       * Text to show the warning message.
       */
      warning: { type: String },

      /**
       * Input property
       * Type of the icon. By default it shows FILLED icon.
       * Possible values: FILLED and OUTLINED
       */
       iconFont: { type: String, reflect: true }, 

      /**
       * Whether to show hint in tooltip
       * tip trigger on hover of info, warning, and error icon button at trail.
       */
      hintInTooltip: {type: Boolean},

      /**
       * Whether to show error in tooltip
       * tip trigger on hover of info, warning, and error icon button at trail.
       */
      errorInTooltip: { type: Boolean },

      /**
       * Whether to show warning in tooltip
       * tip trigger on hover of info, warning, and error icon button at trail.
       */
      warningInTooltip: { type: Boolean },

      /**
       * Tooltip actions for hint text
       */
      hintTooltipActions: { type: Array },

      /**
       * Tooltip actions for error text
       */
      errorTooltipActions: { type: Array },

      /**
       * Tooltip actions for warning text
       */
      warningTooltipActions: { type: Array },

      /**
       * Tooltip placement
       * for more see tippyJs doc: https://atomiks.github.io/tippyjs/v6/all-props/#placement
       */
      tipPlacement: { type: String },

      /**
       * Custom error messages for default errors.
       * 
       */ 
      errorMessages: {type: Object },

      /**
       * The validity represents the validity states that an element can be in, with respect to constraint validation. Together, they help explain why an element's value fails to validate, if it's not valid.
       */
      validity: { type: Object}

      /**
       * When it's `true`, shows `Material Symbols` icon.
       * [Reference](https://fonts.google.com/icons?icon.set=Material+Symbols)
       */
      symbol: { type: Boolean },
    };
  }

  /**
   * Sets static errorMessages. Its used at application level.
   * @param {Object} errorMessages 
   */
  static setErrorMessages(errorMessages) {
    this.errorMessages = {...this.errorMessages, ...errorMessages};
  }

  constructor() {
    super();
    this.disabled = false;
    this.required = false;
    this.readOnly = false;
    this.placeholder = '';
    this._value = '';
    this.error = '';
    this.name = '';
    this.pattern = '(.*?)';
    this.invalid = false;
    this.autoSelect = false;
    this.multiline = false;
    this.dense = false;
    this.hintPersistent = false;
    this.charCounter = false;
    this.minLength = 0;
    this.maxLength = 524288;
    this.minHeight = 42;
    this.truncateOnBlur = false;
    this.showAsFilled = false;
    this.prefixText = '';
    this.suffixText = '';
    this.iconButtonSize = 24;
    this.iconSize = 24;
    this.type = "text"
    this._showVisibilityIcon = true;

    let self = this;
    this._tipButtonClickEvent = (e) => {
      const action = e.target.getAttribute("action");
      self.dispatchEvent(new CustomEvent("action", { detail: action }));
      this.renderRoot.querySelector('dw-tooltip').hide()
    }

    this._extraOptions = {
      interactive: true,
      onShow(instance) {
        const buttons = instance.popper.querySelectorAll("dw-button");
        buttons.forEach((button) => {
          button.addEventListener("mousedown", self._tipButtonClickEvent);
        });
      },
      onHide(instance) {
        const buttons = instance.popper.querySelectorAll("dw-button");
        buttons.forEach((button) => {
          button.removeEventListener("mousedown", self._tipButtonClickEvent);
        });
      },
    };
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    if (this._textFieldInstance) {
      this._textFieldInstance.destroy();
      this._textFieldInstance = null;
    }
  }

  set value(value){
    this._setValue(value);
    this._updateTextfieldValue();
  }

  get value() {
    return this._value;
  }


  updated(changedProps){
    super.updated(changedProps);
    if(changedProps.has('invalid') && this._textFieldInstance){
      this._textFieldInstance.valid = !this.invalid;
    }

    if(changedProps.has('error')){
      this.setCustomValidity(this.error || '');
      if (this.error || this.invalid) this.reportValidity();
    }
  }

  get _errorMessages() {
    const errorMessages = this.errorMessages || {};
    return {...DwInput.errorMessages, ...errorMessages }
  }

  render() {

    /**
     * 'mdc-text-field--with-trailing-icon': this.iconTrailing || ((this.hint && !this.hintInTooltip) || (this.warning && !this.warningInTooltip) || (this.invalid && !this.errorInTooltip)) ? true : false,
     * 
     * Above condition added in below wrapperClasses due to handle both trailingIcon and tooltip icons at same time. 
     */
    const wrapperClasses = {
      'mdc-text-field--disabled': this.disabled,
      'mdc-text-field--no-label': !this.label,
      'mdc-text-field--with-leading-icon': this.icon ? true : false,
      'mdc-text-field--with-trailing-icon': this.iconTrailing && (!(this.invalid && this.errorInTooltip) && !(this.warning && this.warningInTooltip) && !(this.hint && this.hintInTooltip))  ? true : false,
      'mdc-text-field--textarea': this.multiline,
      'mdc-text-field--dense': this.dense && !this.multiline,
      'mdc-text-field--outlined' : !this.showAsFilled
    };
    const labelClasses = {
      'mdc-floating-label--float-above': (this._textFieldInstance && this._textFieldInstance.foundation.isFocused_) || this.value || this.value === 0,
      'mdc-text-field-warning-text': this._warning
    };
    const warningTextClasses = {
      'mdc-text-field-warning-text': this._warning
    }

    return html`

      <div class="mdc-text-field ${classMap(wrapperClasses)}">

        ${this._getPrefixTemplate}

        ${this.multiline ? html`${ this.textareaTemplate}` : html`${this.inputTemplate}`}

        ${this._getSuffixTemplate}
        ${this._tipIconButtons}

        ${this.showAsFilled ? html`
          ${this.label
            ? html`<label for="tf-outlined" class="mdc-floating-label ${classMap(labelClasses)}">${this.label}</label>`
            : html``
          }
        ` : html`
          <div class="mdc-notched-outline">
            <div class="mdc-notched-outline__leading ${classMap(warningTextClasses)}">
              ${this.prefixText && !this.icon ? html`<span class="prefix-text hide">${this.prefixText}</span>` : ''}
            </div>
            <div class="mdc-notched-outline__notch ${classMap(warningTextClasses)}">
              ${this.label
                ? html`<label for="tf-outlined" class="mdc-floating-label ${classMap(labelClasses)}">${this.label}</label>`
                : html``
              }
            </div>
            <div class="mdc-notched-outline__trailing ${classMap(warningTextClasses)}"></div>
          </div>
        ` }

      </div>

      ${this.hint || this._error || this._warning || this.charCounter
        ? html`
          <div class="mdc-text-field-helper-line">
            ${this._renderHelperLine}
            ${this.charCounter ? html`<div class="mdc-text-field-character-counter"></div>` : html``}
          </div>`
        : html``
      }
    `;
  }

  get _renderHelperLine() {
    if (this.invalid && this._error && !this.errorInTooltip) {
      return html`
        <div class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg">
          ${this._error}
        </div>
      `;
    }

    if (this._warning && !this.warningInTooltip) {
      const warningTextClasses = {
        "mdc-text-field-warning-text": this._warning,
      };
      return html`
        <div class="mdc-text-field-helper-text ${classMap(warningTextClasses)}">
          ${this._warning}
        </div>
      `;
    }

    if (this.hint && !this.hintInTooltip) {
      const helperTextClasses = {
        "mdc-text-field-helper-text--persistent": this.hintPersistent,
      };
      return html`
        <div class="mdc-text-field-helper-text helper-text ${classMap(helperTextClasses)}">
          ${this.hint}
        </div>
      `;
    }

    return nothing;
  }
  
  get _error() {
    if(!this.invalid) return;

    const validityState = this._textFieldInstance?.input?.validity;
    let errorMsg = '';

    if (this.error) return this.error;

    for(var key in validityState){
      if(key !== 'valid' && key !== 'customError' && validityState[key]) {
        errorMsg = this._errorMessages[key];
        break;
      }
    }
    
    if(errorMsg) return errorMsg;
    return '';
  }

  get _warning() {
    return this.warning || '';
  }  

  get inputTemplate() {
    return html`
      <input
        .type="${this._type || this.type}"
        max=${this.maxNumber}
        min=${this.minNumber}
        id="tf-outlined"
        class="mdc-text-field__input"
        .name="${this.name}"
        ?disabled="${this.disabled}"
        ?required="${this.required}"
        ?readonly="${this.readOnly}"
        .pattern="${this.pattern}"
        .placeholder="${this.placeholder}"
        minlength=${this.minLength}
        .maxLength="${this.maxLength}"
        ?charCounter="${this.charCounter}"
        @keypress="${this._preventInvalidInput}"
        @paste="${this._preventInvalidInput}"
        @keydown="${this._onKeyDown}"
        @input="${this._onInput}"
        @change="${this._onChange}"
        @blur="${this._onInputBlur}"
        @focus="${this._onFocus}">
    `;
  }

  get textareaTemplate() {
    return html`
      <dw-textarea id="tf-outlined"
        class="mdc-text-field__input"
        .value="${this.value}"
        .name="${this.name}"
        ?disabled="${this.disabled}"
        ?required="${this.required}"
        ?readonly="${this.readOnly}"
        undecorated
        .placeholder="${this.placeholder}"
        .minHeight="${this.minHeight}"
        .minLength="${this.minLength}"
        .maxHeight="${this.maxHeight}"
        .maxLength="${this.maxLength}"
        .disabledEnter="${this.disabledEnter}"
        .showPlaceholderOnFocusOnly="${!!this.label}"
        @enter="${(e)=>this._dispatchEnter(e.detail.event)}"
        @esc="${(e)=>this._dispatchEsc(e.detail.event)}"
        @input="${this._onInput}"
        @change="${this._onChange}"
        @blur = "${this._onInputBlur}" >
      </dw-textarea>
    `;
  }

  /**
   * Returns prefix template based on `icon` and `prefixText` property
   */
  get _getPrefixTemplate(){
    if(this.icon){
      return html`
        <dw-icon-button class="mdc-text-field__icon" icon="${this.icon}" iconFont="${this.iconFont}" .iconSize=${this.iconSize} .buttonSize=${this.iconButtonSize} ?disabled="${this.disabled}" tabindex="${this.clickableIcon ? '' : -1}" 
                .symbol=${this.symbol}></dw-icon-button>
      `;
    }

    if(this.prefixText){
      return html`
        <span class="prefix-text">${this.prefixText}</span>
      `;
    }

  }

  /**
   * Returns suffix template based on `iconTrailing` and `suffixText` property
   */
  get _getSuffixTemplate() {
    if (this.type === "password" && this._showVisibilityIcon) {
      const icon = this._type === "text" ? "visibility" : "visibility_off";
      return html`
        <dw-icon-button
          @click=${this._toggleType}
          class="mdc-text-field__icon"
          icon="${icon}"
          .iconSize=${this.iconSize}
          tabindex=""
          .iconFont="${this.iconFont}"
          .symbol=${this.symbol}
        ></dw-icon-button>
      `;
    }

    if (this.iconTrailing) {
      return html`
        <dw-icon-button
          class="mdc-text-field__icon"
          icon="${this.iconTrailing}"
          .iconSize=${this.iconSize}
          .buttonSize=${this.iconButtonSize}
          ?disabled="${this.disabled}"
          tabindex="${this.clickableIcon ? "" : -1}"
          .symbol=${this.symbol}
        ></dw-icon-button>
      `;
    }

    if (this.suffixText) {
      return html` <span class="suffix-text">${this.suffixText}</span> `;
    }

    return nothing;
  }

  get _errorTooltipContent() {
    return this._error + this._renderTooltipActions(this.errorTooltipActions);
  }
  
  get _warningTooltipContent() {
    return this._warning + this._renderTooltipActions(this.warningTooltipActions);
  }
  
  get _hintTooltipContent() {
    return this.hint + this._renderTooltipActions(this.hintTooltipActions);
  }

  get _tipIconButtons() {
    if (this.invalid) {
      return html`
        ${this.errorInTooltip
          ? html`<dw-icon-button
                id="error"
                class="error"
                icon="${"error"}"
                tabindex="-1"
                .iconFont="${this.iconFont}"
                .symbol=${this.symbol}
              ></dw-icon-button>
              <dw-tooltip 
                for="error" 
                .extraOptions=${this._extraOptions} 
                .placement="${this.tipPlacement}" 
                .content=${this._errorTooltipContent}>
              </dw-tooltip>`
          : nothing}
      `;
    }

    if (this._warning) {
      return html`
        ${this.warningInTooltip
          ? html`<dw-icon-button
                id="warning"
                class="warning"
                icon="${'warning'}"
                tabindex="-1"
                .iconFont="${this.iconFont}"
                .symbol=${this.symbol}
              ></dw-icon-button>
              <dw-tooltip for="warning" .extraOptions=${this._extraOptions} .placement="${this.tipPlacement}" .content=${this._warningTooltipContent}></dw-tooltip>`
          : nothing}
      `;
    }

    if (this.hint) {
      return html`
        ${this.hintInTooltip
          ? html`<dw-icon-button
                id="info"
                class="info"
                icon="${"info"}"
                tabindex="-1"
                .iconFont="${this.iconFont}"
                .symbol=${this.symbol}
              ></dw-icon-button>
              <dw-tooltip 
                for="info" 
                .extraOptions=${this._extraOptions} 
                .placement="${this.tipPlacement}" 
                .content=${this._hintTooltipContent}>
              </dw-tooltip>`
          : nothing}
      `;
    }
  }

  _renderTooltipActions(actions) {
    if (!Array.isArray(actions)) {
      return '';
    }

    let buttonsHtml = '';
    actions.map((action) => {
      buttonsHtml += `<dw-button label="${action.label}" action="${action.name}" class="${action.danger? 'error' : ''}" ></dw-button>`;
    });
    return `<div style="text-align: end;"> ${buttonsHtml} </div>`
  }

  /**
   * When visibility icon is shown, toggle type between "text" & "password" & dispatch `show-password`/`hide-password` event.
   */
  _toggleType() {
    if (!this._showVisibilityIcon) {
      return;
    }
    if (this._type === 'text') {
      this.dispatchEvent(new CustomEvent('hide-password'));
      this.hidePassword();
    } else {
      this.dispatchEvent(new CustomEvent('show-password'));
      this.showPassword();
    }

    const elem = this.renderRoot && this.renderRoot.querySelector && this.renderRoot.querySelector('.mdc-text-field__input');
    const cursorPosition = elem && elem.selectionStart || 0;
    setTimeout(() => {
      if(this.type === 'password') {
        this.setCaretPosition(cursorPosition);
      } else {
        this.focus();
      }
    }, 0);
  }

  /**
   * Shows password.
   */
  showPassword() {
    this._type = 'text';
  }

  /**
   * Hides password.
   */
  hidePassword() {
    this._type = 'password';
  }

  /* Call this to set focus in the input */
  focus() {
    this.updateComplete.then(() => {
      if (!this.multiline) {
        if (!this._textFieldInstance) {
          console.warn('dw-input : element has been disconnected before focus.');
        }

        this._textFieldInstance && this._textFieldInstance.focus();
      } else {
        const textarea = this.shadowRoot.querySelector('dw-textarea');
        if (textarea) {
          textarea.value = this.value;
          textarea.moveToEnd();
        }
      }
    })
  }

  /**
   * @param {Number} caretPos
   * set focus on specific position.
   */
  setCaretPosition(caretPos) {
    const elem = this.renderRoot && this.renderRoot.querySelector && this.renderRoot.querySelector('.mdc-text-field__input');
    if (elem != null) {
      if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.move("character", caretPos);
        range.select();
      } else {
        if (
          elem.selectionStart !== undefined &&
          elem.selectionStart !== null &&
          elem.setSelectionRange
        ) {
          elem.focus();
          elem.setSelectionRange(caretPos, caretPos);
        } else {
          elem.focus();
        }
      }
    }
  }

  /* Call this to select text of the input */
  selectText(){
	if (!this._textFieldInstance) {
	  console.warn('dw-input : element has been disconnected before select text.');
	  return;
	}

    this._textFieldInstance.input.select();
  }

  setCustomValidity(msg = ''){
    this._textFieldInstance?.input?.setCustomValidity(msg);
  }

  reportValidity(){
    let isValid = this.checkValidity();

    this.invalid = !isValid;
    return isValid;
  }

  /* Call this to perform validation of the input */
  // TODO: remove this when `dw-form` elements are updated as per new specs.
  validate() {
    return this.reportValidity();
  }

  layout() {
    this.updateComplete.then(() => {
      setTimeout(() => {
        if (!this._textFieldInstance) {
          console.warn('dw-input : Somehow element has been disconnected before finish layout.');
        }

        this._textFieldInstance && this._textFieldInstance.layout();
      }, 200);
    })
  }

  parseValue(text) {
    return text;
  }

  formatText(value) {
    return value;
  }

  /**
   * Intializes textfield
   */
  _initMdcTextField() {
    const el = this.shadowRoot.querySelector('.mdc-text-field');
    this._textFieldInstance = new MDCTextField(el);
    this._textFieldInstance.useNativeValidation = false;
    new MDCTextFieldCharacterCounter(document.querySelector('.mdc-text-field-character-counter'));
  }

  /**
   * Triggers `value-changed` event if value is really changed.
   * Validates input if it's invalid at present, this remove invalid state if new value is valid.
   * HighLights text field if value is changed and `highlightChanged` property is true
   * @param {String} value - Value to be set
   * @returns {Boolean} `true` when value is really changed, `false` when value isn't changed.
   */
  _setValue(value) {
    if (value === this._value) {
      return false;
    }

    this._value = value || '';

    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value: this._value }
    }));

    if (this.highlightChanged) {
      this._setIsValueUpdated();
    }

    if (value && this.invalid) {
      this.reportValidity();
    }

    return true;
  }

  /**
   * Updates text-field's value based on the current value of `value` property.
   * It applies formatting.
   */
  _updateTextfieldValue() {
    if (!this._textFieldInstance) {
      return;
    }

    let text = this.formatText(this.value);
    this._textFieldInstance.value = text;
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

    let value = event.type === 'paste' ?  event.clipboardData.getData('text')  : event.key;

    let isValid = this._isValidValue(value);

    if (!isValid) {
      event.preventDefault && event.preventDefault();
    }
  }

   _onChange(e) {
    if (!this._textFieldInstance) {
      console.warn('dw-input: Somehow "_onInput" method is triggered after "disconnectedCallback"');
      return;
    }

    const value = this.parseValue(this._textFieldInstance.value, false);
    this._setValue(value, true);
    this.dispatchEvent(new CustomEvent('change'));
  }

  _onInput() {
    if (!this._textFieldInstance) {
      console.warn('dw-input: Somehow "_onInput" method is triggered after "disconnectedCallback"');
      return;
    }

    const value = this.parseValue(this._textFieldInstance.value, true);

    if (value !== undefined) {
      const changed = this._setValue(value, true);
      //Don't dispatch 'input' event as it bubbles up.
      // changed && this.dispatchEvent(new CustomEvent('input'));
    }
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
   * checks `value` against `allowedPattern`
   * Returns `true` if value is valid
   */
  _isValidValue(value) {
    if(!this.allowedPattern) {
      return true;
    }
    return RegExp(this.allowedPattern).test(value);
  }

  _onKeyDown(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      this._dispatchEnter(e);
      return;
    }

    if (keyCode === 27) {
      this._dispatchEsc(e);
    }
  }

  _dispatchEnter(e) {
    this.dispatchEvent(new CustomEvent('enter', {
      detail: { value: this.value, event: e }
    }));
  }

  _dispatchEsc(e) {
    this.dispatchEvent(new CustomEvent('esc', {
      detail: { value: this.value, event: e }
    }));
  }

  /**
   * Invokes on input focus
   * Selects input text if `autoSelect` property is true
   */
  _onFocus() {
    if (this.autoSelect) {
      //Set timeout so that we can always get selected text when autoSelect is true
      setTimeout(() => {
        this.selectText();
      });
    }
  }

  /**
   * Invokes on input blur
   * Validates input value
   */
  _onInputBlur() {
    this.reportValidity();
  }

  get validity() {
    return this._textFieldInstance?.input?.validity;
  }

  /**
   * Performs validatio of input
   * It also invokes `validator` if provided
   * Returns true if validation is passedisValid
   */
  checkValidity() {
    let isValid = this._textFieldInstance?.input?.checkValidity();

    if (!isValid) {
      return false;
    }

    return isValid;
  }

  /**
   * Trims given value if `truncateOnBlur=true`.
   * 
   * @param {String} value 
   */
  _trimIfRequired(value) {
    if (!this.truncateOnBlur) {
      return value;
    }

    return typeof value === 'string' ? value.trim() : value;
  }

  valueEqualityChecker(value, originalValue) {
    return this._trimIfRequired(value) == this._trimIfRequired(originalValue);
  }

  /**
   * Sets `_valueUpdated` if value is changed. Based on that, highlighted style is shown.
   */
  _setIsValueUpdated() {
    this._valueUpdated = !this.valueEqualityChecker(this.value, this.originalValue);
  }
}

customElements.define('dw-input', DwInput);

DwInput.errorMessages = defaultErrorMessages;
