<script setup lang="ts">
import { computed } from 'vue'
import {
  addPanelVisible,
  clearAllLocalStorage,
  exportLocalStroage,
  filterFn,
  importFiles,
  useTips,
} from '@/core'

function handleImportFiles(event: Event, tag: string) {
  const fileInput = event.target as HTMLInputElement
  const files = fileInput.files
  if (files)
    importFiles(files, tag)
}
const buttonClass = 'btn m-inline-2 h-8 text-15px '

const tipsState = computed(() =>
  useTips.value ? '✅ Tips opend' : '❌ Tips closed',
)

function switchUseTips() {
  useTips.value = !useTips.value
  filterFn.value = {
    data: () => true,
    formula: () => true,
  }
}
</script>

<template>
  <header wp-100>
    <div h-30px p-10px flex justify-between items-center>
      <div flex items-center wp-70>
        <a
          icon-btn
          color-black
          h-7
          w-7
          i-carbon-logo-github
          href="https://github.com/Cheng-DX/formula-tool"
          target="_blank"
          title="GitHub"
        />
        <label for="uploadFile" position-relative>
          <button :class="buttonClass">Data</button>
          <input
            type="file"
            multiple
            accept=".json"
            position-absolute
            left-0
            top-0
            opacity-0
            h-10
            w-159px
            cursor-pointer
            @change="e => handleImportFiles(e, 'INFO')"
          >
        </label>

        <label for="uploadFile" position-relative>
          <button :class="buttonClass">Formula</button>
          <input
            type="file"
            multiple
            accept=".json"
            position-absolute
            left-0
            top-0
            opacity-0
            h-10
            w-159px
            cursor-pointer
            @change="e => handleImportFiles(e, 'FORMULA')"
          >
        </label>
        <button :class="buttonClass" @click="exportLocalStroage">
          Export
        </button>
        <button :class="buttonClass" @click="switchUseTips">
          {{ tipsState }}
        </button>
        <button :class="buttonClass" @click="addPanelVisible = true">
          Add
        </button>
      </div>
      <button
        :class="buttonClass"
        w-100px
        mr-10px
        btn
        bg-red
        hover:bg-red-500
        style="max-width: 150px"
        @click="clearAllLocalStorage"
      >
        Delete
      </button>
    </div>
  </header>
</template>

<style scoped></style>
