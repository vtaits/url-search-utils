import parseSearchParams from '../parseSearchParams'

test('should parse search params', () => {
  Object.defineProperty(window.location, 'search', {
    writable: true,
    value: '?foo=5&bar=baz',
  })

  const parsedParams = parseSearchParams({
    foo: 'number',
  })

  expect(parsedParams.foo).toEqual(5);
  expect(parsedParams.bar).toEqual('baz');
})
