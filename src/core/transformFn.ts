function square(src: string) {
  return src.replace(/\{{1,1}[^\{\}]*\}{1,1}\^2/g, match => {
    return `square(${match.slice(1, -3)})`
  })
}

function sqrt(src: string) {
  return src.replace(/\<{1,1}[^\<\>]*\>{1,1}\^0\.5/g, match => {
    return `math.sqrt(${match.slice(1, -5)})`
  })
}

function normalize(src: string) {
  src = src.replace(/\[/g, '(')
  src = src.replace(/\]/g, ')')
  src = src.replace(/\{/g, '(')
  src = src.replace(/\}/g, ')')
  src = src.replace(/\</g, '(')
  src = src.replace(/\>/g, ')')
  return src
}

const transformFns = [square, sqrt]
transformFns.push(normalize)

export { transformFns, normalize }
