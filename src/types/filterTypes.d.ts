export type FilterFn = {
  data: (item: DataItem) => boolean
  formula: (item: FormulaItem) => boolean
}
