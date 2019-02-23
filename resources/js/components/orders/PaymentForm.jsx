import React from 'react'
import ReactDOM from 'react-dom'
import Loader from 'react-loaders'
import {
  Input,
  Form,
  Switch,
  Layout,
  Message,
  Notification,
  Alert,
  Loading
} from 'element-react'

import fields from './payments/fields'
import rules from './payments/validation'
import slug from '../../helpers/slugify'
import ShopperComponent from '../ShopperComponent'

export default class PaymentForm extends ShopperComponent {
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
    if (window.location.href !== route('shopper.shoporders.payments.create').template) {
      this.getRecord()
    }
  }

  getRecord() {
    let element = document.getElementById('payment-form')
    this.setState({
      isCreate: false,
      loading: true
    })

    axios
      .get(route('shopper.shoporders.payments.show', {id: parseInt(element.getAttribute('data-id'))}))
      .then((response) => {
        this.setState({
          form: Object.assign(this.state.form, response.data),
          loading: false
        })
      })
      .catch((error) => {
        this.setState({loading: true})
        Message.error(error.response.data.message)
      })
  }

  updateForm(id) {
    axios
      .put(route('shopper.shoporders.payments.update', {id: parseInt(id)}), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.shoporders.payments.index')
        }, 1500)
      })
      .catch((error) => {
        Message.error(error.response.data.message)
        let errors = error.response.data.errors, codeMessage = '', nameMessage = ''

        if (error.response.data.errors !== undefined) {
          if (errors.name !== undefined) {
            errors.name.map((err, index) => { nameMessage = err})
          }

          if (errors.code !== undefined) {
            errors.code.map((er, index) => { codeMessage = er})
          }

          let errorList = `- ${codeMessage} - ${nameMessage}`

          this.setState({
            hasError: true,
            errors: errorList
          })
        }

        this.setState({loader: false})
      })
  }

  postForm() {
    axios
      .post(route('shopper.shoporders.payments.store'), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.shoporders.payments.index')
        }, 1500)
      })
      .catch((error) => {
        Message.error(error.response.data.message)
        let errors = error.response.data.errors, codeMessage = '', nameMessage = ''

        if (error.response.data.errors !== undefined) {
          if (errors.name !== undefined) {
            errors.name.map((err, index) => { nameMessage = err})
          }

          if (errors.code !== undefined) {
            errors.code.map((er, index) => { codeMessage = er})
          }

          let errorList = `- ${codeMessage} - ${nameMessage}`
          this.setState({
            hasError: true,
            errors: errorList
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

  handleChange(event){
    let value = slug(event.target.value)
    this.setState({
      form: Object.assign({}, this.state.form, { name: event.target.value, code: value })
    })
  }

  onSubmit(e) {
    e.preventDefault()
    let element = document.getElementById('payment-form')

    this.refs.form.validate((valid) => {
      if (valid) {
        this.setState({loader: true})

        if (window.location.href === route('shopper.shoporders.payments.create').template) {
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
      <div className="shipping-types">
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
                <Form.Item prop='active'>
                  <Switch
                    value={this.state.form.active}
                    onColor='#13ce66'
                    offColor='#ff4949'
                    onValue={1}
                    offValue={0}
                    onChange={this.onChange.bind(this, 'active')}
                  >
                  </Switch>
                  <span className='active-label'>{this.trans.get('Active')}</span>
                </Form.Item>
                <Layout.Row gutter='20'>
                  <Layout.Col span='12'>
                    <Form.Item label={this.trans.get('Name')} prop='name'>
                      <div className="el-input">
                        <input type="text" className="el-input__inner" value={this.state.form.name} onChange={this.handleChange.bind(this)} autoComplete='off' />
                      </div>
                    </Form.Item>
                  </Layout.Col>
                  <Layout.Col span='12'>
                    <Form.Item label={this.trans.get('Code')} prop='code'>
                      <Input type='text' value={this.state.form.code} onChange={this.onChange.bind(this, 'code')} autoComplete='off' />
                    </Form.Item>
                  </Layout.Col>
                </Layout.Row>
                <Layout.Row gutter="20">
                  <Layout.Col span="24">
                    <Form.Item label='Description' prop='description'>
                      <Input type='textarea' autosize={{ minRows: 4, maxRows: 6}} value={this.state.form.description} onChange={this.onChange.bind(this, 'description')} />
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
            <a href={route('shopper.shoporders.payments.index')}>{this.trans.get('Cancel')}</a>
          </div>
        </Form>
      </div>
    )
  }
}

if (document.getElementById('payment-form')) {
  ReactDOM.render(<PaymentForm/>, document.getElementById('payment-form'))
}
