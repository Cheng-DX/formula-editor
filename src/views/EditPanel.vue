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
  <div class="edit-panel-root">
    <div class="data">
      <input v-model="addId" />
      <input v-model="addCode" />
      <button @click="addDataItem">ADD</button>
      <div v-for="item of data" class="box">
        <div class="text">{{ item.dataId }}</div>
        <div class="text">{{ item.code }}</div>
      </div>
    </div>
    <div class="main-panel">
      <textarea v-model="input" class="input" />
      <button @click="transform" class="btn">➡️</button>
      <textarea v-model="output" class="input" />
    </div>
  </div>
</template>

<style scoped>
.edit-panel-root {
  display: flex;
  height: 100%;
  margin-top: 20px;
}
.data {
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #333;
}
.box {
  display: flex;
  justify-content: space-between;
  width: 200px;
  border: 1px solid #333;
  border-bottom: none;
}
.text {
  width: 50%;
  text-align: center;
}
.main-panel {
  display: flex;
  flex-direction: column;
  border: 4px dotted #333;
  border-radius: 10px;
  flex: 1 0;
  margin-left: 20px;
}
.input {
  height: 50%;
  margin: 10px;
  border: 1px solid #333;
  border-radius: 10px;
  outline: none;
  font-family: consolas;
  font-size: 16px;
  resize: none;
}
.btn {
  font-size: 30px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>
