<script setup lang="ts">
function handleData() {}

function handleFormula() {}
</script>

<template>
  <header display-flex justify-start p-3 items-center>
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
        @change="handleData"
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
      <button btn m-inline-2 h-10 text-18px>UPLOAD FORMULA</button>
      <input
        type="file"
        @change="handleFormula"
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
  </header>
</template>

<style scoped></style>
