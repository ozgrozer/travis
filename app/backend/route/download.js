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

    const getItems = await page.evaluate((opts) => {
      const elements = Array.from(document.querySelectorAll(opts.itemsSelector))
      const el = {}
      elements.map((element, i) => {
        el[i + 1] = element.getAttribute(opts.itemsAttributeToScrape)
      })
      return el
    }, opts)

    await browser.close()

    return getItems
  } catch (err) {
    return err
  }
}

const download = async (req, res) => {
  const result = { success: false }

  try {
    const _getItemLinks = await getItemLinks(req.body)

    let exportFileContent
    if (req.body.exportFormat === 'json') {
      exportFileContent = JSON.stringify(_getItemLinks)
    } else if (req.body.exportFormat === 'csv') {
      let str = `key,value\n`
      Object.keys(_getItemLinks).map((key) => {
        const value = _getItemLinks[key]
        str += `${key},${value}\n`
      })
      exportFileContent = str
    }

    fs.writeFileSync(req.body.exportPath, exportFileContent)

    result.success = true
    res.json(result)
  } catch (err) {
    result.error = err
    res.json(result)
  }
}

module.exports = download
