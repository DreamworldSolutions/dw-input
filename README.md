# @dreamworld/dw-input

A Material Design outlined text-field and auto-grow textarea library implemented as LitElement Web Components, providing full validation, tooltip messaging, value formatting hooks, and rich icon support.

**Exports:** `<dw-input>`, `<dw-textarea>`, `<dw-email-input>`

---

## 1. User Guide

### Installation & Setup

```sh
yarn add @dreamworld/dw-input
```

This package is an ES module. Import each component as needed:

```javascript
// Core input (Material Design outlined text field)
import '@dreamworld/dw-input/dw-input.js';

// Auto-grow undecorated textarea
import '@dreamworld/dw-input/dw-textarea.js';

// Email-specialized input
import '@dreamworld/dw-input/dw-email-input.js';
```

To extend the class directly:

```javascript
import { DwInput } from '@dreamworld/dw-input/dw-input.js';
import { DwTextarea } from '@dreamworld/dw-input/dw-textarea.js';
import { DwEmailInput } from '@dreamworld/dw-input/dw-email-input.js';
```

---

### Basic Usage

```html
<!-- Simple labeled input -->
<dw-input label="Full Name" placeholder="Enter your name" required></dw-input>

<!-- Number input with bounds -->
<dw-input label="Age" type="number" .minNumber=${1} .maxNumber=${120}></dw-input>

<!-- Disabled input with pre-filled value -->
<dw-input label="Account ID" value="12345" disabled></dw-input>

<!-- Read-only input with icons -->
<dw-input label="Search" readOnly icon="search" iconTrailing="close"></dw-input>

<!-- Input with hint and validation -->
<dw-input
  label="Username"
  required
  hint="Letters and numbers only"
  pattern="[a-zA-Z0-9]+"
  error="Invalid characters"
></dw-input>

<!-- Multiline (textarea) mode -->
<dw-input label="Notes" multiline .minHeight=${80} .maxHeight=${200}></dw-input>

<!-- Auto-grow undecorated textarea -->
<dw-textarea .minHeight=${80} .maxHeight=${200} placeholder="Type here..."></dw-textarea>

<!-- Email input -->
<dw-email-input label="Email Address" required></dw-email-input>
```

---

### API Reference — `<dw-input>`

#### Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `name` | `String` | `''` | No | The `name` attribute of the underlying input element |
| `value` | `String` | `''` | No | Current value of the input field |
| `type` | `String` | `'text'` | No | Input type (e.g. `text`, `email`, `number`, `password`) |
| `inputmode` | `String` | `undefined` | No | HTML `inputmode` attribute (e.g. `numeric`, `email`) |
| `maxNumber` | `Number` | `undefined` | No | Maximum value when `type="number"` |
| `minNumber` | `Number` | `undefined` | No | Minimum value when `type="number"` |
| `step` | `Number` | `'any'` | No | Step interval for legal numbers when `type="number"` |
| `label` | `String` | `undefined` | No | Floating label text |
| `placeholder` | `String` | `''` | No | Placeholder text shown inside the field |
| `disabled` | `Boolean` | `false` | No | Disables the input |
| `readOnly` | `Boolean` | `false` | No | Makes the input read-only |
| `required` | `Boolean` | `false` | No | Marks input as required; validated on `validate()` |
| `pattern` | `String` | `'(.*?)'` | No | Regex pattern validated during `validate()` |
| `allowedPattern` | `String` | `undefined` | No | Regex pattern checked on each keystroke; disallows non-matching characters |
| `minLength` | `Number` | `0` | No | Minimum number of characters |
| `maxLength` | `Number` | `524288` | No | Maximum number of characters accepted |
| `charCounter` | `Boolean` | `false` | No | Shows character counter; requires `maxLength` to be set |
| `hint` | `String` | `undefined` | No | Helper text shown below the field (only while focused by default) |
| `hintPersistent` | `Boolean` | `false` | No | Always show hint text regardless of focus state |
| `hintInTooltip` | `Boolean` | `false` | No | Show hint in a tooltip triggered by a trailing info icon instead of below the field |
| `hintTooltipActions` | `Array` | `undefined` | No | Array of `tooltipAction` objects shown as buttons inside the hint tooltip |
| `error` | `String\|Function\|Object` | `''` | No | Error message shown when invalid. Can be a string, or a `Function(value) => string` |
| `errorInTooltip` | `Boolean` | `false` | No | Show error in a tooltip triggered by a trailing error icon |
| `errorTooltipActions` | `Array` | `undefined` | No | Array of `tooltipAction` objects shown as buttons inside the error tooltip |
| `warning` | `String\|Function\|Object` | `undefined` | No | Warning message. Can be a string or `Function(value) => string` |
| `warningInTooltip` | `Boolean` | `false` | No | Show warning in a tooltip triggered by a trailing warning icon |
| `warningTooltipActions` | `Array` | `undefined` | No | Array of `tooltipAction` objects shown as buttons inside the warning tooltip |
| `tipPlacement` | `String` | `'bottom-end'` | No | Tooltip placement; see [Tippy.js placement docs](https://atomiks.github.io/tippyjs/v6/all-props/#placement) |
| `tipExtraOptions` | `Object` | `undefined` | No | Additional options passed directly to the Tippy.js tooltip instance |
| `icon` | `String` | `undefined` | No | Leading (prefix) icon name |
| `iconTrailing` | `String` | `undefined` | No | Trailing (suffix) icon name |
| `iconSize` | `Number` | `24` | No | Size in px for both leading and trailing icons |
| `iconButtonSize` | `Number` | `24` | No | Size in px for icon buttons (when `clickableIcon=true`) |
| `iconFont` | `String` | `undefined` | No | Icon font variant: `'FILLED'` or `'OUTLINED'` |
| `symbol` | `Boolean` | `false` | No | When `true`, uses Material Symbols icon set |
| `clickableIcon` | `Boolean` | `false` | No | Makes the trailing icon interactive (rendered as icon button) |
| `autoSelect` | `Boolean` | `false` | No | Auto-selects all text when the field receives focus |
| `multiline` | `Boolean` | `false` | No | Renders the input as a textarea |
| `minHeight` | `Number` | `42` | No | Minimum height in px when `multiline=true` |
| `maxHeight` | `Number` | `undefined` | No | Maximum height in px when `multiline=true`; enables scroll beyond this |
| `disabledEnter` | `Boolean` | `false` | No | Prevents newline insertion on Enter key when `multiline=true` |
| `dense` | `Boolean` | `false` | No | Applies dense (compact) field style |
| `showAsFilled` | `Boolean` | `false` | No | Renders field in Material Design filled style instead of outlined |
| `noHintWrap` | `Boolean` | `false` | No | Forces hint text to render on a single line (no wrapping) |
| `prefixText` | `String` | `''` | No | Static prefix text rendered inside the field before the input |
| `suffixText` | `String` | `undefined` | No | Static suffix text rendered inside the field after the input |
| `truncateOnBlur` | `Boolean` | `false` | No | Trims whitespace from value when the field loses focus |
| `originalValue` | `String` | `undefined` | No | Reference value used to detect changes when `highlightChanged=true` |
| `highlightChanged` | `Boolean` | `false` | No | Highlights the field when `value !== originalValue` |
| `highlightedValue` | `Boolean` | `false` | No | When `true`, displays value in highlighted style unconditionally |
| `valueEqualityChecker` | `Function` | `undefined` | No | Custom equality function `(val1, val2) => Boolean` used by `highlightChanged` logic |
| `errorMessages` | `Object` | (internal defaults) | No | Map of validity-key → error string overrides (e.g. `{ typeMismatch: '...' }`) |
| `validity` | `Object` | `undefined` | No | The `ValidityState` object of the underlying input element |
| `autocomplete` | `String` | `'off'` | No | Maps to the HTML `autocomplete` attribute |

#### Events

| Event | When Fired | `detail` |
|-------|-----------|---------|
| `value-changed` | When the user types and the value changes | `{ value: String }` |
| `change` | On blur after the user has modified the value | none |
| `enter` | When the Enter key is pressed | `{ value: String, event: KeyboardEvent }` |
| `esc` | When the Escape key is pressed | `{ value: String, event: KeyboardEvent }` |
| `show-password` | When the user clicks the visibility icon to reveal password | none |
| `hide-password` | When the user clicks the visibility icon to hide password | none |
| `action` | When a tooltip action button is clicked | action name (`String`) |

#### Methods

| Method | Signature | Returns | Description |
|--------|-----------|---------|-------------|
| `focus` | `focus()` | `void` | Sets focus to the input |
| `setCaretPosition` | `setCaretPosition(caretPos: Number)` | `void` | Moves caret to the specified character position |
| `selectText` | `selectText()` | `void` | Selects all text in the input |
| `checkValidity` | `checkValidity()` | `Boolean` | Runs validation; returns `true` if valid |
| `setCustomValidity` | `setCustomValidity(msg: String)` | `void` | Sets a custom validity message (empty string clears it) |
| `reportValidity` | `reportValidity()` | `Boolean` | Runs validation and reports result; returns `true` if valid |
| `validate` | `validate()` | `Boolean` | Legacy alias for `checkValidity()`; returns `false` if invalid |
| `layout` | `layout()` | `void` | Triggers MDC layout recalculation (use after dynamic show/hide) |
| `parseValue` | `parseValue(text: String) => String` | `String` | Override in subclasses to parse raw input text into a structured value |
| `formatText` | `formatText(value: String) => String` | `String` | Override in subclasses to format a structured value into display text |
| `showPassword` | `showPassword()` | `void` | Switches `type` to `'text'` to reveal password |
| `hidePassword` | `hidePassword()` | `void` | Switches `type` back to `'password'` |
| `DwInput.setErrorMessages` *(static)* | `DwInput.setErrorMessages(messages: Object)` | `void` | Sets default error messages at the application level for all instances |

#### CSS Custom Properties

| Property | Default | Controls |
|----------|---------|---------|
| `--dw-input-outlined-idle-border-color` | `rgba(0,0,0,0.38)` | Outlined border color in idle state |
| `--dw-input-outlined-hover-border-color` | `rgba(0,0,0,0.87)` | Outlined border color on hover |
| `--dw-input-outlined-disabled-border-color` | `rgba(0,0,0,0.06)` | Outlined border color when disabled |
| `--dw-input-outlined-readonly-idle-border-color` | — | Outlined border color when read-only |
| `--dw-input-text-field-color` | `var(--mdc-theme-text-primary, rgba(0,0,0,0.87))` | Input text color |
| `--dw-input-fill-color` | `whitesmoke` | Background fill when `showAsFilled=true` |
| `--dw-input-filled-bottom-border-color` | `rgba(0,0,0,0.42)` | Bottom border color for filled style |
| `--dw-input-filled-hover-bottom-border-color` | `rgba(0,0,0,0.87)` | Hover bottom border color for filled style |
| `--dw-input-value-updated-color` | `var(--mdc-theme-primary, #02afcd)` | Text color when value is changed (`highlightChanged`) |
| `--dw-input-outlined-updated-bg-color` | `var(--mdc-theme-primary, #02afcd)` | Background overlay when value is changed |
| `--dw-input-helper-line-position` | `relative` | CSS `position` of the hint/error helper line |
| `--dw-input-white-space` | — | `white-space` property of input text when not focused |
| `--dw-input-text-overflow` | — | `text-overflow` property when not focused |
| `--dw-input-overflow` | — | `overflow` property when not focused |
| `--dw-input-direction` | — | Text direction (`ltr`/`rtl`) when not focused |
| `--dw-input-text-align` | — | Text alignment when not focused |
| `--dw-icon-color` | `rgba(0,0,0,0.54)` | Icon color |
| `--dw-icon-color-disabled` | `rgba(0,0,0,0.38)` | Icon color when disabled |
| `--mdc-theme-primary` | `rgba(98,0,238,0.87)` | Material Design primary color (focus ring, active state) |
| `--mdc-theme-text-primary` | `rgba(0,0,0,0.87)` | Primary text color |
| `--mdc-theme-text-secondary` | `rgba(0,0,0,0.6)` | Secondary/label text color |
| `--mdc-theme-text-disabled` | `rgba(0,0,0,0.38)` | Disabled text color |
| `--mdc-theme-error` | `#b00020` | Error state color |
| `--mdc-theme-text-warning` | `#ffa726` | Warning state color |

---

### API Reference — `<dw-textarea>`

#### Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `String` | `''` | No | Current textarea value |
| `minHeight` | `Number` | `42` | No | Minimum height in px; textarea auto-grows from this value |
| `maxHeight` | `Number` | `undefined` | No | Maximum height in px; vertical scroll activates beyond this |
| `maxLength` | `Number` | `524288` | No | Maximum number of characters |
| `minLength` | `Number` | `0` | No | Minimum number of characters |
| `readOnly` | `Boolean` | `false` | No | Makes the textarea read-only |
| `disabled` | `Boolean` | `false` | No | Disables the textarea |
| `required` | `Boolean` | `false` | No | Marks the textarea as required |
| `placeholder` | `String` | `''` | No | Placeholder text |
| `disabledEnter` | `Boolean` | `false` | No | Prevents newline insertion on Enter key |
| `undecorated` | `Boolean` | `false` | No | Hides the border when `true` |
| `showPlaceholderOnFocusOnly` | `Boolean` | `false` | No | Hides placeholder until the element is focused |
| `autocomplete` | `String` | `'off'` | No | HTML `autocomplete` attribute |

#### Events

| Event | When Fired | `detail` |
|-------|-----------|---------|
| `value-changed` | When the value changes (user input or programmatic) | `{ value: String }` |
| `change` | On blur after value was modified by the user | none |
| `input` | As the user types (mirrors native `input` event) | none |
| `enter` | When Enter key is pressed | `{ value: String, event: KeyboardEvent }` |
| `esc` | When Escape key is pressed | `{ value: String, event: KeyboardEvent }` |
| `blur` | When the textarea loses focus | `{ value: String, event: FocusEvent }` |

#### Methods

| Method | Signature | Returns | Description |
|--------|-----------|---------|-------------|
| `focus` | `focus()` | `void` | Sets focus and moves caret to end of text |
| `focusToEnd` | `focusToEnd()` | `void` | Alias for `focus()` (backward compatibility) |
| `moveToEnd` | `moveToEnd()` | `void` | Moves caret to end of text and resizes the textarea |
| `moveToStart` | `moveToStart()` | `void` | Moves caret to start of text and resizes the textarea |
| `blur` | `blur()` | `void` | Removes focus from the textarea |
| `validate` | `validate()` | `Boolean` | Validates the textarea; returns `false` if invalid |
| `checkValidity` | `checkValidity()` | `Boolean` | Checks validity; returns `true` if valid |
| `setCustomValidity` | `setCustomValidity(msg: String)` | `void` | Sets a custom validity message (empty string clears it) |
| `validity` *(getter)* | `get validity()` | `ValidityState` | Returns the `ValidityState` of the underlying `<textarea>` |

#### CSS Custom Properties

| Property | Default | Controls |
|----------|---------|---------|
| `--dw-textarea-padding` | `0px` | Internal padding of the textarea |
| `--mdc-theme-text-primary` | `rgba(0,0,0,0.87)` | Text color |
| `--mdc-theme-text-hint-on-background` | `rgba(0,0,0,0.38)` | Placeholder/hint text color |
| `--mdc-theme-secondary` | — | Focused border/outline color |
| `--divider-color` | — | Border color |

> **Note:** `dw-textarea` has no default border or background color. Apply border and background directly to the `dw-textarea` element at the usage site. Apply a typography class (e.g. from `@dreamworld/material-styles`) to control font styles — no default typography is applied.

---

### API Reference — `<dw-email-input>`

`<dw-email-input>` extends `<dw-input>` with no additional props, events, or CSS variables. It differs only in its constructor defaults:

| Property | Value set in constructor |
|----------|--------------------------|
| `type` | `'email'` |
| `errorMessages.typeMismatch` | `'Invalid Email'` |

All props, methods, events, and CSS custom properties from `<dw-input>` are inherited.

```html
<dw-email-input label="Email Address" required></dw-email-input>
```

---

### Configuration Options

#### Application-Level Error Messages

Override default error messages for all `<dw-input>` instances in your application:

```javascript
import { DwInput } from '@dreamworld/dw-input/dw-input.js';

DwInput.setErrorMessages({
  valueMissing: 'This field is required.',
  typeMismatch: 'Please enter a valid value.',
  patternMismatch: 'The format is incorrect.',
  tooShort: 'Too short.',
  tooLong: 'Too long.',
  rangeUnderflow: 'Value is too low.',
  rangeOverflow: 'Value is too high.',
});
```

#### Tooltip Action Object Shape

Used with `hintTooltipActions`, `errorTooltipActions`, and `warningTooltipActions`:

```javascript
{
  name: String,    // Identifier emitted with the `action` event
  label: String,   // Button label displayed in the tooltip
  danger: Boolean  // When true, renders the button in a danger/destructive style
}
```

---

### Advanced Usage

#### Value Parsing & Text Formatting

Override `parseValue` and `formatText` in a subclass to decouple the internal `value` from the displayed text. This enables custom input formats (e.g. locale-formatted numbers, date inputs).

- `formatText(value)` — receives `value` (the structured property value), returns the string to display in the text field.
- `parseValue(text, userEditing)` — receives the raw input text and a `Boolean` indicating whether the user is still editing. Returns the parsed value to assign to `value`.
  - Returning `undefined` during `userEditing=true` leaves `value` unchanged, enabling intermediate invalid state handling.
  - Returning any value (including `undefined`) on blur (`userEditing=false`) sets `value`.

**Example — locale-formatted number input:**

```javascript
import { DwInput } from '@dreamworld/dw-input/dw-input.js';

class FormattedInput extends DwInput {
  formatText(value) {
    value = value.toString().replace(/,/g, '').replace(/ /g, '');
    return Number(value).toLocaleString();
  }

  parseValue(text) {
    text = text.replace(/,/g, '').replace(/ /g, '');
    return Number(text);
  }
}

customElements.define('formatted-input', FormattedInput);
```

```html
<formatted-input label="Amount" value="1000000"></formatted-input>
<!-- Displays: 1,000,000 -->
```

#### Custom Styling via Subclass

```javascript
import { DwInput } from '@dreamworld/dw-input/dw-input.js';
import { css } from 'lit';

class RoundedInput extends DwInput {
  static get styles() {
    return [
      DwInput.styles,
      css`
        .mdc-text-field {
          border-radius: 8px;
        }
      `
    ];
  }
}

customElements.define('rounded-input', RoundedInput);
```

#### Highlight Changed Value

Highlight a field when its current value differs from a reference value — useful in edit forms:

```html
<dw-input
  label="Username"
  value="john_new"
  originalValue="john_old"
  highlightChanged
></dw-input>
```

For custom equality logic:

```javascript
document.querySelector('dw-input').valueEqualityChecker = (val1, val2) => {
  return String(val1).trim() === String(val2).trim();
};
```

#### Tooltip-Based Hint, Error, and Warning

```html
<dw-input
  label="Password"
  hintInTooltip
  hint="Must be at least 8 characters"
  errorInTooltip
  error="Password is too weak"
  .errorTooltipActions=${[{ name: 'reset', label: 'Reset Password', danger: false }]}
></dw-input>
```

Listen for action events:

```javascript
document.querySelector('dw-input').addEventListener('action', (e) => {
  console.log('Tooltip action clicked:', e.detail); // e.g. 'reset'
});
```

#### Password Field

```html
<dw-input type="password" label="Password"></dw-input>
```

The visibility toggle icon is shown automatically. Listen to show/hide events:

```javascript
const input = document.querySelector('dw-input');
input.addEventListener('show-password', () => console.log('Password revealed'));
input.addEventListener('hide-password', () => console.log('Password hidden'));

// Or control programmatically:
input.showPassword();
input.hidePassword();
```

#### Auto-Grow Textarea Examples

```html
<!-- Grows from 80px to 200px, then scrolls -->
<dw-textarea .minHeight=${80} .maxHeight=${200}></dw-textarea>

<!-- Fixed height with scroll -->
<dw-textarea .minHeight=${70} .maxHeight=${70}></dw-textarea>

<!-- Prevent newline on Enter -->
<dw-textarea .minHeight=${70} .maxHeight=${70} disabledEnter></dw-textarea>

<!-- Read-only -->
<dw-textarea .minHeight=${80} .maxHeight=${200} .readOnly=${true}></dw-textarea>
```

---

## 2. Developer Guide / Architecture

### Architecture Overview

#### Design Patterns

| Pattern | Where Applied | Purpose |
|---------|--------------|---------|
| **Mixin / Composition** | `DwFormElement(LitElement)` base class | Injects form-integration behavior (validity reporting, form participation) without inheritance conflicts |
| **Template Method** | `parseValue()` and `formatText()` hooks | Defines the algorithm skeleton in `DwInput`; subclasses override specific steps to customize value serialization |
| **Adapter / Facade** | MDCTextField instance management (`_textFieldInstance`) | Wraps the Material Components Web imperative API behind a reactive LitElement property model |
| **Strategy** | `valueEqualityChecker` prop | Allows the equality-check algorithm to be swapped at runtime without subclassing |
| **Thin Specialization** | `DwEmailInput extends DwInput` | Reuses the full `DwInput` implementation; only constructor defaults differ |

#### Module Responsibilities

| File | Responsibility |
|------|----------------|
| `dw-input.js` | Core input component — rendering, validation, MDC lifecycle, tooltip integration, value formatting hooks, icon/password handling |
| `mdc-text-field-css.js` | Exports `TextfieldStyle` — the full Material Design text field CSS as a Lit `css` tagged template literal; imported and composed into `DwInput.styles` |
| `dw-textarea.js` | Standalone auto-grow undecorated textarea; minimal styling, no MDC dependency, exposes its own props/events/methods API |
| `dw-email-input.js` | Extends `DwInput`; sets `type='email'` and `errorMessages.typeMismatch` in the constructor |

#### Runtime Dependencies

| Package | Role |
|---------|------|
| `lit` (via `LitElement`) | Declarative reactive rendering and DOM update scheduling |
| `@material/textfield` | MDCTextField imperative instance — manages floating label, ripple, and outline animations |
| `@dreamworld/dw-form` | `DwFormElement` mixin — hooks the component into native `<form>` participation and validation lifecycles |
| `@dreamworld/dw-tooltip` | Renders hint / error / warning tooltip overlays |
| `@dreamworld/dw-icon` | Renders leading and trailing icons |
| `@dreamworld/dw-icon-button` | Renders clickable trailing icon buttons (when `clickableIcon=true` or for password visibility) |
| `@dreamworld/dw-button` | Renders tooltip action buttons |
| `@dreamworld/device-info` | Detects virtual keyboard presence to conditionally adjust layout behavior |
| `lodash-es` | Utility functions (debounce, equality checks) |
