<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  addPanelVisible,
  clearAllLocalStorage,
  exportLocalStorage,
  filterFn,
  importFiles,
  useTips,
} from '@/core'
import useDarkMode from '@/core/use/useDarkMode'

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

const version = ref({
  name: 'padding...',
  href: '',
})
async function fetchVersion() {
  const data = await fetch('https://api.github.com/repos/Cheng-DX/formula-editor/releases/latest')
  const json = await data.json()
  version.value.name = json.name
  version.value.href = json.html_url
}
fetchVersion()

const { darkMode, toggleDarkMode, color, backgroundColor } = useDarkMode()

const themeIcon = computed(() =>
  darkMode.value ? 'i-carbon-moon' : 'i-carbon-sun',
)

</script>

<template>
  <header wp-100 :style="{color,backgroundColor}">
    <div h-30px p-10px flex justify-between items-center>
      <div flex items-center wp-70>
        <a
          icon-btn h-7 w-7 :style="{color}" i-carbon-logo-github href="https://github.com/Cheng-DX/formula-tool"
          target="_blank" title="GitHub"
        />
        <div
          icon-btn h-7 w-7 ml-1em :class="themeIcon" @click="toggleDarkMode"
        />
        <label for="uploadFile" position-relative>
          <button :class="buttonClass">Data</button>
          <input
            type="file" multiple accept=".json" position-absolute left-0 top-0 opacity-0 h-10 w-159px
            cursor-pointer @change="e => handleImportFiles(e, 'INFO')"
          >
        </label>

        <label for="uploadFile" position-relative>
          <button :class="buttonClass">Formula</button>
          <input
            type="file" multiple accept=".json" position-absolute left-0 top-0 opacity-0 h-10 w-159px
            cursor-pointer @change="e => handleImportFiles(e, 'FORMULA')"
          >
        </label>
        <button :class="buttonClass" @click="exportLocalStorage">
          Export
        </button>
        <button :class="buttonClass" @click="switchUseTips">
          {{ tipsState }}
        </button>
        <button :class="buttonClass" @click="addPanelVisible = true">
          Add
        </button>
      </div>
      <div flex items-center>
        <button
          :class="buttonClass" w-100px mr-10px btn bg-red hover:bg-red-500 style="max-width: 150px"
          @click="clearAllLocalStorage"
        >
          Delete
        </button>
        <a :href="version.href" btn link-decoration-none>
          {{ version.name }}
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
</style>
