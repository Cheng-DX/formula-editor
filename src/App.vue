<script setup lang="ts">
import NavBar from './views/NavBar.vue'
import EditPanel from './views/EditPanel.vue'
</script>

<template>
  <div class="root">
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
  width: 7px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #25252549;
  border-radius: 3px;
}
</style>
