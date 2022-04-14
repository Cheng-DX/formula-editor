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

// export function exportJSON() {
//   const result = []
//   for (let i = 0; i < size.value; i++) {
//     for (let j = 0; j < size.value; j++) {
//       if (pixels.value[i][j]) {
//         result.push({
//           x: i,
//           y: j,
//           color: pixels.value[i][j]
//         })
//       }
//     }
//   }
//   const json = {
//     mode: mode.value,
//     data: result
//   }
//   const a = document.createElement('a')
//   a.href =
//     'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json))
//   a.download = 'pixels.json'
//   a.click()
// }

// async function handleFile(event: any) {
//   const file = event.target.files[0]
//   const { mode: savedMode, data } = JSON.parse(await file.text())
//   if (data.length === 0) {
//     alert('EMPTY FILE')
//     return
//   }
//   mode.value = savedMode
//   _clear()
//   nextTick(() => {
//     for (let item of data) {
//       pixels.value[item.x][item.y] = item.color
//     }
//   })
// }
