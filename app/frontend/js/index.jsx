import React from 'react'
import ReactDOM from 'react-dom'
import { Form, Input } from 'recassfov'

import './../css/style.scss'

class App extends React.Component {
  constructor () {
    super()

    this.state = {
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

  render () {
    return (
      <React.Fragment>
        <div id='drag' onMouseDown={this.returnFalse}>
          {window.defaults.name}
        </div>

        <div id='scroll'>
          <Form
            validFormBeforePost={this.handleForm.bind(this, { status: 'beforePost' })}
            invalidFormBeforePost={this.handleForm.bind(this, { status: 'beforePost' })}
            validFormAfterPost={this.handleForm.bind(this, { status: 'afterPost' })}
            invalidFormAfterPost={this.handleForm.bind(this, { status: 'afterPost' })}
            postUrl={`http://localhost:${window.defaults.port}/download`}
            headers={{ 'Content-Type': 'application/json' }}>
            <fieldset disabled={this.state.isFormDisabled}>
              <div className='form-group'>
                <label htmlFor='downloadPath'>Download path</label>
                <Input
                  type='text'
                  id='downloadPath'
                  name='downloadPath'
                  placeholder={window.defaults.downloadPath}
                  value={window.defaults.downloadPath}
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
                  className='form-control form-control-sm' />
              </div>

              <div className='form-group'>
                <label htmlFor='itemsSelector'>Items selector</label>
                <Input
                  type='text'
                  id='itemsSelector'
                  name='itemsSelector'
                  placeholder='span.aok-inline-block.zg-item > a.a-link-normal'
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
