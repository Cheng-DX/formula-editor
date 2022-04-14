<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()
function push(path: string) {
  router.push(path)
}
</script>

<template>
  <div h-100vh display-flex flex-col flex-grow>
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
      <button btn m-inline-2 h-10 text-18px @click="push('/load-json')">
        load JSON
      </button>
      <button btn h-10 text-18px @click="push('/edit')">edit</button>
    </header>
    <main class="h-100%">
      <router-view v-slot="{ Component }">
        <transition>
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
