import type { AddItem } from '@/types'
import { appendItem } from './localStroage'
import { data, formulas } from './sharedStates'

export function addFormula(item: AddItem) {
  const newFormula = {
    formulaId: item.code,
    formula: item.target,
    name: item.name,
    code: item.code
  }
  appendItem('formula', newFormula)
  formulas.value.push(newFormula)
}

export function addData(item: AddItem) {
  const newData = {
    dataId: item.target,
    code: item.code,
    name: item.name,
    unit: '-'
  }
  appendItem('info', newData)
  data.value.push(newData)
}
