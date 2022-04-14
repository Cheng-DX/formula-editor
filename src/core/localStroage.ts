import type { DataItem, FormulaItem } from '@/types/dataTypes'
import { ref } from 'vue'
import { DATA_TAG, FORMULA_TAG } from '@/utils/fileds'

export function initLocalStroage() {
  const dataList = ref<DataItem[]>([])
  const formulaList = ref<FormulaItem[]>([])

  for (let key in localStorage) {
    if (key.endsWith('INFO')) {
      const json = localStorage.getItem(key)
      if (json) {
        const r = JSON.parse(json) as DataItem[]
        dataList.value.push(...r)
      }
    } else if (key.endsWith('FORMULA')) {
      const json = localStorage.getItem(key)
      if (json) {
        const r = JSON.parse(json) as FormulaItem[]
        formulaList.value.push(...r)
      }
    }
  }

  return {
    dataList,
    formulaList
  }
}

export function storeItem(item: DataItem | FormulaItem, tag: string) {
  if (tag === DATA_TAG || tag === FORMULA_TAG) {
    if (!localStorage.getItem(tag)) {
      localStorage.setItem(tag, JSON.stringify([item]))
    } else {
      const array = JSON.parse(localStorage.getItem(tag) as string)
      array.push(item)
      localStorage.setItem(tag, JSON.stringify(array))
    }
  }
}
