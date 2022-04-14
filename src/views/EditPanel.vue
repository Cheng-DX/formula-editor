<script setup lang="ts">
import type { DataItem, FormulaItem } from '@/types'
import { reactive, ref } from 'vue'

const data = ref<DataItem[]>([])
const formulas = ref<FormulaItem[]>([])

for (let key in localStorage) {
  if (key.endsWith('INFO')) {
    const json = localStorage.getItem(key)
    if (json) {
      const r = JSON.parse(json) as DataItem[]
      data.value.push(...r)
    }
  } else if (key.endsWith('FORMULA')) {
    const json = localStorage.getItem(key)
    if (json) {
      const r = JSON.parse(json) as FormulaItem[]
      formulas.value.push(...r)
    }
  }
}

const input = ref('')
const output = ref('')

function transform() {
  let text = input.value

  for (let { code, dataId } of data.value) {
    text = text.replaceAll(code, dataId)
  }
  console.log(text)
  output.value = text
}

const newData = reactive<DataItem>({
  dataId: '',
  code: '',
  name: '',
  unit: ''
})
function addDataItem() {
  const id = newData.dataId
  const code = newData.code
  if (id && code) {
    const item = {
      dataId: id,
      code,
      name: newData.name ? newData.name : 'NO_NAME',
      unit: newData.unit ? newData.unit : '-'
    }
    const tag = 'EXTRO_INFO'
    data.value.push(item)
    if (!localStorage.getItem(tag)) {
      localStorage.setItem(tag, JSON.stringify([item]))
    } else {
      const json = JSON.parse(localStorage.getItem(tag) as string)
      json.push(item)
      localStorage.setItem(tag, JSON.stringify(json))
    }
    transform()
  }
}

const newFormula = reactive<FormulaItem>({
  formulaId: '',
  formula: '',
  name: '',
  code: ''
})
function addFormulaItem() {
  const code = newFormula.code
  const formula = newFormula.formula
  const formulaId = newFormula.formulaId
  if (code && formula && formulaId) {
    const item: FormulaItem = {
      formulaId,
      code,
      formula,
      name: newFormula.name ? newFormula.name : 'NO_NAME'
    }
    const tag = 'EXTRO_FORMULA'
    formulas.value.push(item)
    if (!localStorage.getItem(tag)) {
      localStorage.setItem(tag, JSON.stringify([item]))
    } else {
      const json = JSON.parse(localStorage.getItem(tag) as string)
      json.push(item)
      localStorage.setItem(tag, JSON.stringify(json))
    }
    transform()
  }
}
</script>

<template>
  <div flex h-90vh>
    <div flex hp-100 flex-col items-center p-1 scroll-y>
      <div v-for="key in Object.keys(newData)" wp-100 flex justify-between m-1>
        <span wp-30 text-center>{{ key }}</span>
        <input v-model="newData[key]" wp-70 />
      </div>
      <button @click="addDataItem" btn h-30px w-20 m-2>ADD</button>
      <div
        v-for="item of data"
        flex
        justify-around
        w-400px
        border
        border-gray-300
      >
        <div wp-40 text-center>{{ item.dataId }}</div>
        <div wp-20 text-center>{{ item.code }}</div>
        <div wp-40 text-center>{{ item.name }}</div>
      </div>
    </div>

    <div flex flex-col items-center flex-grow m-10px r-10>
      <textarea v-model="input" text-18px hp-50 m-10px r-5 wp-100 />
      <button @click="transform" btn text-6 w-50px>⬇</button>
      <textarea v-model="output" text-18px hp-50 m-10px r-5 wp-100 />
    </div>

    <div flex hp-100 flex-col items-center p-1 scroll-y>
      <div
        v-for="key in Object.keys(newFormula)"
        wp-100
        flex
        justify-between
        m-1
      >
        <span wp-30 text-center>{{ key }}</span>
        <input v-model="newFormula[key]" wp-70 />
      </div>

      <button @click="addFormulaItem" btn h-30px w-20 m-2>ADD</button>
      <div
        v-for="item of formulas"
        flex
        flex-col
        justify-around
        w-400px
        border
        border-gray-300
      >
        <div>
          <span text-18px p-1 scroll-x color-red>{{ item.code }}</span>
          <span text-18px p-1 scroll-x color-red>{{ item.name }}</span>
        </div>

        <div p-1 scroll-x>{{ item.formula }}</div>
      </div>
    </div>
  </div>
</template>
