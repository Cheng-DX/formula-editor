import type { DataItem, FilterFn, FormulaItem } from '@/types'

const prefixes = ['+', '-', '*', '/', '[', '{', '<']

export function createFilterFn(text: string) {
  const filterFn: FilterFn = {
    data: () => true,
    formula: () => true
  }

  const matched = text.match(/[+\-*\/\[\{\(\<]{0,1}[a-zA-Z0-9\_]+$/)
  if (matched) {
    const idx = matched.index
    if (idx !== null && idx !== undefined) {
      let candidateKey = text.substring(idx, text.length)
      if (prefixes.includes(candidateKey[0])) {
        candidateKey = candidateKey.substring(1, candidateKey.length)
      }
      filterFn.data = (item: DataItem) =>
        item.code.includes(candidateKey) || item.name.includes(candidateKey)
      filterFn.formula = (item: FormulaItem) =>
        item.code.startsWith(candidateKey)
    }
  }

  return filterFn
}
