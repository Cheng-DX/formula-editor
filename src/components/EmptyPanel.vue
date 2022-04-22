<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <div hp-100 flex-center flex-col>
    <img class="img" src="@/assets/open-box.png" />
    <span class="text" mt-3px>{{ text ? text : 'No Results' }}</span>
  </div>
</template>

<style scoped>
.img {
  width: 100px;
  height: 100px;
}
.text {
  color: #c48d69;
}
</style>
