import setHashParams from '../setHashParams';

test('should set hash params', () => {
  setHashParams({
    foo: 5,
  });

  expect(window.location.hash).toEqual('#foo=5');
});
