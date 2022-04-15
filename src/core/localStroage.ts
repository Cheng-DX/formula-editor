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

export function clearAllLocalStorage() {
  const result = confirm(
    '即将清空所有本地存储,包括所有数据和公式,该操作无法撤回,确定吗?'
  )
  if (result) {
    // localStorage.clear()
    console.log('clear all local storage')
  }
}

export function exportLocalStroage() {
  const len = localStorage.length
  const dataList: DataItem[] = []
  const formulaList: FormulaItem[] = []

  for (let i = 0; i < len; i++) {
    const key = localStorage.key(i)
    if (key) {
      const json = localStorage.getItem(key) as string
      if (key.endsWith('INFO')) {
        const r = JSON.parse(json) as DataItem[]
        dataList.push(...r)
      } else if (key.endsWith('FORMULA')) {
        const r = JSON.parse(json) as FormulaItem[]
        formulaList.push(...r)
      } else {
        console.log('unresolvable key:', key)
      }
    }
  }
  _exportJSON(JSON.stringify(dataList), 'data')
  _exportJSON(JSON.stringify(formulaList), 'formula')
}

function _exportJSON(json: string, filename: string) {
  const a = document.createElement('a')
  a.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(json)
  a.download = `${filename}.json`
  a.click()
}

function importJSON() {}
