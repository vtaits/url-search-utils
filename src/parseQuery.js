export default function parseQuery(search, paramsTypes = {}) {
  if (search.length === 0) {
    return {};
  }

  return search.split('&')
    .reduce((res, searchItem) => {
      const [name, rawValue] = searchItem.split('=');
      const value = decodeURIComponent(rawValue);

      if (paramsTypes[name]) {
        if (typeof paramsTypes[name] === 'function') {
          res[name] = paramsTypes[name](value, res[name]);

          return res;
        }

        switch (paramsTypes[name]) {
          case 'array-of-strings':
            if (!res[name]) {
              res[name] = [];
            }

            res[name].push(value);

            return res;

          case 'array-of-numbers':
            if (!res[name]) {
              res[name] = [];
            }

            res[name].push(parseFloat(value));

            return res;

          case 'number':
            res[name] = parseFloat(value);

            return res;

          case 'exclude':

            return res;

          default:
            throw new Error(`Unknown type of parameter for parse "${name}": "${paramsTypes[name]}"`);
        }
      }

      res[name] = value;

      return res;
    }, {});
}
