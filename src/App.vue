<script setup lang="ts">
import NavBar from './views/NavBar.vue'
import EditPanel from './views/EditPanel.vue'
import useDarkMode from './core/use/useDarkMode'

const { darkMode, color, backgroundColor } = useDarkMode()
</script>

<template>
  <div
    class="root" :style="{
      color,
      backgroundColor
    }"
  >
    <nav-bar h-50px class="header" />
    <edit-panel mt-50px class="main" />
  </div>
</template>

<style scoped>
.root {
  height: calc(100vh - 60px);
  margin-top: 50px;
}
.header {
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0px 2px 4px #0000005d;
}
.main {
  height: 100%;
}
</style>

<style>
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-thumb {
  background-color: #5d58586d;
  border-radius: 3px;
}
</style>
