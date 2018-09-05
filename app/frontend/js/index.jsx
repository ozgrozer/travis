import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Input, Select } from 'recassfov'

import './../css/style.scss'

const validations = {
  exportPath: [
    {
      rule: 'isLength',
      args: { min: 1 }
    }
  ],
  itemsUrl: [
    {
      rule: 'isURL'
    }
  ],
  itemsSelector: [
    {
      rule: 'isLength',
      args: { min: 1 }
    }
  ]
}

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      exportPath: window.defaults.exportPath,
      downloadButtonTitle: 'Download',
      isFormDisabled: false
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

  exportFormatOnChange (e) {
    const value = e.target.value
    const getExportPath = this.state.exportPath
    const splitDownloadFormat = getExportPath.split('.')
    const getDownloadFormat = splitDownloadFormat[splitDownloadFormat.length - 1]

    let newExportPath
    if (value === 'csv' && getDownloadFormat === 'json') {
      newExportPath = getExportPath.substring(0, getExportPath.length - 4) + 'csv'
    } else if (value === 'json' && getDownloadFormat === 'csv') {
      newExportPath = getExportPath.substring(0, getExportPath.length - 3) + 'json'
    } else if (!getExportPath) {
      newExportPath = window.defaults.exportPath.substring(0, window.defaults.exportPath.length - 4) + value
    } else {
      newExportPath = getExportPath + '.' + value
    }

    this.setState({ exportPath: newExportPath })
  }

  exportPathOnChange (e) {
    const value = e.target.value
    this.setState({ exportPath: value })
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
                  type='text'
                  id='exportFormat'
                  name='exportFormat'
                  value='json'
                  onChange={this.exportFormatOnChange.bind(this)}
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
                  placeholder={this.state.exportPath}
                  value={this.state.exportPath}
                  onChange={this.exportPathOnChange.bind(this)}
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

              <button className='btn btn-primary btn-block mt'>{this.state.downloadButtonTitle}</button>
            </fieldset>
          </Form>
        </div>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
