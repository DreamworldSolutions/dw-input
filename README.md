
# dw-input

A material input element made with lit-html. For more detail visit https://material.io/develop/web/components/input-controls/text-field/.

## Installation

```html
	npm install @dw/dw-input
```

## Usage

```html
	@import '@dw/dw-input/dw-input';
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

## Theme
Configure color of the icon using `--icon-fill-color` css variable.  

#### Example css to change icon color

```html
dw-input{
--icon-fill-color: green;
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
```