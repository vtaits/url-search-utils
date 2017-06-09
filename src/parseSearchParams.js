import parseQuery from './parseQuery'

export default function parseSearchParams(paramsTypes = {}) {
  const search = window.location.search

  return parseQuery(search.substring(1, search.length), paramsTypes)
}
