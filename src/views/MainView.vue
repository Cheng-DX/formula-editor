<script setup lang="ts">
import type { UploadFile } from 'element-plus'
import { ref } from 'vue'

type dataItem = {
  dataId: string
  name: string
  code: string
  unit: string
}

const fileList = ref<UploadFile[]>([])
const value = ref('')
async function load() {
  for (let file of fileList.value) {
    const text = await file.raw?.text()
    value.value = text ? text : ''
  }
}
</script>

<template>
  <textarea v-model="value" />
  <el-upload
    action="https://jsonplaceholder.typicode.com/posts/"
    multiple
    :file-list="fileList"
    :on-success="load"
  >
    <el-button type="primary">Click to upload</el-button>
  </el-upload>
</template>

<style scoped></style>
