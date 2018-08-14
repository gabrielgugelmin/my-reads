
// Padroniza textos com camel case
export function normalizeText(text) {
  return text.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
}