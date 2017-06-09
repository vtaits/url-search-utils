import stringifyParams from './stringifyParams'

export default function setSearchParams(params, mapParamsNames, paramsTypes) {
  const paramsStr = stringifyParams(params, mapParamsNames, paramsTypes)

  window.history.replaceState({}, null, `${ window.location.pathname }?${ paramsStr }`)
}
