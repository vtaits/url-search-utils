# url-search-utils
A simple set of utils for manipulate search params in query string. Supports the hash and browser histories.

## Installation

```
npm install url-search-utils --save
```

## Api docs

### Parsing query

```
import {parseSearchParams, parseHashParams} from 'url-search-utils';

...

parseSearchParams(config) // parse get arguments
parseHashParams(config) // parse get-like arguments in hash
```

`config` is an object with keys is get-params names and values is one of:

 - `'number'` for numeric params.
 - `'array-of-strings'` for arrays of strings.
 - `'array-of-numbers'` for arrays of numbers.
 - `'exclude'` for exclude param from result.
 - `function(value, accumulator = initialValue) {...}` where value is current value of found get-param and accumulator is value from previous function call if param with current name occurs several times (`undefined` by default).

For example:

```
// current query is '?param1=value1&numberparam=2&strarray=str1&strarray=str2&strarray=str3&date=2017-09-06'

const parsed = parseSearchParams({
  numberparam: 'number',
  strarray: 'array-of-strings',
  date: (dateStr) => moment(dateStr, 'YYYY-MM-DD'),
})

//  returns
//  {
//    param1: 'value1',
//    numberparam: 2,
//    strarray: ['str1', 'str2', 'str3'],
//    date: moment('2017-09-06', 'YYYY-MM-DD'),
//  }
```

### Setting query

```
import {setSearchParams, setHashParams} from 'url-search-utils';

...

setSearchParams(values, mapParamsNames, config) // set get arguments
setHashParams(values, mapParamsNames, config) // set get-like arguments in hash
```

`values` is an object that should be setted to query.

`mapParamsNames` is an object with keys is specific keys from `values` and values is params names for set to query.

`config` is an object with keys is specific keys from `values` (or values or `mapParamsNames`) and values:

 - `'include-if-falsy'` for include params with falsy values as empty strings to query.
 - `'exclude'` for exclude param from result.
 - `function(value) {...}` where value is value for serialize. If returns `null`, param won't included to search.
 
 For example:

```
setSearchParams({
  page: 3,
  perPage: 20,
  date: moment(),
  filters: [1, 2, 3],
}, {
  perPage: 'page_size',
}, {
  date: (value) => value.format('YYYY-MM-DD'),
})

//  sets query
//  '?page=3&page_size=20&date=2017-09-06&filters=1&filters=2&filters=3'
```
