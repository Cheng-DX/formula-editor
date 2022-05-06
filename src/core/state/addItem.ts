import { appendItem } from './localStorage'
import { data, formulas } from './sharedStates'
import type { AddItem } from '@/types'

export function addFormula(item: AddItem) {
  const newFormula = {
    formulaId: item.code,
    formula: item.target,
    name: item.name,
    code: item.code,
  }
  appendItem('formula', newFormula)
  formulas.value.splice(0, 0, newFormula)
}

export function addData(item: AddItem) {
  const newData = {
    dataId: item.target,
    code: item.code,
    name: item.name,
    unit: '-',
  }
  appendItem('info', newData)
  data.value.splice(0, 0, newData)
}
