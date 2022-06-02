import { computed, ref, watch } from 'vue'

const LS_DARK_MODE_KEY = 'darkMode'

function initValue() {
  if (localStorage.getItem(LS_DARK_MODE_KEY)) {
    return localStorage.getItem(LS_DARK_MODE_KEY) === 'true'
  }
  else {
    localStorage.setItem(LS_DARK_MODE_KEY, 'false')
    return false
  }
}

const darkMode = ref(initValue())

function toggleDarkMode() {
  darkMode.value = !darkMode.value
  localStorage.setItem(LS_DARK_MODE_KEY, String(darkMode.value))
}

const color = computed(() =>
  darkMode.value ? '#fff' : '#333',
)
const backgroundColor = computed(() =>
  darkMode.value ? '#333' : '#fff',
)

watch(darkMode, () => {
  document.body.style.colorScheme = darkMode.value ? 'dark' : 'light'
}, {
  immediate: true,
})

export default function useDarkMode() {
  return {
    darkMode,
    toggleDarkMode,
    color,
    backgroundColor,
  }
}
