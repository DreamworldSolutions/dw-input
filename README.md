
# dw-input

A material input element made with lit-html. For more detail visit https://material.io/develop/web/components/input-controls/text-field/.

#Installation

npm install @dw/dw-input

## Usage

```html
<dw-input label="Name" placeholder="Enter name here" required></dw-input>
```

## Properties

It supports all the properties of html input element. Extra properies supported by this element are below:

- noLabel

- hintText

- prefixIcon

- sufixIcon

- errorMessage

- readOnly

- validator

- invalid

- autoSelect

- isTextField

## Events

Triggers `value-changed` event on value change.


###validation

It performs validation on blur. It also performs validation on User type if input is invalid.

set `validator` property for custom validation.

## Theme
Configure color of the icon using `--icon-fill-color` css variable.  
```

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