import { computed } from 'vue'
import { data, filterFn, formulas } from '../state/sharedStates'

export function initDisplayedItems() {
  const displayedData = computed(() => {
    return data.value.filter(filterFn.value.data)
  })
  const displayedFormulas = computed(() => {
    return formulas.value.filter(filterFn.value.formula)
  })

  return { displayedData, displayedFormulas }
}
