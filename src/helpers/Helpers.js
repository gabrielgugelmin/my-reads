// Obtém parte do texto
export function getExcerpt (str, limit){
  return str.substr(0, str.lastIndexOf(' ', limit)) + '...';
}


// Padroniza textos com camel case
export function normalizeText(text) {
  return text.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
}