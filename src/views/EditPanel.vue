<script setup lang="ts">
import type { DataItem } from '@/types'
import { ref } from 'vue'

const data = ref<DataItem[]>([])
for (let key in localStorage) {
  if (key.endsWith('INFO')) {
    const json = localStorage.getItem(key)
    if (json) {
      const r = JSON.parse(json) as DataItem[]
      data.value.push(...r)
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

const addId = ref('')
const addCode = ref('')
function addDataItem() {
  const id = addId.value
  const code = addCode.value
  if (id && code) {
    const item = {
      dataId: id,
      code,
      name: 'temp',
      unit: '-'
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
</script>

<template>
  <div flex h-90vh>
    <div flex hp-100 flex-col items-center p-1 scroll-y>
      <div wp-100 flex justify-between m-1>
        <span>target</span>
        <input v-model="addId" wp-80 />
      </div>
      <div w-full flex justify-between m-1>
        <span>code</span>
        <input v-model="addCode" wp-80 />
      </div>

      <button @click="addDataItem" btn h-10 w-20 m-2>ADD</button>
      <div
        v-for="item of data"
        flex
        justify-around
        w-300px
        border
        border-gray-300
      >
        <div wp-33 text-center>{{ item.dataId }}</div>
        <div wp-33 text-center>{{ item.code }}</div>
        <div wp-33 text-center>{{ item.name }}</div>
      </div>
    </div>
    <div flex flex-col items-center flex-grow m-10px r-10>
      <textarea v-model="input" text-18px hp-50 m-10px r-5 wp-100 />
      <button @click="transform" btn text-6 w-50px>⬇</button>
      <textarea v-model="output" text-18px hp-50 m-10px r-5 wp-100 />
    </div>
  </div>
</template>
