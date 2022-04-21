<br>

<p align="center">
<img src="https://img.icons8.com/color/96/000000/back-sorting.png"/>
</p>

<h1 align="center">FORMULA EDITOR</h1>

<p align="center">
Use composable code to create formulas in GoogleAviator
</p>

<p align="center"><a href="https://cheng-dx.github.io/formula-editor">🥯 Online Playground</a></p>
<br>

## Features

- IMPORT 🍞 Auto import data and formulas from JSON file.
- EXPORT 🥐 Export and share your data and formulas.
- EDIT 🥨 Transform real time.
- [COMPOSABLE](#composable) 🥯 Use data code in formula moreover use formulas' code in another formula.
- CUSTOMIZE 🥖 You can customize the formula editor's style.
- BRACKET 🫓 Use brackets freely, `{}` `[]` `<>` `()` are supported.
- [SUGER](#suger) 🍬 `^2` and `^0.5` are available to make the formula more clear.
- [TIPS] 💡Now when you are typing, it will filter the data and formulas you might want to use.`New Feature for release 0.3.0 🙉`

## Usage

### composable

There are some tips:

- Use brackets to surround data, formulas will be enclosed in the brackets automatically.
- Depth of formula nesting should less then `10`.
- Any formulas' or data's `codes` should not compeletely contain the `code` of other data or formula. This might cause unexpected results.
  </br>
  _I know this limitation can be solved but I don't have a good idea right now.`PR welcome`_

### suger

- `^2` means square.`(someCode)^2` will be parsed as `square(someCode)`. This is my Aviator's custom function, you can change this by replaceing the template string of function _`square`_ in the file _[transformFn.ts](./src/core/transformFn.ts)_.
- `^0.5` means square root.`(someCode)^0.5` will be parsed as `math.sqrt(someCode)`. This is the same with Aviator preset function.
- Make your own `Suger` by add new transform function. Well,`PR welcome` too.

## License

[MIT](./LICENSE) License © 2022 [Cheng-DX](https://github.com/Cheng-DX)
