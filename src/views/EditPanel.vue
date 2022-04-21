<script setup lang="ts">
import { initLocalStroage } from '@/core/localStroage'
import { ref } from 'vue'
import { transformFns, normalize } from '@/core/transformFn'
import { handleBracket } from '@/core/handleBracket'
import { computed } from '@vue/reactivity'
import type { FilterFn } from '@/types'
import { createFilterFn } from '@/core/filterFn'
import { useTips } from '@/core/sharedStates'

const { dataList: data, formulaList: formulas } = initLocalStroage()

const filterFn = ref<FilterFn>({
  data: () => true,
  formula: () => true
})
const displayedData = computed(() => {
  return data.value.filter(filterFn.value.data)
})
const displayedFormulas = computed(() => {
  return formulas.value.filter(filterFn.value.formula)
})

function filter() {
  const text = input.value
  filterFn.value = createFilterFn(text)
}

const input = ref('')
const output = ref('')

const MAX_DEEP = 10
function transform() {
  let text = input.value
  let maxDeep = MAX_DEEP

  while (
    formulas.value.some(formula => text.includes(formula.code)) &&
    maxDeep--
  ) {
    for (let { code, formula } of formulas.value) {
      formula = `(${formula})`
      text = text.replaceAll(code, formula)
    }
  }
  if (maxDeep === 0) throw new Error('too deep')

  text = normalize(text)
  text = handleBracket(text)
  transformFns.forEach(fn => {
    let maxDeep = MAX_DEEP
    let last = 'DEFAULT'
    while (last !== text && maxDeep > 0) {
      last = text
      text = fn(text)
      maxDeep--
    }
  })

  for (let { code, dataId } of data.value) {
    text = text.replaceAll(code, dataId)
  }
  output.value = text
}

function insert(code: string) {
  input.value += code
  onInput()
}

function clear() {
  input.value = ''
  onInput()
}
function onInput() {
  if (useTips.value) {
    filter()
  }
  transform()
}
</script>

<template>
  <div flex>
    <div flex hp-100 wp-25 color-white flex-col items-center scroll-y>
      <div mt-10px wp-95>
        <div
          v-for="item of displayedData"
          :key="item.code"
          @click="insert(item.code)"
          cursor-pointer
          flex-center
          justify-around
          p-10px
          mt-5px
          border
          border-gray-300
          r-5
          class="data-card"
        >
          <span wp-30 class="data-card-item">{{ item.dataId }}</span>
          <span wp-30 class="data-card-item">{{ item.code }}</span>
          <span wp-40 class="data-card-item">{{ item.name }}</span>
        </div>
      </div>
    </div>

    <div flex flex-col items-center flex-grow m-10px r-10>
      <textarea @input="onInput" v-model="input" class="area" />
      <div>
        <button @click="clear" btn bg-red hover:bg-red-500>CLEAR</button>
      </div>
      <textarea v-model="output" class="area" />
    </div>

    <div flex hp-100 wp-25 flex-col items-center scroll-y>
      <div mt-10px wp-95>
        <div
          v-for="item of displayedFormulas"
          flex
          flex-col
          mt-5px
          justify-around
          border
          style="border: 1px solid #167f9f"
          r-5
        >
          <div @click="insert(item.code)" cursor-pointer class="title">
            <span p-5px scroll-x>{{ item.code }}</span>
            <span p-5px scroll-x>{{ `(${item.name})` }}</span>
          </div>

          <span p-1 mt-10px scroll-x style="word-wrap: break-all">
            {{ item.formula }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .data-card {
    flex-direction: column;
  }
  .data-card-item {
    width: 100%;
  }
}
.data-card {
  background-color: #548ca8;
}
.data-card-item {
  color: #fff;
  text-align: center;
}
.title {
  background-color: #167f9f;
  color: #fff;
  border-radius: 5px;
  padding: 5px;
}
.area {
  height: 50%;
  width: calc(100% - 20px);
  margin: 10px;
  padding: 10px;
  font-size: 18px;
  font-family: 'consolas';
  font-weight: 500;
  border: 1px solid #1d5043;
  border-radius: 10px;
  outline: none;
  resize: none;
}
</style>
