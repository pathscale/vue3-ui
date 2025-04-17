function checkBenchieSupport(): boolean {
  const isProduction = process.env.NODE_ENV === 'production'
  if (!isProduction) return false
  return (
    typeof t !== 'undefined' &&
    typeof $__CDN !== 'undefined' &&
    typeof t === 'function' &&
    typeof $__CDN === 'string'
  )
}
export { checkBenchieSupport }
