import React from 'react'
import ReactDOM from 'react-dom'
import Loader from 'react-loaders'
import {
  Input,
  Form,
  Switch,
  Select,
  Layout,
  Message,
  Notification,
  Alert,
  Loading
} from 'element-react'

import fields from './fields'
import rules from './validation'
import ShopperComponent from '../ShopperComponent'

export default class ReviewForm extends ShopperComponent {
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

      products: [],
      users: []
    }

    this.getRecord = this.getRecord.bind(this)
    this.getUsers = this.getUsers.bind(this)
    this.getProducts = this.getProducts.bind(this)
  }

  componentDidMount() {
    this.getUsers()
    this.getProducts()

    if (window.location.href !== route('shopper.catalogue.reviews.create').template) {
      this.getRecord()
    }
  }

  getRecord() {
    let element = document.getElementById('review-form')
    this.setState({
      isCreate: false,
      loading: true
    })

    axios
      .get(route('shopper.catalogue.reviews.show', {id: parseInt(element.getAttribute('data-id'))}))
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

  getUsers() {
    axios
      .get(route('shopper.users.list'))
      .then((response) => {
        this.setState({users: response.data})
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  getProducts() {
    axios
      .get(route('shopper.catalogue.products.list'))
      .then((response) => {
        this.setState({products: response.data})
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  updateForm(id) {
    axios
      .put(route('shopper.catalogue.reviews.update', {id: parseInt(id)}), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.catalogue.reviews.index')
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
      .post(route('shopper.catalogue.reviews.store'), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.catalogue.reviews.index')
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
    let element = document.getElementById('review-form')

    this.refs.form.validate((valid) => {
      if (valid) {
        this.setState({loader: true})

        if (window.location.href === route('shopper.catalogue.reviews.create').template) {
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
      <div className="reviews">
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
                    <Form.Item label={this.trans.get('User')} prop='user_id'>
                      <Select
                        value={this.state.form.user_id}
                        clearable={true}
                        filterable={true}
                        onChange={this.onChange.bind(this, 'user_id')}
                      >
                        {
                          this.state.users.map(user => {
                            return <Select.Option key={user.id} label={user.last_name + ' ' + user.name} value={user.id} />
                          })
                        }
                      </Select>
                    </Form.Item>
                  </Layout.Col>
                  <Layout.Col span='12'>
                    <Form.Item label={this.trans.get('Product')} prop='product_id'>
                      <Select
                        value={this.state.form.product_id}
                        clearable={true}
                        filterable={true}
                        onChange={this.onChange.bind(this, 'product_id')}
                      >
                        {
                          this.state.products.map(product => {
                            return <Select.Option key={product.id} label={product.name} value={product.id} />
                          })
                        }
                      </Select>
                    </Form.Item>
                  </Layout.Col>
                </Layout.Row>
                <Layout.Row gutter="20">
                  <Layout.Col span="12">
                    <Form.Item label={this.trans.get('Comment')} prop='comment'>
                      <Input type='textarea' autosize={{ minRows: 4, maxRows: 6}} value={this.state.form.comment} onChange={this.onChange.bind(this, 'comment')} />
                    </Form.Item>
                  </Layout.Col>
                  <Layout.Col span='12'>
                    <Form.Item label={this.trans.get('Rating')} prop='rate'>
                      <Select
                        value={this.state.form.rate}
                        clearable={true}
                        filterable={true}
                        onChange={this.onChange.bind(this, 'rate')}
                      >
                        <Select.Option label="1" value={1} />
                        <Select.Option label="2" value={2} />
                        <Select.Option label="3" value={3} />
                        <Select.Option label="4" value={4} />
                        <Select.Option label="5" value={5} />
                      </Select>
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
            <a href={route('shopper.catalogue.reviews.index')}>{this.trans.get('Cancel')}</a>
          </div>
        </Form>
      </div>
    )
  }
}

if (document.getElementById('review-form')) {
  ReactDOM.render(<ReviewForm/>, document.getElementById('review-form'))
}
