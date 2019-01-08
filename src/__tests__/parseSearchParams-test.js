import { prepareSearch } from '../parseSearchParams';

test('should prepare filled search', () => {
  expect(prepareSearch('?foo=5&bar=baz')).toBe('foo=5&bar=baz');
});

test('should prepare empty search', () => {
  expect(prepareSearch('')).toBe('');
});
