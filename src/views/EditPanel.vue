<script setup lang="ts">
import { initLocalStroage, storeItem } from '@/core/localStroage'
import type { DataItem, FormulaItem } from '@/types/index'
import { DATA_TAG, FORMULA_TAG } from '@/utils/fileds'
import { reactive, ref } from 'vue'
import { transformFns, normalize } from '@/core/transformFn'
import { handleBracket } from '@/core/handleBracket'

const MAX_DEEP = 10

const { dataList: data, formulaList: formulas } = initLocalStroage()

const input = ref('')
const output = ref('')

function transform() {
  let text = input.value
  let maxDeep = MAX_DEEP

  // handle formulas in the input anf formulas in formulas
  while (
    formulas.value.some(formula => text.includes(formula.code)) &&
    maxDeep--
  ) {
    for (let { code, formula } of formulas.value) {
      if (!formula.startsWith('(') || !formula.endsWith(')')) {
        formula = `(${formula})`
      }
      text = text.replaceAll(code, formula)
    }
  }
  if (maxDeep === 0) {
    throw new Error('too deep')
  }

  // normalize the brackets, transform all to ( and )
  text = normalize(text)

  // handle brackets, prepare for the next step
  text = handleBracket(text)

  // handle ^2 ^0.5
  transformFns.forEach(fn => {
    let maxDeep = MAX_DEEP
    let last = 'DEFAULT'
    while (last !== text && maxDeep > 0) {
      last = text
      text = fn(text)
      maxDeep--
    }
  })

  // replace data
  for (let { code, dataId } of data.value) {
    text = text.replaceAll(code, dataId)
  }
  output.value = text
}

const newData = reactive<DataItem>({
  dataId: '',
  code: '',
  name: '',
  unit: ''
})
function addDataItem() {
  const { dataId, code, name = 'NO_NAME', unit = '-' } = newData
  if (dataId && code) {
    const item = {
      dataId,
      code,
      name,
      unit
    }
    const tag = DATA_TAG
    data.value.push(item)
    storeItem(item, tag)
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
  const { formulaId, formula, code, name = 'NO_NAME' } = newFormula
  if (code && formula && formulaId) {
    const item: FormulaItem = {
      formulaId,
      formula,
      name,
      code
    }
    const tag = FORMULA_TAG
    formulas.value.push(item)
    storeItem(item, tag)
    transform()
  }
}
</script>

<template>
  <div flex>
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
      <textarea
        @input="transform"
        v-model="input"
        text-18px
        hp-50
        m-10px
        r-5
        wp-100
      />
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
          <span text-18px p-1 scroll-x color-red>{{ `(${item.name})` }}</span>
        </div>

        <div p-1 scroll-x>{{ item.formula }}</div>
      </div>
    </div>
  </div>
</template>
