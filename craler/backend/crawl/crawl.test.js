const { normalizeURL, getUrlsFromHtml } = require('./crawl')

const { test, expect } = require('@jest/globals')

test('normalizeURL', () => {
  const input = "https://blog.boot.dev/path"
  const output = "blog.boot.dev/path"
  expect(normalizeURL(input)).toBe(output)
})


test('normalizeURL / strip trailing slash', () => {
  const input = "https://blog.boot.dev/path/"
  const output = "blog.boot.dev/path"
  expect(normalizeURL(input)).toEqual(output)
})


test('normalizeURL capitals', () => {
  const input = "https://BLOG.boot.dev/path/"
  const output = "blog.boot.dev/path"
  expect(normalizeURL(input)).toEqual(output)
})

//*
test('normalizeURL http ', () => {
  const input = "http://blog.boot.dev/path/"
  const output = "blog.boot.dev/path"
  expect(normalizeURL(input)).toEqual(output)
})


test(' getURLfromHtml ', () => {
  const inputHtmlBody = `
  <html>
    <head>
      <title>My page</title>
    </head>
    <body>
      <a href="https://blog.boot.dev/path/">Link 1</a>
    </body>
  </html>
  `
  const inputBaseUrl = `https://blog.boot.dev/path/`

  const expectedOutput = ["https://blog.boot.dev/path"]

  expect(getUrlsFromHtml(inputHtmlBody, inputBaseUrl)).toEqual(expectedOutput)

})


//*crawlPage function test
test('crawlPage', () => {
  const inputUrl = "https://blog.boot.dev/path/"
  const output = "blog.boot.dev/path"
  expect(crawlPage(inputUrl)).toEqual(output)
})
