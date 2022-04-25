export function handleBracket(src: string) {
  const indexesOfsquare = findIndexes(src, '^2')
  const indexesOfsqrt = findIndexes(src, '^0.5')

  src = replaceBrackets(indexesOfsquare, src, '{', '}')
  src = replaceBrackets(indexesOfsqrt, src, '<', '>')
  return src
}

function findIndexes(src: string, str: string) {
  let idx = src.indexOf(str)
  const idxes = []
  while (idx !== -1) {
    idxes.push(idx)
    idx = src.indexOf(str, idx + 2)
  }
  return idxes
}

function replaceBrackets(
  idxes: number[],
  src: string,
  startBracket: string,
  endBracket: string,
) {
  idxes.forEach(idx => {
    const stack: string[] = []
    let startBracketIdx = -1
    for (let i = idx; i >= 0; i--) {
      const char = src[i]
      if (char === ')') {
        stack.push(char)
      }
      else if (char === '(') {
        stack.pop()
        if (stack.length === 0) {
          startBracketIdx = i
          break
        }
      }
      else {
        continue
      }
    }
    if (startBracketIdx !== -1) {
      const charArr = [...src]
      const endBracketIdx = idx - 1
      charArr[startBracketIdx] = startBracket
      charArr[endBracketIdx] = endBracket
      src = charArr.join('')
    }
    else {
      throw new Error('cannot find start bracket')
    }
  })

  return src
}
