<script setup lang="ts">
import { computed, ref } from 'vue'
import { MyDialog } from '@/components/dialog/MyDialog'
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
  target: '',
})

const buttonAvailable = computed(() => {
  const { code, name, target } = item.value
  return code !== '' && name !== '' && target !== ''
})

function add() {
  if (buttonAvailable.value) {
    if (target.value === 'data')
      addData(item.value)
    else if (target.value === 'formula')
      addFormula(item.value)
  }
}

</script>

<template>
  <my-dialog v-model="addPanelVisible" :title="title">
    <template #header>
      <button btn ml-10px @click="switchTarget">
        🔁 Switch
      </button>
    </template>
    <div hp-100 wp-100 flex flex-col>
      <div v-for="key in Object.keys(item)" :key="key" class="item">
        <div :for="key" class="name">
          {{ key }}
        </div>
        <textarea v-if="key === 'target'" v-model="item[key]" class="area" />
        <input v-else v-model="item[key]" class="input">
      </div>
      <div flex-center>
        <button btn w-100px h-35px :disabled="!buttonAvailable" @click="add">
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
  padding: 10px;
  font-size: 16px;
  width: calc(100% - 20px);
  height: 200px;
  border-bottom: 1px dotted rgb(122, 120, 120);
  border-radius: 5px;
  resize: none;
  outline: none;
}
</style>
