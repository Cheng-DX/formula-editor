[![Netlify Status](https://api.netlify.com/api/v1/badges/10c35136-9f02-482b-8da5-5629a26f6602/deploy-status)](https://app.netlify.com/sites/formula-editor/deploys)
<br>

<p align="center">
<img src="https://img.icons8.com/color/96/000000/back-sorting.png"/>
</p>

<h1 align="center">FORMULA EDITOR</h1>

<p align="center">
Use composable code to create formulas.
</p>
<p align="center">
  <a href="https://cheng-dx.github.io/formula-editor">ð¥¯ Online Playground</a>
 </p>
<br>

## Features

- IMPORT ð Auto import data and formulas from JSON file.
- EXPORT ð¥ Export and share your data and formulas.
- EDIT ð¥¨ Transform real time.
- [COMPOSABLE](#composable) ð¥¯ Use data code in formula moreover use formulas' code in another formula.
- CUSTOMIZE ð¥ You can customize the formula editor's style.
- BRACKET ð« Use brackets freely, `{}` `[]` `<>` `()` are supported.
- [SUGER](#suger) ð¬ `^2` and `^0.5` are available to make the formula more clear.
- TIPS ð¡Now when you are typing, it will filter the data and formulas you might want to use.`New Feature for release 0.3.0 ð`

## Usage

### composable

There are some tips:

- Use brackets to surround data, formulas will be enclosed in the brackets automatically.
- Depth of formula nesting should less then `10`.
- ~~Any formulas' or data's `codes` should not compeletely contain the `code` of other data or formula. This might cause unexpected results.~~
  </br>
  _It's avalible in release `v0.4.0-beta.`_

### suger

- `^2` means square.`(someCode)^2` will be parsed as `square(someCode)`. This is my Aviator's custom function, you can change this by replaceing the template string of function _`square`_ in the file _[transformFn.ts](./src/core/transform/transformFn.ts)_
- `^0.5` means square root.`(someCode)^0.5` will be parsed as `math.sqrt(someCode)`. This is the same with Aviator preset function.
- Make your own `Suger` by add new transform function. Well,`PR welcome` too.

## Releases

> ### `v0.4.0-beta` ð¦ð¦ð¦

#### New Features

- `CompeletelyContains`: In this release, formulas' or data's `codes` **can** compeletely contain the `code` of other data or formula. `Beta test`.
- `Quick Insert`:  Use alt/ctrl+enter to insert the first formula/data
- `New Filter Function`: Rewrite filter function, it will show all items contains input value in order

**Full Changelog**: https://github.com/Cheng-DX/formula-editor/compare/v0.3.2...v0.4.0-beta

> ### `v0.3.2` ð¼ð¼ð¼

#### New Features

- `Smart insert`: Improved insert logic when click the data or formula card, now it will overwrite your prefixed. Closable too.
  >  For example: <br>
  >  when you input: `COKE` <br>
  >  these data and formulas might be provided: `V_ij_COKE` `a_COKE` `b_COKE` <br>
  >  then click one of them: `V_ij_COKE` <br>
  >  the input will be: `V_ij_COKE` instead of `COKEV_ij_COKE` now <br>

**Full Changelog**: https://github.com/Cheng-DX/formula-editor/compare/v0.3.1...v0.3.2

<br>

> ### `v0.3.1` ð»ð»ð»

#### New Features

- `Add`: Redesigned add panel.
- `Empty`: New empty panel when data or formulas has no results.
- `Refector`: Refector the core function, it is more TypeScript now.

#### Bug Fixes

- Fixed the problem that data update is not timely.

**Full Changelog**: https://github.com/Cheng-DX/formula-editor/compare/v0.3.0...v0.3.1

<br>

> ### `v0.3.0` ððð

#### New Features

- Tips: Now when you are typing, the editor will filter the data and > formulas you might want to use.
- Closable: Moreover, tips can be closed if you do not want to use it.> (But Why Not??)
- Style: Completely redesigned interface and a little mobile terminal > adaptation.
- Breaking: Remove `Add panel` of data and formula.
- Breaking: Remove tranform button.
- Faster input: Quick insert when you click the data or formula card.

**Full Changelog**: https://github.com/Cheng-DX/formula-editor/compare/v0.2.1...v0.3.0

<br>

> ### `v0.2.1` ð³ð³ð³

#### Bug Fixes

- always wrap formula by brackets

**Full Changelog**: https://github.com/Cheng-DX/formula-editor/compare/v0.2.1...v0.2.0

<br>

> ### `v0.2.0` ð§©ð§©ð§©

#### New Features

- File: Import and export data and formulas is now supported.

**Full Changelog**: https://github.com/Cheng-DX/formula-editor/compare/v0.2.0...v0.1.0

<br>

> ### `v0.1.0` ððð

#### Features

- Core: A simple tool to edit formula.
- Edit: Transform real time.
- Compsable: Use data code in formula moreover use formulas' code in another formula.
- Customize: You can customize the formula editor's style.
- Bracket: Use brackets freely, `{}` `[]` `<>` `()` are supported.
- Suger: `^2` and `^0.5` are available to make the formula more clear.

**Full Changelog**: https://github.com/Cheng-DX/formula-editor/commits/v0.1.0

## License

[MIT](./LICENSE) License Â© 2022 [Cheng-DX](https://github.com/Cheng-DX)
