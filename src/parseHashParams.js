import parseQuery from './parseQuery'

export default function parseHashParams(paramsTypes = {}) {
  const search = window.location.hash.replace(/^#/, '')

  return parseQuery(search, paramsTypes)
}
