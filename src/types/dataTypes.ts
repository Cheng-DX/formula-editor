/**
 * data item
 */
export interface DataItem {
  /**
   * The unique id of data
   */
  dataId: string
  /**
   * The display name of data
   */
  name: string
  /**
   * The target of data tranformation
   */
  code: string
  /**
   * The unit of data
   */
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
