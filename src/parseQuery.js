export default function parseQuery(search, paramsTypes = {}) {
  if (search.length === 0) {
    return {}
  }

  return search.split('&')
    .reduce((result, searchItem) => {
      const [name, rawValue] = searchItem.split('=')
      const value = decodeURIComponent(rawValue)

      if (paramsTypes[name]) {
        if (typeof paramsTypes[name] === 'function') {
          result[name] = paramsTypes[name](value, result[name])

          return result
        }

        switch (paramsTypes[name]) {
          case 'array-of-strings':
            if (!result[name]) {
              result[name] = []
            }

            result[name].push(value)

            return result

          case 'array-of-numbers':
            if (!result[name]) {
              result[name] = []
            }

            result[name].push(parseFloat(value))

            return result

          case 'number':
            result[name] = parseFloat(value)

            return result

          case 'exclude':

            return result

          default:
            throw new Error(`Unknown type of parameter for parse "${name}": "${paramsTypes[name]}"`)
        }
      }

      result[name] = value

      return result
    }, {})
}
