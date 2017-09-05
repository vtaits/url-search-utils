import setHashLocationQuery from '../setHashLocationQuery'

test('should set hash location query', () => {
  window.location.hash = '/page/'

  setHashLocationQuery({
    foo: 5,
  })

  expect(window.location.hash).toEqual('#/page/?foo=5')
})
