
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
- Provide `type` property to set type of input e.g ("text", "email", "number"). [List of all input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#%3Cinput%3E_types)
- Set `icon` and `iconTrailing` to show prefix and suffix icon
- Performs validation on blur. It also performs validation on User type if input is invalid.
- `hintInTooltip`: way to show hint, warning, and error text in tooltip and tip trigger on trailing icon hover. Icon is depends on type of hint text. If error hint then it show error(red) icon, if warning hint then it show warning(orange) icon otherwise it shows info(grey) icon.
- `tooltipActions`: way to add tip action while error and warning text in tip. on action click event named `action` dispatch.

#### tooltipAction

```js
{
  name: string,
  lable: string,
  danger: boolean
}
```

### Value parsing & Text Formatting
By default `value` property is exactly the text written in the text-field. But, When creating custom input elements
by extending `dw-input` we need to change this behavior. e.g. For we want to create a date-input, whose value will always be in `yyyy-mm-dd` format. But, allows user to choose input format. e.g. For American user it allows to enter date in `mm/dd/yyyy` format and for Indian users it allows to enter date in `dd/mm/yyyy` format. In addition, we need
1 more feature that date input can be done without `/` or `-`. And even partial dates can be entered. e.g. 
- If I enter `12`, then the date will be come 12th of the current month and year. (assumed input format is dd/mmy/yyyy)
- If I enter `125`, then the date will become 12th May of the current year.
For such features, we need to do custom parsing of value from the input text and when user sets value property, we need 
to compute corresponding text representation.

This can be easily done by extending this element and then overriding following 2 functions:
- `parseValue(text, userEditing)`:
  - Receives input-text as argument and returns parsed value. e.g. for the above case it receives user inputted string and returns string date in format `yyyy-mm-dd`.
  - `userEditing` is Boolean. When user is editing the input (focus is still in), this is `true`.
- `formatText(value)`, Receives value property as argument and returns formatted text to be shown in the input field.
e.g. For the above example, it receives date in `yyyy-mm-dd` format and it's output is date representation in `dd/mm/yyyy` format for indian user.

**How exactly `parseValue` and `formatText` function is used internally?**
- `formatText`: Input text needs to be formatted on 2 events.
  - On `change` event - blur of the Input & value is changed.
  - Integrate updates `value` property explicitly.
- `parseValue`: Value needs to be parsed when user interacts with input text-field and updates text. e.g. `input` and `change` both events.
  - When user is typing (`input` event); On `undefined` return value, `value` isn't changed (stays to it's last value). This allows intermediate invalid value handling. In this case `input` event isn't triggered on this input, because effectively `value` isn't changed. Please note that, `null` and Blank String both are used as it is. It's just for `undefined`.
  - When user is done editing (`change` event); Anything returned including `undefined` is set to the `value` property.


## Methods

- `focus` - Focuses the input

- `selectText` - Selected input's text

- `validate` - Call this to validate input. Returns false if value is invalid.

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

<dw-input label="Number" readOnly icon='search' iconTrailing='add_comment'></dw-input>

<dw-input noLabel multiline></dw-input>
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
-  `value-changed`:
	- It's fired when `value` property is changed. Either due to user-interaction, or it's changed programatically (by integrator).
	- It's just built for Polymer integration. And consider it as DEPRECATED. Insted use `input` or `change` as appropriate for your use-case.
- `input`: Same as browser default [input-event]. Dispatched when user changes input value, as user types or on paste.
- `change`: Same as browser default [change-event]. Dispatched on-blur if value was changed by the user.
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
- Highlight when Updated

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

### Highlight when Updated

Many times you want to highlight the input when it's value is changed.

Example use-case is "Edit Form". An Edit Form has most fields with pre-filled values. Here, field whose values are updated can be highlighted. That provides nice User Experience, as user can know what has been updated. This involves both:
- Fields whose value has been changed explicitly by User.
- Fields which are automatically updated, as a result of other field change by the User.


This can be achieved simply by setting 2 properties: `highlightChanged` and `originalValue`.

```html
<dw-input value="12" originalValue="12" highlightChanged></dw-input>
```

> It also considers `truncateOnBlur` property.


As an advance use-case, you might want to change the behaviour of equality-checker (whether value has been updated or not?). 
This can be achived through setting property `valueEqualityChecker`.

## Other examples
- Read only input
```html
<dw-textarea  .minHeight=${80}  .maxHeight=${200}  .readOnly=${true}></dw-textarea>
```


[change-event]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
[input-event]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event

