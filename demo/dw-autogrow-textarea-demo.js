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
import '../dw-autogrow-textarea';

class DwAutogrowTextareaDemo extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          --dw-autogrow-textarea-background-color: rgba(0,0,0,.10);
        }

        dw-autogrow-textarea {
          max-width: 300px;
        }
      `
    ];
  }

  render() {
    
    return html`
      <h4>Auto grow textarea</h4>
      <dw-autogrow-textarea .minHeight=${42} .maxHeight=${154} .placeholder=${"Enter a new value"}></dw-autogrow-textarea>

      <h4>Fix height textarea</h4>
      <dw-autogrow-textarea .autoGrow=${false} .minHeight=${70} .placeholder=${"Enter a new value"}></dw-autogrow-textarea>

      <h4>Read only textarea</h4>
      <dw-autogrow-textarea .autoGrow=${false} .minHeight=${70} .value=${"Never change this value"} .readOnly=${true}></dw-autogrow-textarea>
    `;
  }

  firstUpdated() {
    super.firstUpdated && super.firstUpdated();
    let dwAutogrowTextarea =  this.shadowRoot.querySelectorAll('dw-autogrow-textarea');
    this._onEscKeyHandler =  this._onEscKey.bind(this);
    this._onEnterHandler =  this._onEnter.bind(this);
    this._onValueChangeHandler = this._onValueChange.bind(this);
    for(let i = 0;  i < dwAutogrowTextarea.length; i++) {
      let el = dwAutogrowTextarea[i];
      el.addEventListener('enter', this._onEnterHandler);
      el.addEventListener('esc', this._onEscKeyHandler);
      el.addEventListener('value-changed', this._onValueChangeHandler);
    }
  }

  disconnectedCallback() {
    let dwAutogrowTextarea =  this.shadowRoot.querySelectorAll('dw-autogrow-textarea');
    for(let i = 0;  i < dwAutogrowTextarea.length; i++) {
      let el = dwAutogrowTextarea[i];
      el.removeEventListener('enter', this._onEnterHandler);
      el.removeEventListener('esc', this._onEscKeyHandler);
      el.removeEventListener('value-changed', this._onValueChangeHandler);
    }
    super.disconnectedCallback();
  }

  _onEscKey(e) {
    // alert("Esc key press");
    console.log("on esc key", e.detail);
  }
  
  _onEnter(e) {
    // alert("Enter key press");
    console.log("on enter", e.detail);
  }

  _onValueChange(e) {
    console.log("on value changed", e.detail);
  }
}

window.customElements.define('dw-autogrow-textarea-demo', DwAutogrowTextareaDemo);