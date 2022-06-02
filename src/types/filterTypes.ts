import type { DataItem, FormulaItem } from './dataTypes'

export interface FilterFn {
  data: (item: DataItem) => boolean
  formula: (item: FormulaItem) => boolean
}
