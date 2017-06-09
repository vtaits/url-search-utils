import parseQuery from '../parseQuery'

test('should return empty object for empty query', () => {
  const result = parseQuery('')

  expect(result).toEqual({})
})

test('should parse simple params', () => {
  const result = parseQuery('param1=value1&param2=value2')

  expect(result).toEqual({
    param1: 'value1',
    param2: 'value2',
  })
})

test('should parse numeric params', () => {
  const result = parseQuery('numeric1=1&numeric2=2&notnumeric=3', {
    numeric1: 'number',
    numeric2: 'number',
  })

  expect(result).toEqual({
    numeric1: 1,
    numeric2: 2,
    notnumeric: '3',
  })
})

test('should exclude params', () => {
  const result = parseQuery('include1=value1&include2=value2&excludeparam=test', {
    excludeparam: 'exclude',
  })

  expect(result).toEqual({
    include1: 'value1',
    include2: 'value2',
  })
})

test('should collect array of strings', () => {
  const queryString = 'notarray1=value1&notarray2=value2&array=test&array=2&array=true'

  const result = parseQuery(queryString, {
    array: 'array-of-strings',
  })

  expect(result).toEqual({
    notarray1: 'value1',
    notarray2: 'value2',
    array: ['test', '2', 'true'],
  })
})

test('should collect array of numbers', () => {
  const queryString = 'notarray1=value1&notarray2=value2&array=3&array=1&array=4'

  const result = parseQuery(queryString, {
    array: 'array-of-numbers',
  })

  expect(result).toEqual({
    notarray1: 'value1',
    notarray2: 'value2',
    array: [3, 1, 4],
  })
})

test('should apply function for serialize param to object', () => {
  const queryString = 'nottest1=value1&nottest2=value2&test=3&test=1&test=4&test=1'

  const result = parseQuery(queryString, {
    test: (value, acc = {}) => {
      acc[value] = (acc[value] || 0) + 1

      return acc
    },
  })

  expect(result).toEqual({
    nottest1: 'value1',
    nottest2: 'value2',
    test: {
      3: 1,
      1: 2,
      4: 1,
    },
  })
})

it('should throw an exception for unknown param type', () => {
  expect(() => {
    const queryString = 'nottest1=value1&nottest2=value2&test=3&test=1&test=4&test=1'

    parseQuery(queryString, {
      test: 'test-type',
    })
  })
    .toThrowError('Unknown type of parameter for parse "test": "test-type"')
})
