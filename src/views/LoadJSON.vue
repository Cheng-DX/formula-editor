<script setup lang="ts">
import type { DataItem, FormulaItem } from '@/types'
import { ref } from 'vue'
import {
  DATAID_FIELD,
  NAME_FIELD,
  CODE_FILED,
  UNIT_FILED,
  FORMULAID_FIELD,
  FORMULA_FIELD
} from '@/utils/fileds'

// const store: any = {}
// const fileList = ref([])
// async function load() {
//   for (let file of fileList.value) {
//     const text = await file.raw?.text()
//     if (!text) continue
//     const r = transformToDataItem(text)
//     const name = file.name.replace(/\..*$/, '')
//     store[name] = r

//     localStorage.setItem(name, JSON.stringify(r))
//   }
// }
// function transformToDataItem(json: string) {
//   if (!json) return

//   const dataList = JSON.parse(json)
//   const result: DataItem[] = []
//   for (let data of dataList) {
//     result.push({
//       dataId: data[DATAID_FIELD],
//       name: data[NAME_FIELD],
//       code: data[CODE_FILED],
//       unit: data[UNIT_FILED]
//     })
//   }
//   return result
// }

// const formulaList = ref([])
// async function loadFormula() {
//   for (let file of formulaList.value) {
//     const text = await file.raw?.text()
//     if (!text) continue
//     const r = transformToFormulaItem(text)
//     const name = file.name.replace(/\..*$/, '')
//     store[name] = r

//     localStorage.setItem(name, JSON.stringify(r))
//   }
// }
// function transformToFormulaItem(json: string) {
//   if (!json) return

//   const dataList = JSON.parse(json)
//   const result: FormulaItem[] = []
//   for (let data of dataList) {
//     result.push({
//       formulaId: data[FORMULAID_FIELD],
//       name: data[NAME_FIELD],
//       formula: data[FORMULA_FIELD],
//       code: data[CODE_FILED]
//     })
//   }
//   return result
// }
</script>

<template>
  <div display-flex justify-center items-center class="h-100%">
    <span text-30px font-700>BUILDING</span>
  </div>
</template>

<style scoped></style>
