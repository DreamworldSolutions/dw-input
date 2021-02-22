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
import { styleMap } from 'lit-html/directives/style-map.js';

/**
 * Behaviors:
 *  - Provides way to undecorate textarea. 
 *  - When minimum height is provided, it ocuupies that provided mminum height.
 *  - When maximum height is provided & content is larger than it, it produces scroll of itself.
 *  - When nothing provided by integrator (minimum / maximum height), It autogrows based on content.
 *    - Note: To apply autogrow feature, hack is applied here. 
 *      - It contains one dummy text field to calculate height of content.
 *      - Why this hack needed?
 *        - To auto grow & auto shrink height of textarea based on it's content, there is no way to calculate content's height into textarea.
 *          So to achieve this, We have attached 1 dummy textarea with single line & set it's value. From that dummy textarea, 
 *          We can compute it's scrollHeight & set height of actaul visible textarea to that scrollHeight.
 * 
 * 
 * Usage pattern:
 *  - `<dw-textarea undecorated .minHeight=${56} .maxHeight=${128} ></dw-textarea>`
 */

export class DwTextarea extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          color: var(--mdc-theme-text-primary);
          position: relative;
        }

        :host[hidden] {
          display: none;
        }

        :host([disabled]),
        :host([readOnly]){
          pointer-events: none;
        }

        :host([disabled]){
          opacity: 0.3;
        }

        textarea {
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          display: block;
          resize: none;
          outline:none;
          background-color: transparent;
          color: inherit;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          letter-spacing: inherit;
          line-height: inherit;
          padding: var(--dw-textarea-padding, 0px);
          width: 100%;
          border: 1px solid var(--divider-color);
          border-radius: 2px;
          -webkit-border-radius: 2px;
          -moz-border-radius: 2px;
        }

        textarea:focus {
          outline:none;
        }

        ::-webkit-input-placeholder { /* Edge */
          color: var(--mdc-theme-text-hint);
        }

        :-ms-input-placeholder { /* Internet Explorer 10-11 */
          color: var(--mdc-theme-text-hint);
        }

        ::placeholder {
          color: var(--mdc-theme-text-hint);
        }

        :host(:not([undecorated])) textarea:focus {
          border: 1px solid var(--mdc-theme-secondary);
        }
        
        :host([undecorated]), 
        :host([undecorated]) textarea {
          border: none;
        }

        #dummy-textarea {
          position: absolute;
          top: -99999px;
          height: auto;
          visibility: hidden;
        }
      `
    ];
  }

  static get properties() {
    return {
      /**
       * Represent textarea value.
       */
      value: { type: String },

      /**
       * Minimum height of textarea
       */
      minHeight: { type: Number },

      /**
       * Max height of textarea. After that vertical scroll is available.
       */
      maxHeight: { type: Number },

      /**
       * Maximum length of textarea
       */
      maxLength: { type: Number },

      /**
       * Mininum number of characters.
       */
      minLength: { type: Number },

      /**
       * Set to true to make input field readonly.
       */
      readOnly: { type: Boolean, reflect: true},

      /**
       * Set to true to make input field disabled.
       */
      disabled: { type: Boolean, reflect: true},

      /**
       * Set to `true` to mark the input as required.
       */
      required: { type: Boolean },

      /**
       * A placeholder for textarea.
       */
      placeholder: { type: String },

      /**
       * Disabled enter in input.
       */
      disabledEnter: { type: Boolean },

      /**
       * When it's `true`. It doesn not show border.
       */
      undecorated: { type: Boolean, reflect: true}
    };
  }

  /**
   * Getter of `value` property.
   */
  get value() {
    return this._value;
  }

  /**
   * Setter of `value` property.
   */
  set value(value) {
    let oldValue = this._value;
    if(oldValue == value) {
      return;
    }

    this._value = value;
    this.requestUpdate('value', oldValue);

    if(this._textarea) {
      this._textarea.value = this._value;
    }

    this.updateComplete.then(() => {
      this._resize();
    });
  }

  get _dummyTextarea() {
    return this.renderRoot.querySelector('#dummy-textarea');
  }

  render() {
    return html`<textarea id="textarea" rows="1"
        style=${styleMap(this._textareaStyle())}
        .value="${this.value}"
        .maxLength="${this.maxLength}"
        .minLength="${this.minLength}"
        .name="${this.name}"
        ?disabled="${this.disabled}"
        ?required="${this.required}"
        ?readonly="${this.readOnly}"
        .placeholder="${this.placeholder}"
        @input="${this._onInput}"
        @blur="${this._onInputBlur}"
        @cut="${this._resize}"
        @paste="${this._resize}"
        @keypress="${this._onKeyPress}"
        @keydown="${this._onKeyDown}"></textarea>
        
        <textarea .value="${this.value}" rows="1" disabled id="dummy-textarea"></textarea>
        `;
  }

  constructor() {
    super();
    this.name = '';
    this.value = '';
    this.disabled = false;
    this.required = false;
    this.placeholder = '';
    this.readOnly = false;
    this.minHeight = 42;
    this.maxLength = 524288;
    this.minLength = 0;

    /**
     * A reference to the textarea element.
     */
    this._textarea = null;
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();

    //Set textarea instance.
    this.updateComplete.then(() => {
      this._textarea = this.shadowRoot.querySelector('#textarea');
    });
  }

  firstUpdated(changeProps) {
    super.firstUpdated && super.firstUpdated(changeProps);

    //If textarea instance is not set.
    if(!this._textarea) {
      this._textarea = this.shadowRoot.querySelector('#textarea');
    }
    this._resize();
  }

  disconnectedCallback() {
    this._textarea = undefined;
    super.disconnectedCallback && super.disconnectedCallback();
  }

  /**
   * Call this to set focus in the input.
   * @public
   */
  focus() {
    this.moveToEnd();
  }

  /**
   * Set focus to end of text.
   * This method is just for backward compatibility.
   * @protected
   */
  focusToEnd() {
    this.moveToEnd();
  }

  /**
   * Move focus to end of text & resize textarea
   * @protected
   */
  moveToEnd() {
    this.updateComplete.then(() => {
      if (typeof this._textarea.selectionStart == "number") {
        this._textarea.selectionStart = this._textarea.selectionEnd = this._textarea.value.length;
        this._textarea.focus();
      } else if (typeof this._textarea.createTextRange != "undefined") {
        this._textarea.focus();
        let range = this._textarea.createTextRange();
        range.collapse(false);
        range.select();
      } else {
        console.error('dw-textarea: Error while moving cursor to end.');
      }
      this._resize();
    })
  }

  /**
   * Call this to remove focus in the input.
   * @public
   */
  blur() {
    this.updateComplete.then(() => {
      if (!this._textarea) {
        console.warn('dw-textarea: "textarea" element not found. Somehow "blur" method is triggered after "disconnectedCallback"');
        return;
      }
      this._textarea.blur();
    })
  }

  /**
   * Call this to perform validation of the textarea.
   * @public
   */
  validate() {
    return this._textarea.checkValidity();;
  }

  /**
   * Returns true if `value` is valid
   */
  validity() { 
    return this._textarea.validity();
  }

  /**
   * Checkes input validity
   */
  checkValidity() { 
    return this._textarea.checkValidity();
  }

  /**
   * Resize input based on content.
   * @protected
   */
  _resize() {
    if(!this._textarea || !this._dummyTextarea || this.minHeight === this.maxHeight) {
      return;
    }

    const scrollHeight = this._dummyTextarea.scrollHeight;
    if(scrollHeight < this.minHeight) {
      this.style.height = this._textarea.style.height = this.minHeight + 'px';
      return;
    }

    if(this.maxHeight && (scrollHeight > this.maxHeight)) {
      this.style.height = this._textarea.style.height = this.maxHeight + 'px';
      return;
    }
    
    //Note: When `textarea` has `box-sizing: border-box;` & it's `height` is same as it's `scrollHeight`, 
    //      It produces scroll of it's border height, So including border height into it.
    const borderHeight = this.undecorated ? 0 : 2;
    this.style.height = this._textarea.style.height = (scrollHeight + borderHeight)+ 'px';
  }

  /**
   * Invoked when any key press on `textarea`.
   * @protected
   */
  _onKeyPress(e) {
    var keyCode = e.keyCode || e.which;

    //If enter key and disabled Enter.
    if(keyCode === 13 && this.disabledEnter) {
      e.preventDefault && e.preventDefault();
      return false;
    }
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

    if (this.disabledEnter) {
      e.preventDefault && e.preventDefault();
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
   * @returns {Object} - Text area style based on `minHeight` and `maxHeight` property.
   * @protected
   */
  _textareaStyle() {
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
    this.value = this._textarea.value;
    this._resize();
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

window.customElements.define('dw-textarea', DwTextarea);