/*const fetch = require('node-fetch');*/

//? baseUrl es la url de la pagina de entrada, por ejemplo el homepage
//? currentUrl es la url de la pagina que estoy visitando
//? pages es un array de las paginas que ya he visitado
const crawlPage = async (baseUrl, currentUrl, pages) => {
  //* new url object for baseUrl and currentUrl
  const baseUrlObject = new URL(baseUrl);
  const currentUrlObject = new URL(currentUrl);

  //* if the currentUrl is not in the same domain as the baseUrl, return
  if (baseUrlObject.hostname !== currentUrlObject.hostname) return pages;

  const normalizedUrlBaseUrl = normalizeURL(baseUrl);
  const normalizedUrlCurrentUrl = normalizeURL(currentUrl);

  //* if the currentUrl is in the pages array, return
  if (pages.includes(normalizedUrlCurrentUrl)) {
    pages.reduce((acc, curr) => ({
      ...acc,
      [curr]: (acc[curr] || 0) + 1
    }), {});
  };

  console.log(`actively crawling ${currentUrl}`)

  try {
    const resp = await fetch(currentUrl);

    const content = resp.headers.get("content-type");
    if (!content || !content.includes("text/html"))
      throw new Error(`Skipping ${currentUrl}, ${content}`);


    //*I can modify it writing the sitemap.xmk in the command line at the end of the url
    if (resp.status !== 200)
      throw new Error(`${resp.status} on page ${currentUrl}`);

    const htmlBody = await resp.text();
    console.log(htmlBody);

    const urls = getUrlsFromHtml(htmlBody);
    /*console.log(urls.map(el => `https://${el}`));*/

  } catch (err) {

    console.log(`Error in fetch ${err.message} `);
  }
};

const inputHtmlBody = `
  <html>
    <head>
      <title>My page</title>
    </head>
    <body>
      <a href="https://blog.boot.dev/path/">Link 1</a>
    </body>
  </html>
  `;
const inputBaseUrl = `https://blog.boot.dev/path/`;

const getUrlsFromHtml = (htmlBody) => {
  //array de las anclas del htmlBody
  const anchorsHtmlBody = htmlBody.match(/<a.*?href="(.*?)".*?>/g) || [];
  // href de las anclas del htmlBody
  const hrefAnchor = anchorsHtmlBody.map(
    (anchor) => anchor.match(/href="(.*?)"/)[1]
  );

  return normalizeURL(hrefAnchor);
};

// getUrlsFromHtml(inputHtmlBody, inputBaseUrl);

function normalizeURL(urlString) {
  if (Array.isArray(urlString))
    return urlString
      .map((url) => normalizeURL(url))
      .map((el) => `https://${el}`);

  const URLNprmalized = new URL(urlString);
  const newUrl = `${URLNprmalized.hostname}${URLNprmalized.pathname}`;
  console.log("hello ");

  if (newUrl.length > 0 && newUrl.slice(-1) === "/") return newUrl.slice(0, -1);
  return newUrl;
}

//normalizeURL("https://blog.boot.dev/path/");

module.exports = {
  normalizeURL,
  getUrlsFromHtml,
  crawlPage,
};
