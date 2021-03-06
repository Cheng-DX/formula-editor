import { filterFn as sharedFilterFn } from '../state/sharedStates'
import type { DataItem, FilterFn, FormulaItem } from '@/types'

const prefixes = ['+', '-', '*', '/', '[', '{', '<']

function _findMatchedIdx(text: string) {
  const matched = text.match(/[+\-*\/\[\{\(\<]{0,1}[a-zA-Z0-9\_]+$/)
  return matched?.index
}

function _containKeyInOrder(text: string, candidateKey: string, ignoreCase = false) {
  if (ignoreCase) {
    text = text.toLowerCase()
    candidateKey = candidateKey.toLowerCase()
  }
  let i = 0
  let j = 0
  while (i < text.length && j < candidateKey.length) {
    if (text[i] === candidateKey[j])
      j++
    i++
  }
  return j === candidateKey.length
}

export function updateFilterFn(text: string) {
  const filterFn: FilterFn = {
    data: () => true,
    formula: () => true,
  }
  const idx = _findMatchedIdx(text)
  if (idx !== null && idx !== undefined) {
    let candidateKey = text.substring(idx, text.length)
    if (prefixes.includes(candidateKey[0]))
      candidateKey = candidateKey.substring(1, candidateKey.length)

    filterFn.data = (item: DataItem) => _containKeyInOrder(item.code, candidateKey, true)
    filterFn.formula = (item: FormulaItem) => _containKeyInOrder(item.code, candidateKey, true)
  }

  sharedFilterFn.value = filterFn
}

export function smartInsert(text: string, code: string) {
  let idx = _findMatchedIdx(text)
  if (idx !== null && idx !== undefined) {
    if (prefixes.includes(text[idx]))
      idx++
    return text.substring(0, idx) + code
  }
  return text + code
}
