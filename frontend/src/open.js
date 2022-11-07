const puppeteer = require('puppeteer')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.resolve(process.cwd(), './.env.local') })
;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: process.env.CHROME_EXECUTABLE_PATH,
    defaultViewport: null,
  })
  const page = await browser.newPage()
  await page.setRequestInterception(true)
  page.on('request', (req) => {
    if (req.isInterceptResolutionHandled()) return
    const { origin } = new URL(req.url())
    if (origin.includes('rahtiapp')) {
      req.abort()
      page.goto(req.url().replace(origin, 'http://127.0.0.1:8080'))
    } else req.continue()
  })
  await page.goto('http://localhost:3000')
})()
