<script setup lang="ts">
import NavBar from './views/NavBar.vue'
import EditPanel from './views/EditPanel.vue'
</script>

<template>
  <div h-100vh display-flex flex-col flex-grow>
    <nav-bar h-50px class="header" />
    <edit-panel class="main-panel" />
  </div>
</template>

<style scoped>
.header {
  box-shadow: 0px 2px 4px #0000005d;
}
.main-panel {
  height: calc(100vh - 90px);
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
