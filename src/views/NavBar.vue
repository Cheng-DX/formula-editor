<script setup lang="ts">
import {
  clearAllLocalStorage,
  exportLocalStroage,
  importFiles
} from '@/core/localStroage'
import { computed } from '@vue/reactivity'
import { useTips, addPanelVisible } from '@/core/sharedStates'

function handleImportFiles(event: Event, tag: string) {
  const fileInput = event.target as HTMLInputElement
  const files = fileInput.files
  if (files) {
    importFiles(files, tag)
  } else {
    return
  }
}
const buttonClass = 'btn m-inline-2 h-8 text-15px '

const tipsState = computed(() =>
  useTips.value ? '✅ Tips opend' : '❌ Tips closed'
)
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
            @change="e => handleImportFiles(e, 'INFO')"
            accept=".json"
            position-absolute
            left-0
            top-0
            opacity-0
            h-10
            w-159px
            cursor-pointer
          />
        </label>

        <label for="uploadFile" position-relative>
          <button :class="buttonClass">Formula</button>
          <input
            type="file"
            multiple
            @change="e => handleImportFiles(e, 'FORMULA')"
            accept=".json"
            position-absolute
            left-0
            top-0
            opacity-0
            h-10
            w-159px
            cursor-pointer
          />
        </label>
        <button :class="buttonClass" @click="exportLocalStroage">Export</button>
        <button :class="buttonClass" @click="useTips = !useTips">
          {{ tipsState }}
        </button>
        <button :class="buttonClass" @click="addPanelVisible = true">
          Add
        </button>
      </div>
      <button
        @click="clearAllLocalStorage"
        :class="buttonClass"
        wp-20
        mr-10px
        btn
        bg-red
        hover:bg-red-500
        style="max-width: 150px"
      >
        Delete
      </button>
    </div>
  </header>
</template>

<style scoped></style>
