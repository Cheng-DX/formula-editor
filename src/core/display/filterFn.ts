import { filterFn as sharedFilterFn } from '../state/sharedStates'
import type { DataItem, FilterFn, FormulaItem } from '@/types'

const prefixes = ['+', '-', '*', '/', '[', '{', '<']

function _findMathedIdx(text: string) {
  const matched = text.match(/[+\-*\/\[\{\(\<]{0,1}[a-zA-Z0-9\_]+$/)
  return matched?.index
}

export function updateFilterFn(text: string) {
  const filterFn: FilterFn = {
    data: () => true,
    formula: () => true,
  }
  const idx = _findMathedIdx(text)
  if (idx !== null && idx !== undefined) {
    let candidateKey = text.substring(idx, text.length)
    if (prefixes.includes(candidateKey[0]))
      candidateKey = candidateKey.substring(1, candidateKey.length)

    filterFn.data = (item: DataItem) =>
      item.code.includes(candidateKey)
    filterFn.formula = (item: FormulaItem) =>
      item.code.includes(candidateKey)
  }

  sharedFilterFn.value = filterFn
}

export function smartInsert(text: string, code: string) {
  let idx = _findMathedIdx(text)
  if (idx !== null && idx !== undefined) {
    if (prefixes.includes(text[idx]))
      idx++
    return text.substring(0, idx) + code
  }
  return text + code
}
