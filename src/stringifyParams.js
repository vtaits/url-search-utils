export default function stringifyParams(params, mapParamsNames = {}, paramsTypes = {}) {
  return Object.keys(params)
    .map((rawParamName) => {
      const paramName = mapParamsNames[rawParamName] || rawParamName
      const paramValue = params[rawParamName]

      if (paramsTypes[paramName]) {
        if (typeof paramsTypes[paramName] === 'function') {
          const mappedParamValue = paramsTypes[paramName](paramValue)

          if (mappedParamValue === null ||
            typeof mappedParamValue === 'undefined') {
            return null
          }

          return `${paramName}=${encodeURIComponent(mappedParamValue)}`
        }

        switch (paramsTypes[paramName]) {
          case 'exclude':
            return null

          case 'include-if-falsy':
            return `${paramName}=${encodeURIComponent(paramValue || '')}`

          default:
            throw new Error(`Unknown type of parameter for serialize "${paramName}": "${paramsTypes[paramName]}"`)
        }
      }

      if (paramValue instanceof Array) {
        if (paramValue.length === 0)  {
          return null
        }

        return paramValue
          .map((paramValueItem) => `${paramName}=${encodeURIComponent(paramValueItem)}`)
          .join('&')
      }

      if (!paramValue) {
        return null
      }

      return `${paramName}=${encodeURIComponent(paramValue)}`
    })
    .filter((item) => item !== null)
    .join('&')
}
