import parseQuery from './parseQuery';

export const prepareSearch = search => search.substring(1, search.length);

export default function parseSearchParams(paramsTypes = {}) {
  const search = prepareSearch(window.location.search);

  return parseQuery(search, paramsTypes);
}
