import stringifyParams from './stringifyParams';

export default function setHashLocationQuery(params, mapParamsNames, paramsTypes) {
  const paramsStr = stringifyParams(params, mapParamsNames, paramsTypes);

  const hashWithoutSearch = window.location.hash
    .replace(/^#/, '')
    .split('?')[0];

  window.history.replaceState(null, null, `#${hashWithoutSearch}?${paramsStr}`);
}
