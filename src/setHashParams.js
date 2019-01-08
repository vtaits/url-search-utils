import stringifyParams from './stringifyParams';

export default function setHashParams(params, mapParamsNames, paramsTypes) {
  const paramsStr = stringifyParams(params, mapParamsNames, paramsTypes);

  window.history.replaceState(null, null, `#${paramsStr}`);
}
