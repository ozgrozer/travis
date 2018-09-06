import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Input, Select } from 'recassfov'

import './../css/style.scss'
import validations from './validations'

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      downloadButtonTitle: 'Download',
      isFormDisabled: false,
      itemsAttributeOrPropertyLabel: 'Items attribute',
      itemsAttributeOrPropertyPlaceholder: 'href'
    }
  }

  returnFalse (e) {
    e.preventDefault()
  }

  handleForm (opts, res) {
    if (opts.status === 'beforePost') {
      this.setState({
        isFormDisabled: true,
        downloadButtonTitle: 'Downloading...'
      })
    } else if (opts.status === 'afterPost') {
      this.setState({
        isFormDisabled: false,
        downloadButtonTitle: 'Download'
      })
    }
  }

  partOfItemsToScrapeOnChange (e) {
    const value = e.target.value
    this.setState({
      itemsAttributeOrPropertyLabel: value === 'attribute' ? 'Items attribute' : 'Items property',
      itemsAttributeOrPropertyPlaceholder: value === 'attribute' ? 'href' : 'textContent'
    })
  }

  render () {
    return (
      <React.Fragment>
        <div id='drag' onMouseDown={this.returnFalse}>
          {window.defaults.name}
        </div>

        <div id='scroll'>
          <Form
            validFormBeforePost={this.handleForm.bind(this, { status: 'beforePost' })}
            validFormAfterPost={this.handleForm.bind(this, { status: 'afterPost' })}
            invalidFormAfterPost={this.handleForm.bind(this, { status: 'afterPost' })}
            postUrl={`http://localhost:${window.defaults.port}/download`}
            headers={{ 'Content-Type': 'application/json' }}>
            <fieldset disabled={this.state.isFormDisabled}>
              <div className='form-group'>
                <label htmlFor='exportFormat'>Export format</label>
                <Select
                  id='exportFormat'
                  name='exportFormat'
                  value='json'
                  validations={validations.exportFormat}
                  className='form-control form-control-sm'>
                  <option value='json'>JSON</option>
                  <option value='csv'>CSV</option>
                </Select>
              </div>

              <div className='form-group'>
                <label htmlFor='exportPath'>Export path</label>
                <Input
                  type='text'
                  id='exportPath'
                  name='exportPath'
                  placeholder={window.defaults.exportPath}
                  value={window.defaults.exportPath}
                  validations={validations.exportPath}
                  className='form-control form-control-sm' />
              </div>

              <hr />

              <div className='form-group'>
                <label htmlFor='itemsUrl'>Items URL</label>
                <Input
                  type='text'
                  id='itemsUrl'
                  name='itemsUrl'
                  placeholder='https://www.amazon.com/gp/bestsellers/digital-text/8493719011/'
                  validations={validations.itemsUrl}
                  className='form-control form-control-sm' />
              </div>

              <div className='form-group'>
                <label htmlFor='itemsSelector'>Items selector</label>
                <Input
                  type='text'
                  id='itemsSelector'
                  name='itemsSelector'
                  placeholder='span.aok-inline-block.zg-item > a.a-link-normal'
                  validations={validations.itemsSelector}
                  className='form-control form-control-sm' />
              </div>

              <div className='form-group'>
                <label htmlFor='partOfItemsToScrape'>Part of items to scrape</label>
                <Select
                  id='partOfItemsToScrape'
                  name='partOfItemsToScrape'
                  value='attribute'
                  onChange={this.partOfItemsToScrapeOnChange.bind(this)}
                  validations={validations.partOfItemsToScrape}
                  className='form-control form-control-sm'>
                  <option value='attribute'>Attribute</option>
                  <option value='property'>Property</option>
                </Select>
              </div>

              <div className='form-group'>
                <label htmlFor='itemsAttributeOrProperty'>{this.state.itemsAttributeOrPropertyLabel}</label>
                <Input
                  type='text'
                  id='itemsAttributeOrProperty'
                  name='itemsAttributeOrProperty'
                  placeholder={this.state.itemsAttributeOrPropertyPlaceholder}
                  validations={validations.itemsAttributeOrProperty}
                  className='form-control form-control-sm' />
              </div>

              <button className='btn btn-primary btn-block mt'>{this.state.downloadButtonTitle}</button>
            </fieldset>
          </Form>
        </div>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
