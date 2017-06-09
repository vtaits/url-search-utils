export default function stringifyParams(params, mapParamsNames, paramsTypes = {}) {
  return Object.keys(params)
    .map((rawParamName) => {
      const paramName = mapParamsNames[rawParamName] || rawParamName

      if (paramsTypes[paramName]) {
        if (typeof paramsTypes[paramName] === 'function') {
          const paramValue = paramsTypes[paramName](params[paramName])

          return `${paramName}=${encodeURIComponent(paramValue)}`
        }

        switch (paramsTypes[paramName]) {
          case 'exclude':
            return null

          case 'include-if-falsy':
            return `${paramName}=${encodeURIComponent(params[paramName] || '')}`

          default:
            throw new Error(`Unknown type of parameter for serialize "${paramName}": "${paramsTypes[paramName]}"`)
        }
      }

      if (params[paramName] instanceof Array) {
        if (params[paramName].length === 0)  {
          return null
        }

        return params[paramName]
          .map((paramValueItem) => `${paramName}=${encodeURIComponent(paramValueItem)}`)
          .join('&')
      }

      if (!params[paramName]) {
        return null
      }

      return `${paramName}=${encodeURIComponent(params[paramName])}` 
    })
    .filter((item) => item !== null)
    .join('&')
}
