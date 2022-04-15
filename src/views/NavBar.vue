<script setup lang="ts">
import {
  clearAllLocalStorage,
  exportLocalStroage,
  importFiles
} from '@/core/localStroage'

function handleImportFiles(event: Event, tag: string) {
  const fileInput = event.target as HTMLInputElement
  const files = fileInput.files
  if (files) {
    importFiles(files, tag)
  } else {
    return
  }
}
</script>

<template>
  <header flex justify-between p-3 items-center>
    <div flex items-center>
      <a
        icon-btn
        color-black
        h-8
        w-8
        i-carbon-logo-github
        href="https://github.com/Cheng-DX/formula-tool"
        target="_blank"
        title="GitHub"
      />
      <label for="uploadFile" position-relative>
        <button btn m-inline-2 h-10 text-18px>UPLOAD DATA</button>
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
        <button btn h-10 text-18px>UPLOAD FORMULA</button>
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
      <button btn m-inline-2 h-10 text-18px @click="exportLocalStroage">
        EXPORT FILES
      </button>
    </div>

    <button
      @click="clearAllLocalStorage"
      btn
      bg-red
      hover:bg-red-500
      h-10
      text-18px
    >
      DELETE ALL
    </button>
  </header>
</template>

<style scoped></style>
