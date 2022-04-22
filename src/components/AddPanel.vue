<script setup lang="ts">
import { MyDialog } from '@/components/dialog/MyDialog'
import { ref, computed } from 'vue'
import { addPanelVisible } from '@/core'

const target = ref('data')
function switchTarget() {
  target.value = target.value === 'data' ? 'formula' : 'data'
}
const title = computed(() => {
  return `Add ${target.value}`
})
</script>

<template>
  <my-dialog :title="title" v-model="addPanelVisible">
    <template #header>
      <button @click="switchTarget" btn ml-10px>Switch</button>
    </template>
    <div wp-100 hp-100></div>
  </my-dialog>
</template>

<style scoped></style>
