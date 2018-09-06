const fs = require('fs')
const puppeteer = require('puppeteer')

const getItemLinks = async (opts) => {
  const result = { success: false }

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
        el[i + 1] = opts.partOfItemsToScrape === 'attribute' ? element.getAttribute(opts.itemsAttributeOrProperty) : element[opts.itemsAttributeOrProperty]
      })
      return el
    }, opts)

    if (Object.keys(getItems).length) {
      result.success = true
      result.items = getItems
    } else {
      result.error = 'No items found'
    }

    await browser.close()

    return result
  } catch (err) {
    result.error = err
    return result
  }
}

const download = async (req, res) => {
  const result = { success: false }

  try {
    const _getItemLinks = await getItemLinks(req.body)

    if (_getItemLinks.success) {
      const items = _getItemLinks.items

      let exportFileContent
      if (req.body.exportFormat === 'json') {
        exportFileContent = JSON.stringify(items)
      } else if (req.body.exportFormat === 'csv') {
        let str = `key,value\n`
        Object.keys(items).map((key) => {
          const value = items[key]
          str += `${key},${value}\n`
        })
        exportFileContent = str
      }

      fs.writeFileSync(req.body.exportPath, exportFileContent)

      result.success = true
    } else {
      result.error = _getItemLinks.error
    }

    res.json(result)
  } catch (err) {
    result.error = err
    res.json(result)
  }
}

module.exports = download
