const fs = require('fs')
const puppeteer = require('puppeteer')

const getItemLinks = async (opts) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: puppeteer.executablePath().replace('app.asar', 'app.asar.unpacked')
    })
    const page = await browser.newPage()
    await page.goto(opts.itemsUrl, { waitUntil: 'networkidle2' })
    await page.setViewport({ width: 1395, height: 780 })

    const selector = opts.itemsSelector
    const getItems = await page.evaluate((selector) => {
      const elements = Array.from(document.querySelectorAll(selector))
      const el = {}
      elements.map((element, i) => {
        el[i + 1] = element.href
      })
      return el
    }, selector)

    await browser.close()

    return getItems
  } catch (err) {
    return err
  }
}

const download = (req, res) => {
  const result = {
    success: false
  }
  getItemLinks(req.body)
    .then((response) => {
      fs.writeFileSync(req.body.downloadPath, JSON.stringify(response))
      result.success = true
      res.json(result)
    })
    .catch((err) => {
      result.error = err
      res.json(result)
    })
}

module.exports = download
