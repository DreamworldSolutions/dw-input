import { html, css, LitElement } from "@dreamworld/pwa-helpers/lit.js";
import "../dw-input.js";
import { ThemeStyle } from "@dreamworld/material-styles/theme";
import "@material/mwc-switch";
import "@material/mwc-formfield";
import "./formatted-input.js";

import { DWTooltip, DWTooltipStyle } from "@dreamworld/dw-tooltip";

const TooltipActions = [
  { name: "UPDATE", label: "Update" },
  { name: "CLEAR", label: "Clear", danger: true },
];

class DwInputDemo extends LitElement {
  static get styles() {
    return [
      ThemeStyle,
      ,
      css`
        :host {
          display: inline-block;
          width: 100%;
          padding: 24px;
        }

        :host([dark-theme]) {
          --dw-input-fill-color: #333;
          --dw-input-filled-bottom-border-color: rgba(255, 255, 255, 0.42);
        }

        dw-input,
        formatted-input {
          margin-bottom: 16px;
          max-width: 300px;
        }

        .horizontal-layout {
          display: flex;
          flex-direction: row;
        }

        .col {
          margin-right: 30px;
        }

        h4 {
          color: var(--mdc-theme-text-primary);
        }

        mwc-formfield {
          display: block;
          padding-bottom: 24px;
          --mdc-theme-text-primary-on-background: var(--mdc-theme-text-primary);
        }

        .tippy-box {
          ${DWTooltipStyle};
        }
      `,
    ];
  }

  render() {
    return html`
      <mwc-formfield label="Enable dark theme">
        <mwc-switch
          @click="${(e) => {
            if (e.target.selected) {
              this.setAttribute("dark-theme", e.detail);
              return;
            }

            this.removeAttribute("dark-theme");
          }}"
        >
        </mwc-switch>
      </mwc-formfield>

      <dw-input
        label="New input"
        required
        warningInTooltip
        .warning=${"sdfdfgds"}
        .warningTooltipActions=${TooltipActions}
      ></dw-input>
      <h4>Required In Tooltip text field</h4>
      <dw-input
        label="First name"
        required
        .errorInTooltip=${true}
        .error=${"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."}
        @enter="${this._onFirstNameEnter}"
        @esc="${this._onFirstNameEsc}"
        .hintTooltipActions="${TooltipActions}"
        .errorTooltipActions="${TooltipActions}"
        @action="${(e) => console.log(e.detail)}"
        iconTrailing="date"
        warningInTooltip
        hintInTooltip
        hint="Hint Text"
        iconFont="OUTLINED"
      ></dw-input>

      <h4>Text field with warning in tooltip</h4>
      <dw-input
        label="Name"
        value="Devang"
        warning="warning text"
        required
        warningInTooltip
        hintInTooltip
        .tooltipActions="${TooltipActions}"
        @action="${(e) => console.log(e.detail)}"
        iconFont="OUTLINED"
      ></dw-input>

      <h4>Shows Character count</h4>
      <dw-input
        label="Label"
        placeholder="PlaceHolder"
        noLabel
        maxLength="50"
        multiline
        charCounter
        hint="Helper text"
        hintPersistent
        hintInTooltip
        .errorTooltipActions="${TooltipActions}"
        .hintTooltipActions="${TooltipActions}"
        @action="${(e) => console.log(e.detail)}"
        required
        iconFont="OUTLINED"
        errorInTooltip
        error="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
      ></dw-input>

      <h4>Dense field</h4>
      <dw-input
        warning="warning text"
        error="Error message"
        required
        label="Name"
        dense
      ></dw-input>

      <h4>Required text field</h4>
      <dw-input
        label="First name"
        required
        iconTrailing="done"
        @enter="${this._onFirstNameEnter}"
        @esc="${this._onFirstNameEsc}"
      ></dw-input>

      <h4>Filled</h4>
      <dw-input label="First name" showAsFilled required></dw-input>

      <h4>Text field without label</h4>
      <dw-input noLabel placeholder="Enter Name here"></dw-input>

      <h4>Text field with helper text</h4>
      <div class="horizontal-layout">
        <dw-input
          class="col"
          label="Name"
          hint="Helper Text"
          required
        ></dw-input>
        <dw-input label="Name" hintPersistent hint="Helper Text"></dw-input>
      </div>

      <h4>Text field with prefilled value</h4>
      <dw-input label="Name" value="Simmy"></dw-input>

      <h4>Text field with warning</h4>
      <dw-input
        label="Name"
        value="Devang"
        warning="warning text"
        required
      ></dw-input>

      <h4>Highlight field on value change</h4>
      <dw-input
        label="First name"
        value="Ruchita"
        truncateOnBlur
        highlightChanged
        originalValue="Ruchita"
        required
        @input="${this._onInput}"
        @change="${this._onChange}"
      ></dw-input>
      <dw-input
        label="First name"
        value="Ruchita"
        highlightChanged
        originalValue="Ruchita"
        required
        dense
      ></dw-input>

      <h4>Text field with prefix icon</h4>
      <dw-input label="Name" icon="search"></dw-input>

      <h4>Text field with suffix icon</h4>
      <dw-input label="Name" iconTrailing="insert_emoticon"></dw-input>

      <h4>Text field which accepts only Numbers</h4>
      <dw-input label="Phone number" allowedPattern="[0-9]"></dw-input>

      <h4>Text field which accepts only Characters</h4>
      <dw-input label="Name" allowedPattern="[a-zA-Z]"></dw-input>

      <h4>Custom validation</h4>
      <dw-input
        id="customValidatorInupt"
        hint="Type cat here"
        error="Value must be a 'cat'"
        label="Animal name"
        palceholder="Type cat"
      ></dw-input>

      <h4>Auto formatting</h4>
      <formatted-input
        label="Currency"
        allowedPattern="[0-9]"
        value="456895"
        required
      ></formatted-input>

      <h4>Max length</h4>
      <dw-input maxLength="5" label="Name" charCounter></dw-input>

      <h4>Shows Character count</h4>
      <dw-input noLabel maxLength="50" multiline charCounter></dw-input>

      <h4>Prefix text</h4>
      <dw-input label="Name" prefixText="Dr."></dw-input>

      <h4>Suffix text</h4>
      <dw-input label="Email" suffixText="@gmail.com"></dw-input>

      <h4>Dense field</h4>
      <dw-input label="Name" dense></dw-input>

      <h4>Auto-select text on focus</h4>
      <dw-input label="First name" value="Hello" autoSelect required></dw-input>

      <h4>Textarea with Label</h4>
      <dw-input
        label="Notes"
        rows="5"
        multiline
        minHeight="200"
        placeholder="This is placeholder text"
        @enter="${this._onMultilineEnter}"
        @esc="${this._onMultilineEsc}"
      ></dw-input>

      <h4>Textarea without Label</h4>
      <dw-input
        rows="5"
        multiline
        minHeight="200"
        placeholder="This is placeholder text"
        @enter="${this._onMultilineEnter}"
        @esc="${this._onMultilineEsc}"
        @input="${this._onInput}"
        @change="${this._onChange}"
      ></dw-input>

      <h4>Readonly</h4>
      <dw-input label="Animal name" value="Cat" readOnly></dw-input>

      <h4>Disabled</h4>
      <dw-input
        label="Animal name"
        value="Cat"
        disabled
        icon="insert_emoticon"
      ></dw-input>

      <h4>Hint Text in multiline</h4>
      <dw-input
        label="Animal name"
        value="Cat"
        hintPersistent
        .hint="${"For Crummy trusts, Trust Type cannot be changed after a gift has been made"}"
        icon="insert_emoticon"
      >
      </dw-input>

      <h4>Hint Text in Single line</h4>
      <dw-input
        label="Animal name"
        value="Cat"
        hintPersistent
        noHintWrap
        .hint="${"For Crummy trusts, Trust Type cannot be changed after a gift has been made"}"
        icon="insert_emoticon"
      >
      </dw-input>
      <h4>Password</h4>
      <dw-input
        dense
        label="Password"
        type="password"
        placeholder="Enter your password"
      >
      </dw-input>
    `;
  }

  firstUpdated() {
    let el = this.shadowRoot.querySelector("#customValidatorInupt");
    el.validator = function (value) {
      return value === "cat";
    };

    let elTippyContainer = this.shadowRoot;
    DWTooltip.setAppendTo(elTippyContainer);
  }

  _onInput(e) {
    console.log("_onInput:", e.target.value);
  }

  _onChange(e) {
    console.log("_onChange:", e.target.value);
  }

  _onFirstNameEnter(e) {
    console.log("_onFirstNameEnter. value=" + e.detail.value, e.detail.event);
  }

  _onFirstNameEsc(e) {
    console.log("_onFirstNameEsc. value=" + e.detail.value, e.detail.event);
  }

  _onMultilineEnter(e) {
    console.log("_onMultilineEnter. value=" + e.detail.value, e.detail.event);
  }

  _onMultilineEsc(e) {
    console.log("_onMultilineEsc. value=" + e.detail.value, e.detail.event);
  }
}

customElements.define("dw-input-demo", DwInputDemo);
