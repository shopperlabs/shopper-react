import React from 'react'
import ReactDOM from 'react-dom'
import Loader from 'react-loaders'
import {
  Input,
  Form,
  Layout,
  Message,
  Notification,
  Alert,
  Loading
} from 'element-react'

import fields from './fields'
import rules from './validation'
import ShopperComponent from '../ShopperComponent'

export default class SizeForm extends ShopperComponent {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      loading: false,
      isCreate: true,
      hasError: false,

      errors: '',

      form: fields,
      rules: rules,
    }

    this.getRecord = this.getRecord.bind(this)
  }

  componentDidMount() {
    if (window.location.href !== route('shopper.catalogue.sizes.create').template) {
      this.getRecord()
    }
  }

  getRecord() {
    let element = document.getElementById('size-form')
    this.setState({
      isCreate: false,
      loading: true
    })

    axios
      .get(route('shopper.catalogue.sizes.show', {id: parseInt(element.getAttribute('data-id'))}))
      .then((response) => {
        this.setState({
          form: Object.assign(this.state.form, response.data),
          loading: false
        })
      })
      .catch((error) => {
        this.setState({loading: false})
        Message.error(error.response.data.message)
      })
  }

  updateForm(id) {
    axios
      .put(route('shopper.catalogue.sizes.update', {id: parseInt(id)}), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.catalogue.sizes.index')
        }, 1500)
      })
      .catch((error) => {
        this.setState({loader: false})
        Message.error(error.response.data.message)
        let errors = error.response.data.errors

        if (error.response.data.errors !== undefined) {
          this.setState({
            hasError: true,
            errors: error.response.data.message
          })
        }
      })
  }

  postForm() {
    axios
      .post(route('shopper.catalogue.sizes.store'), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.catalogue.sizes.index')
        }, 1500)
      })
      .catch((error) => {
        Message.error(error.response.data.message)
        let errors = error.response.data.errors

        if (error.response.data.errors !== undefined) {
          this.setState({
            hasError: true,
            errors: error.response.data.message
          })
        }

        this.setState({loader: false})
      })
  }

  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    })
  }

  onSubmit(e) {
    e.preventDefault()
    let element = document.getElementById('size-form')

    this.refs.form.validate((valid) => {
      if (valid) {
        this.setState({loader: true})

        if (window.location.href === route('shopper.catalogue.sizes.create').template) {
          this.postForm()
        } else {
          this.updateForm(element.getAttribute('data-id'))
        }
      } else {
        Message.error('Invalid form, check your form please !')
        return false
      }
    })
  }

  render() {
    return (
      <div className="sizes">
        {(this.state.hasError === true) ? <Alert title={this.trans.get('Error')} type="error" description={this.state.errors} showIcon={true} /> : ''}
        <Form
          className='layout'
          ref='form'
          model={this.state.form}
          rules={this.state.rules}
          labelWidth='120'
          labelPosition='top'
          onSubmit={this.onSubmit.bind(this)}
        >
          <div className="layout-row">
            <Loading text={this.trans.get('Loading Data...')} loading={this.state.loading}>
              <div className='wrapper-md'>
                <Layout.Row gutter='20'>
                  <Layout.Col span='12'>
                    <Form.Item label={this.trans.get('Name')} prop='name'>
                      <Input type='text' value={this.state.form.name} onChange={this.onChange.bind(this, 'name')} autoComplete='off' />
                    </Form.Item>
                  </Layout.Col>
                  <Layout.Col span='12'>
                    <Form.Item label={this.trans.get('Dimension')} prop='dimension'>
                      <Input type='text' value={this.state.form.dimension} onChange={this.onChange.bind(this, 'dimension')} autoComplete='off' />
                    </Form.Item>
                  </Layout.Col>
                </Layout.Row>
              </div>
            </Loading>
          </div>
          <div className="wrapper-md buttons-actions">
            <button className="btn btn-primary" type="submit" disabled={(this.state.loader === true)}>
              {(this.state.loader === true) ? <Loader type="ball-beat" /> : ((this.state.isCreate === true) ? this.trans.get('Create') : this.trans.get('Save')) }
            </button>
            <span>{this.trans.get('Or')}</span>
            <a href={route('shopper.catalogue.sizes.index')}>{this.trans.get('Cancel')}</a>
          </div>
        </Form>
      </div>
    )
  }
}

if (document.getElementById('size-form')) {
  ReactDOM.render(<SizeForm/>, document.getElementById('size-form'))
}
