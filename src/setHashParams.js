import stringifyParams from './stringifyParams'

export default function setHashParams(params, mapParamsNames, paramsTypes) {
  const paramsStr = stringifyParams(params, mapParamsNames, paramsTypes)

  const hashWithoutSearch = window.location.hash.split('?')[0]

  window.location.hash = `${ hashWithoutSearch }?${ paramsStr.toString() }`
}
