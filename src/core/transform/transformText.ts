import { data, formulas } from '../state/sharedStates'
import { handleBracket } from './handleBracket'
import { normalize, transformFns } from './transformFn'
import { MAX_DEPTH } from '@/config'

export function transformText(text: string) {
  let formulaDepth = MAX_DEPTH
  while (
    formulas.value.some(formula => text.includes(formula.code))
    && formulaDepth--
  ) {
    // eslint-disable-next-line prefer-const
    for (let { code, formula } of formulas.value) {
      formula = `(${formula})`
      text = replaceAll(text, code, formula)
    }
  }
  if (formulaDepth === 0)
    throw new Error('too deep')

  text = normalize(text)
  text = handleBracket(text)
  transformFns.forEach(fn => {
    let textDepth = MAX_DEPTH
    let last = 'DEFAULT'
    while (last !== text && textDepth > 0) {
      last = text
      text = fn(text)
      textDepth--
    }
  })

  for (const { code, dataId } of data.value)
    text = replaceAll(text, code, dataId)

  return text
}

function replaceAll(str: string, target: string, replacement: string) {
  const normalChar = /[a-zA-Z0-9\-_]/
  let index = str.indexOf(target)
  while (index !== -1) {
    if (str[index - 1]?.match(normalChar)
    || str[index + target.length]?.match(normalChar)) {
      index = str.indexOf(target, index + 1)
      continue
    }
    str = str.substring(0, index) + replacement + str.substring(index + target.length)
    index = str.indexOf(target)
  }
  return str
}

