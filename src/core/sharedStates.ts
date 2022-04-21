import { ref } from 'vue'

export const useTips = ref(true)

export function saveTips() {
  localStorage.setItem('tips', JSON.stringify(useTips.value))
}
