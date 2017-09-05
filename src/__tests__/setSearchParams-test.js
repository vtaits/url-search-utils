import setSearchParams from '../setSearchParams'

test('should set hash params', () => {
  let resUrl
  Object.defineProperty(window.location, 'pathname', {
    writable: true,
    value: '/page/',
  })
  Object.defineProperty(window.history, 'replaceState', {
    writable: true,
    value: (state, title, url) => {
      resUrl = url
    },
  })

  setSearchParams({
    foo: 5,
  })

  expect(resUrl).toEqual('/page/?foo=5')
})
