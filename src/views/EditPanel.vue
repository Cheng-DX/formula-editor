<script setup lang="ts">
import { ref } from 'vue'
import {
  initLocalStroage,
  initDisplayedItems,
  updateFilterFn,
  useTips,
  transformText
} from '@/core'

import AddPanel from '@/components/AddPanel.vue'

initLocalStroage()
const { displayedData, displayedFormulas } = initDisplayedItems()

const input = ref('')
const output = ref('')

function transform() {
  const text = input.value
  output.value = transformText(text)
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
    const text = input.value
    updateFilterFn(text)
  }
  transform()
}
</script>

<template>
  <add-panel />
  <div flex hp-100>
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
        <button @click="clear" btn bg-red hover:bg-red-500>Clear</button>
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
  border-top-left-radius: 4px;
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
