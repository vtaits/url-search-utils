import parseQuery from './parseQuery'

export default function parseHashParams(paramsTypes = {}) {
  const search = window.location.hash.split('?')[1] || ''

  return parseQuery(search, paramsTypes)
}
