import stringifyParams from './stringifyParams'

export const getNewUrl = (pathname, paramsStr) => `${pathname}?${paramsStr}`

export default function setSearchParams(params, mapParamsNames, paramsTypes) {
  const paramsStr = stringifyParams(params, mapParamsNames, paramsTypes)
  const newUrl = getNewUrl(window.location.pathname, paramsStr)

  window.history.replaceState({}, null, newUrl)
}
