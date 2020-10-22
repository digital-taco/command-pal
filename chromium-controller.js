//////////////////////////////////////////////////////////////////////////////////////////////////////////
// SET UP CHROMIUM WITH OUR EXTENSION
//////////////////////////////////////////////////////////////////////////////////////////////////////////

const puppeteer = require('puppeteer')
const openBrowsers = []

const config = {
  ignoreDefaultArgs: ["--disable-extensions","--enable-automation"],
  args: [`--load-extension=./`, `--window-size=${800},${600}`],
  headless: false
}

function getBrowser(url = 'https://google.com', instanceConfig = {}) {
  return new Promise(async (resolve) => {
    const browser = await puppeteer.launch({ ...config, ...instanceConfig });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil : ['load', 'domcontentloaded', 'networkidle2'] });
    openBrowsers.push(browser)
    resolve({ browser, page })
  })
}

const closeOpenBrowsers = () => Promise.all(openBrowsers.map(browser => browser.close()))


module.exports = {
  getBrowser,
  closeOpenBrowsers,
}
