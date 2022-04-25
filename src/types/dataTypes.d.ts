export interface DataItem {
  dataId: string
  name: string
  code: string
  unit: string
}

export interface FormulaItem {
  formulaId: string
  formula: string
  name: string
  code: string
}

export interface AddItem {
  code: string
  name: string
  target: string
}
