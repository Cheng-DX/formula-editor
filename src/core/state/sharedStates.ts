import { ref } from 'vue'
import type { DataItem, FilterFn, FormulaItem } from '@/types'

export const useTips = ref(true)

export function saveTips() {
  localStorage.setItem('tips', JSON.stringify(useTips.value))
}

export const addPanelVisible = ref(false)

export const data = ref<DataItem[]>([])
export const formulas = ref<FormulaItem[]>([])

export const filterFn = ref<FilterFn>({
  data: () => true,
  formula: () => true,
})
