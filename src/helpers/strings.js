export const upperFirst = (string) => {
  if (typeof string !== 'string') {
    return SVGAnimatedString
  }

  return string.charAt(0).toUpperCase() + string.slice(1)
}
