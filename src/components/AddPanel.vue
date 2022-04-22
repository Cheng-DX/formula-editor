<script setup lang="ts">
import { MyDialog } from '@/components/dialog/MyDialog'
import { ref, computed } from 'vue'
import { addPanelVisible } from '@/core'
import type { AddItem } from '@/types'
import { addData, addFormula } from '@/core/state/addItem'

const target = ref('data')
function switchTarget() {
  target.value = target.value === 'data' ? 'formula' : 'data'
}
const title = computed(() => {
  return `Add ${target.value}`
})

const item = ref<AddItem>({
  code: '',
  name: '',
  target: ''
})

function add() {
  if (buttonAvailable.value) {
    if (target.value === 'data') {
      addData(item.value)
    } else if (target.value === 'formula') {
      addFormula(item.value)
    } else {
      return
    }
  }
}

const buttonAvailable = computed(() => {
  const { code, name, target } = item.value
  console.log(code !== '' && name !== '' && target != '')
  return code !== '' && name !== '' && target != ''
})
</script>

<template>
  <my-dialog :title="title" v-model="addPanelVisible">
    <template #header>
      <button @click="switchTarget" btn ml-10px>🔁 Switch</button>
    </template>
    <div wp-100 hp-100 flex flex-col>
      <div v-for="key in Object.keys(item)" class="item">
        <div :for="key" class="name">{{ key }}</div>
        <textarea v-if="key === 'target'" v-model="item[key]" class="area" />
        <input v-else v-model="item[key]" class="input" />
      </div>
      <div flex-center>
        <button btn w-100px h-35px @click="add" :disabled="!buttonAvailable">
          Push
        </button>
      </div>
    </div>
  </my-dialog>
</template>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.name {
  width: 20%;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
}
.input {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  border: none;
  border-bottom: 1px dotted rgb(122, 120, 120);
  outline: none;
}
.area {
  width: 100%;
  height: 200px;
  border-bottom: 1px dotted rgb(122, 120, 120);
  border-radius: 5px;
  resize: none;
  outline: none;
}
</style>
