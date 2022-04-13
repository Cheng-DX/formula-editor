<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()
function push(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="root">
    <header class="header">
      <el-button class="btn" @click="push('/load-json')"> load JSON </el-button>
      <el-button class="btn" @click="push('/edit')"> edit </el-button>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
}
.btn {
  margin: 0 10px;
  background-color: #397f34;
  color: white;
  font-size: 20px;
}
.header {
  height: 60px;
  display: flex;
  justify-content: flex-start;
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
