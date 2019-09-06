
# dw-input

A material input element made with lit-html. For more detail visit https://material.io/develop/web/components/input-controls/text-field/.

## Installation

```html
  npm install @dreamworld/dw-input
```

## Usage

```html
  @import '@dreamworld/dw-input/dw-input';
```

## [Demo](https://dreamworldsolutions.github.io/dw-input/demo/index.html)

## Features

- It follows material design outlines input style and provides all features of it. [know more](https://material.io/develop/web/components/input-controls/text-field/)
- It auto select's text if `autoSelect` property is true
- Provides a `validator` property to add custom validations
- Set `multiline` to true to show input as text area
- Set `prefixSvgIcon` and `suffixSvgIcon` to show prefix and suffix icon
- Performs validation on blur. It also performs validation on User type if input is invalid.

## Events

Triggers `value-changed` event on value change.

## Methods

- focus - Focuses the input

- selectText - Selected input's text

- validate - Call this to validate input. Returns false if value is invalid.

- formattedValueGetter - Use to auto-format value on blur. It provides value in argument. It must be return a string.

- focusedValueGetter - Use to set value on focus. It provides value in argument. It must be return a string.

## Theme
Configure color of the icon using `--dw-icon-color` css variable.  

#### Example css to change icon color

```html
dw-input{
--dw-icon-color: green;
}
```

## Custom input

Override dwInput class to create a custom input

```
class CustomInput extends DwInput {
  static get styles() {
  return [
    DwInput.styles,
    css`
      .mdc-text-field{
        border-radius: 8px;
      }`
    ];
  }
}
customElements.define('custom-input', CustomInput);

<custom-input></custom-input>
```

## Examples

```html
<dw-input label="Name" validator="<VALIDATION_FN>" placeholder="Enter name here" autoSelect required hint="Hint text"></dw-input>

<dw-input label="Number" disabled allowedPattern="[0-9]" value="12"></dw-input>

<dw-input label="Number" readOnly prefixSvgIcon='<SVG_PATH>'  suffixSvgIcon='<SVG_PATH>'></dw-input>

<dw-input noLabel multiline></dw-input>

<dw-input value="12" originalValue="12" highLightOnChanged></dw-input>
```

# dw-textarea
- The element provide way to autogrow textarea with non decore style.

## Install
  
```html
npm install @dw/dw-input
```
## Usage
```javascript
import  '@dreamworld/dw-input/dw-textarea';
```
## Events
-  `value-changed` event with input value.
	- Fires this event on input value is changed
-  `enter` event with input value and event object.
	- Fires this user press `enter` key on input.
-  `esc` event with input value and event object.
	- Fires this event if user press `esc` key on input.
- `blur` event with input value and event object.
  - Fires this event on textarea blur event.

## Methods 
-  `focus` - Focus in the input
-  `focusToEnd`- Focus in the input at last
-  `blur` - Remove the input focus
-  `validate` - Call this to validate input. Returns false if value is invalid.

## Theme
- Configure padding of the textarea `--dw-textarea-padding` css variable.  
- For Borders, direclty apply to `dw-textarea` element at the time of usage. Default border hasn't provided as it's 
raw element to be used for the custom purposes/UI.
- It has no (transparent) background-color, so set background-color to `dw-textarea` as per your need.
- For typo-graphy, set relevant typography class from your theme (e.g. `material-styles`) to `dw-textarea`. No default,
  typography is applied. When used in `dw-input`, it applies typo graphy as per the input fonts.
- Font colors: `--mdc-theme-text-primary`, `--mdc-theme-text-hint` and `--mdc-theme-text-disabled` are used for the font
 colors. So, change these css properties as per your need.

## Features
- Auto grow input.
- Fixed height input with scroll
- Disabled enter

### Auto grow input.
- Provide auto grow input based on `minHeight` and `maxHeight` property.
- Input auto grows from `minHeight` to `maxHeight` after that they show scroll.

#### Example with Auto grow input:
```html
<dw-textarea  .minHeight=${80}  .maxHeight=${200}></dw-textarea>
```
### Fixed height input with scroll
- Provide input with fixed height after that they show scroll.
- Passed to `minHeight` to input to show fix height

#### Example Fixed height input with scroll:
```html
<dw-textarea  .minHeight=${70} .maxHeight=${70}></dw-textarea>
```
### Disabled enter
- Provide way enter not allowed in input.
- Set `disabledEnter` property set as a `true`.

#### Example Disabled enter:
```html
<dw-textarea .minHeight=${70} .maxHeight=${70} disabledEnter></dw-textarea>
```
## Other examples
- Read only input
```html
<dw-textarea  .minHeight=${80}  .maxHeight=${200}  .readOnly=${true}></dw-textarea>
```