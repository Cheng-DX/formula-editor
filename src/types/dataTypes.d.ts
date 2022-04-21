export type DataItem = {
  dataId: string
  name: string
  code: string
  unit: string
}

export type FormulaItem = {
  formulaId: string
  formula: string
  name: string
  code: string
}

export type FilterFn = {
  data: (item: DataItem) => boolean
  formula: (item: FormulaItem) => boolean
}
