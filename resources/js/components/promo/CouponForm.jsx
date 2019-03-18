import React from 'react'
import ReactDOM from 'react-dom'
import Loader from 'react-loaders'
import Rodal from 'rodal'
import {
  Input,
  Form,
  Switch,
  Table,
  Tabs,
  Select,
  InputNumber,
  DateRangePicker,
  Layout,
  Button,
  Message,
  Notification,
  Alert,
  Loading
} from 'element-react'

import TextEditor from '../TextEditor'
import fields from './coupons/fields'
import productsFields from './coupons/productFields'
import productsColumns from '../products/productsColumns'
import rules from './coupons/validation'
import ShopperComponent from '../ShopperComponent'

export default class CouponForm extends ShopperComponent{
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      loaderProduct: false,
      loading: false,
      loadingProducts: false,
      loadingUsers: false,
      isCreate: true,
      hasError: false,
      disabledProductDelete: true,
      disabledUserDelete: true,
      productVisible: false,
      userVisible: false,
      confirmDelete: false,
      confirmUserDelete: false,

      errors: '',

      form: fields,
      productForm: productsFields,
      rules: rules,
      usersColumns: [],
      productsColumns: productsColumns,

      categories: [],
      products: [],
      productsList: [],
      users: [],
      usersList: [],
      selectedUsers: [],
      selected: []
    }

    this.getRecord = this.getRecord.bind(this)
    this.generateCode = this.generateCode.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.getProductByCategory = this.getProductByCategory.bind(this)
    this.getCouponProducts = this.getCouponProducts.bind(this)
    this.getCouponUsers = this.getCouponUsers.bind(this)
  }

  componentDidMount() {
    this.generateCode(8)
    if (window.location.href !== route('shopper.promo.coupons.create').template) {
      this.getRecord()
      this.getCategories()
    }
  }

  getCategories() {
    axios
      .get(route('shopper.catalogue.categories.list'))
      .then((response) => {
        this.setState({categories: response.data})
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  getCouponProducts() {
    let element = document.getElementById('coupon-form')
    this.setState({loadingProducts: true})

    axios
      .get(route('shopper.promo.coupons.getProducts', {id: parseInt(element.getAttribute('data-id'))}))
      .then((response) => {
        this.setState({
          loadingProducts: false,
          productsList: response.data
        })
      })
      .catch((error) => {
        this.setState({loadingProducts: false})
        Message.error(error)
      })
  }

  getCouponUsers() {
    let element = document.getElementById('coupon-form')
    this.setState({loadingProducts: true})

    axios
      .get(route('shopper.promo.coupons.getUsers', {id: parseInt(element.getAttribute('data-id'))}))
      .then((response) => {
        this.setState({
          loadingProducts: false,
          usersList: response.data
        })
      })
      .catch((error) => {
        this.setState({loadingProducts: false})
        if (error.response.data) {
          Message.error(error.response.data.message)
        }
      })
  }

  getProductByCategory(id) {
    this.setState({loaderProduct: true})
    axios
      .get(route('shopper.catalogue.categories.products', {id: parseInt(id)}))
      .then((response) => {
        this.setState({
          products: response.data,
          loaderProduct: false
        })
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  getRecord() {
    let element = document.getElementById('coupon-form')
    this.setState({
      isCreate: false,
      loading: true
    })

    axios
      .get(route('shopper.promo.coupons.show', {id: parseInt(element.getAttribute('data-id'))}))
      .then((response) => {
        const dateBegin = response.data.date_begin,
          dateEnd = response.data.date_end
        // regular expression split that creates array with: year, month, day, hour, minutes, seconds values
        let dateBeginParts = dateBegin.split(/[- :]/), dateEndParts = dateEnd.split(/[- :]/)
        // monthIndex begins with 0 for January and ends with 11 for December so we need to decrement by one
        dateBeginParts[1]--;
        dateEndParts[1]--;
        // our Date object
        const dateBeginObject = new Date(...dateBeginParts),
          dateEndObject = new Date(...dateEndParts),
          dateRange = [dateBeginObject, dateEndObject]

        this.setState({
          form: Object.assign(this.state.form, response.data, {date: dateRange, mysqlDate: [dateBegin, dateEnd]}),
          loading: false,
          productsList: response.data.products,
          usersList: response.data.users
        })
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    })

    if (key === 'date' && value !== null) {
      let dateBegin = value[0].toJSON().slice(0, 19).replace('T', ' '),
        dateEnd = value[1].toJSON().slice(0, 19).replace('T', ' '),
        newDate = [dateBegin, dateEnd]

      this.setState({
        form: Object.assign({}, this.state.form, { mysqlDate: newDate, date: value })
      })
    }
  }

  generateCode(length) {
    let text = "",
      possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    this.setState({
      form: Object.assign({}, this.state.form, { code: text })
    })
  }

  onSubmit(e) {
    e.preventDefault()
    let element = document.getElementById('coupon-form')

    this.refs.form.validate((valid) => {
      if (valid) {
        this.setState({loader: true})

        if (window.location.href === route('shopper.promo.coupons.create').template) {
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

  updateForm(id) {
    axios
      .put(route('shopper.promo.coupons.update', {id: parseInt(id)}), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.promo.coupons.index')
        }, 1500)
      })
      .catch((error) => {
        this.setState({loader: false})
        Message.error(error.response.data.message)
        let errors = error.response.data.errors, codeMessage = '', nameMessage = '', errorList = ''

        if (error.response.data.errors !== undefined) {
          if (errors.name !== undefined) {
            errors.name.map((err, index) => { nameMessage = err})
            errorList += ` -${nameMessage} `
          }

          if (errors.date !== undefined) {
            errors.date.map((err, index) => { dateMessage = err})
            errorList += ` -${dateMessage} `
          }

          if (errors.code !== undefined) {
            errors.code.map((err, index) => { codeMessage = err})
            errorList += ` -${codeMessage} `
          }

          this.setState({
            hasError: true,
            errors: errorList
          })
        }
      })
  }

  postForm() {
    axios
      .post(route('shopper.promo.coupons.store'), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.promo.coupons.index')
        }, 1500)
      })
      .catch((error) => {
        this.setState({loader: false})
        Message.error(error.response.data.message)
        let errors = error.response.data.errors,
          codeMessage = '',
          nameMessage = '',
          dateMessage = '',
          errorList = ''

        if (error.response.data.errors !== undefined) {
          if (errors.name !== undefined) {
            errors.name.map((err, index) => { nameMessage = err})
            errorList += ` -${nameMessage} `
          }

          if (errors.date !== undefined) {
            errors.date.map((err, index) => { dateMessage = err})
            errorList += ` -${dateMessage} `
          }

          if (errors.code !== undefined) {
            errors.code.map((err, index) => { codeMessage = err})
            errorList += ` -${codeMessage} `
          }

          this.setState({
            hasError: true,
            errors: errorList
          })
        }
      })
  }

  onSelectProduct(selection) {
    if (selection.length > 0) {
      this.setState({
        disabledProductDelete: false,
        selected: selection
      })
    } else {
      this.setState({
        disabledProductDelete: true,
        selected: selection
      })
    }
  }

  onSelectUser(selection) {
    if (selection.length > 0) {
      this.setState({
        disabledUserDelete: false,
        selectedUsers: selection
      })
    } else {
      this.setState({
        disabledUserDelete: true,
        selectedUsers: selection
      })
    }
  }

  onProductFormChange(key, value) {
    switch (key) {
      case 'category_id':
        this.setState({products: []})
        if (value !== '') {
          this.getProductByCategory(value)
        }
        break
    }

    this.setState({
      productForm: Object.assign({}, this.state.productForm, { [key]: value })
    })
  }

  handleReset(e) {
    e.preventDefault()

    this.setState({productVisible: false})
    this.refs.productForm.resetFields()
  }

  couponProductSave(e) {
    e.preventDefault()
    let element = document.getElementById('coupon-form');

    if (this.state.productForm.product_ids.length > 0) {
      axios
        .post(route('shopper.promo.coupons.products', {id: parseInt(element.getAttribute('data-id'))}), this.state.productForm)
        .then((response) => {
          if (response.data.status === 'success') {
            this.setState({productVisible: false})
            this.refs.productForm.resetFields()
            Notification({
              title: response.data.title,
              message: response.data.message,
              type: response.data.status
            })
            this.getCouponProducts()
          } else {
            Notification({
              title: response.data.title,
              message: response.data.message,
              type: response.data.status
            })
          }
        })
        .catch((error) => {
          Message.error(error.response.data.message)
        })
    } else {
      Notification({
        title: this.trans.get('Error'),
        message: this.trans.get('Please select products who can apply this coupon'),
        type: 'error'
      })
    }
  }

  removeSelectedProducts() {
    let element = document.getElementById('coupon-form')

    if (this.state.selected.length > 0) {
      let ids = [], records = this.state.selected
      records.map((record, index) => ids.push(parseInt(record.id)))

      axios
        .delete(route('shopper.promo.coupons.removeProducts', {id: ids, coupon_id: parseInt(element.getAttribute('data-id'))}))
        .then((response) => {
          console.log(response)
          this.setState({
            confirmDelete: false,
            disabledProductDelete: true
          })
          Notification({
            title: response.data.title,
            message: response.data.message,
            type: response.data.status
          })
          this.getCouponProducts()
        })
        .catch((error) => {
          Message.error(error.response.data.message)
        })
    }
  }

  render() {
    return (
      <div className="coupons">
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
                      <Input type='text' value={this.state.form.name} onChange={this.onChange.bind(this, 'name')} autoComplete='off' />
                    </Form.Item>
                  </Layout.Col>
                  <Layout.Col span='12'>
                    <Form.Item label={this.trans.get('Code')} prop='code'>
                      <Input type='text' value={this.state.form.code} onChange={this.onChange.bind(this, 'code')} autoComplete='off' />
                    </Form.Item>
                  </Layout.Col>
                </Layout.Row>
              </div>
              <Tabs activeName='1' type='card'>
                <Tabs.Pane label={this.trans.get('Settings')} name='1'>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('Period available for the coupon')} prop='date'>
                        <DateRangePicker
                          isShowTime={true}
                          value={this.state.form.date}
                          placeholder={this.trans.get('Pick a range')}
                          format='dd-MM-yyyy HH:mm'
                          onChange={this.onChange.bind(this, 'date')}
                        />
                      </Form.Item>
                    </Layout.Col>
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('Coupon value')} prop='value'>
                        <InputNumber value={this.state.form.value} onChange={this.onChange.bind(this, 'value')} min="1" max="100" />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('Coupon type')} prop='type'>
                        <Select value={this.state.form.type} onChange={this.onChange.bind(this, 'type')}>
                          <Select.Option label={this.trans.get('Cart Discount')} value="fixed_cart" />
                          <Select.Option label={this.trans.get('Cart % Discount')} value="percent_cart" />
                          <Select.Option label={this.trans.get('Product Discount')} value="fixed_product" />
                          <Select.Option label={this.trans.get('Product % Discount')} value="percent_product" />
                        </Select>
                        <p className='help-block' style={{lineHeight: "1.5", marginTop: "5px", marginBottom: "0"}}>
                          {this.trans.get('Determines the type of discount that will be applied. Options: percent, fixed cart and fixed product. Default is fixed cart.')}
                        </p>
                      </Form.Item>
                    </Layout.Col>
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('Usage limit per Coupon')} prop='usage_limit'>
                        <Input type='text' value={this.state.form.usage_limit} onChange={this.onChange.bind(this, 'usage_limit')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('Usage limit per user')} prop='usage_limit_per_user'>
                        <Input type='text' value={this.state.form.usage_limit_per_user} onChange={this.onChange.bind(this, 'usage_limit_per_user')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                </Tabs.Pane>
                <Tabs.Pane label='Description' name='2'>
                  <Layout.Row gutter="20">
                    <Layout.Col span="24">
                      <Form.Item label={this.trans.get('Preview Text')} prop='preview_text'>
                        <Input type='textarea' autosize={{ minRows: 6, maxRows: 8}} value={this.state.form.preview_text} onChange={this.onChange.bind(this, 'preview_text')} />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                  <Layout.Row gutter="20">
                    <Layout.Col span="24">
                      <Form.Item label='Description' prop='description'>
                        <TextEditor
                          value={this.state.form.description}
                          change={this.onChange.bind(this, 'description')}
                          height='200px'
                        />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                </Tabs.Pane>
                <Tabs.Pane label={this.trans.get('Products')} name='3' disabled={this.state.isCreate}>

                  { (this.state.productsList.length < 1) ?
                    <div className="empty-bloc">
                      <Alert title={this.trans.get('Info')} type="info" description={this.trans.get('If no product is selected the coupon applies to all products in the shop')} showIcon={true} />
                    </div>
                    :
                    ''
                  }

                  <div className="buttons-actions">
                    <Button
                      type="primary"
                      icon="plus"
                      size="small"
                      onClick={() => this.setState({productVisible: true})}
                    >{this.trans.get('Add Product')}</Button>
                    <Button
                      type="danger"
                      icon="delete"
                      size='small'
                      disabled={this.state.disabledProductDelete}
                      onClick={() => this.setState({confirmDelete: true})}
                    >{this.trans.get('Delete')}</Button>
                  </div>
                  <Loading text={this.trans.get('Loading products aplly for this coupon...')} loading={this.state.loadingProducts}>
                    <Table
                      style={{width: '100%'}}
                      columns={this.state.productsColumns}
                      data={this.state.productsList}
                      stripe={true}
                      height={250}
                      emptyText={this.trans.get('No selected products for this coupon')}
                      onSelectChange={this.onSelectProduct.bind(this)}
                    />
                  </Loading>
                </Tabs.Pane>
                {/*<Tabs.Pane label={this.trans.get('Users')} name='4' disabled={this.state.isCreate}>

                  { (this.state.usersList.length < 1) ?
                    <div className="empty-bloc">
                      <Alert title={this.trans.get('Info')} type="info" description={this.trans.get('If no user is selected, all users in the shop can use this coupon!')} showIcon={true} />
                    </div>
                    :
                    ''
                  }

                  <div className="buttons-actions">
                    <Button
                      type="primary"
                      icon="plus"
                      size="small"
                      onClick={() => this.setState({userVisible: true})}
                    >{this.trans.get('Add User')}</Button>
                    <Button
                      type="danger"
                      icon="delete"
                      size='small'
                      disabled={this.state.disabledUserDelete}
                      onClick={() => this.setState({confirmUserDelete: true})}
                    >{this.trans.get('Delete')}</Button>
                  </div>
                  <Loading text={this.trans.get('Loading Users...')} loading={this.state.loadingUsers}>
                    <Table
                      style={{width: '100%'}}
                      columns={this.state.usersColumns}
                      data={this.state.usersList}
                      stripe={true}
                      height={250}
                      emptyText={this.trans.get('No selected users for this coupon')}
                      onSelectChange={this.onSelectUser.bind(this)}
                    />
                  </Loading>
                </Tabs.Pane>*/}
              </Tabs>
            </Loading>
          </div>
          <div className="wrapper-md buttons-actions">
            <button className="btn btn-primary" type="submit" disabled={(this.state.loader === true)}>
              {(this.state.loader === true) ? <Loader type="ball-beat" /> : ((this.state.isCreate === true) ? this.trans.get('Create') : this.trans.get('Save')) }
            </button>
            <span>{this.trans.get('Or')}</span>
            <a href={route('shopper.promo.coupons.index')}>{this.trans.get('Cancel')}</a>
          </div>
        </Form>
        <Rodal
          visible={this.state.productVisible}
          onClose={() => this.setState({productVisible: false})}
          animation='slideDown'
          className='rodal-modal rodal-default'
          height={330}
          width={850}
        >
          <div className='modal-data'>
            <h4 style={{padding: '20px 20px 10px 20px'}}>{this.trans.get('Add Product')} {(this.state.loaderProduct === true) ? <Loader type="ball-beat" /> : '' }</h4>
            <div className='body'>
              <Form
                className='layout'
                ref='productForm'
                model={this.state.productForm}
                labelWidth='120'
                labelPosition='top'
                onSubmit={this.couponProductSave.bind(this)}
              >
                <Form.Item label={this.trans.get('Category')} prop='category_id'>
                  <Select
                    value={this.state.productForm.category_id}
                    clearable={true}
                    filterable={true}
                    onChange={this.onProductFormChange.bind(this, 'category_id')}
                  >
                    {
                      this.state.categories.map(el => {
                        return <Select.Option key={el.id} label={el.name} value={el.id} />
                      })
                    }
                  </Select>
                </Form.Item>
                <Form.Item label={this.trans.get('Products')} prop='product_ids'>
                  <Select
                    value={this.state.productForm.product_ids}
                    multiple={true}
                    onChange={this.onProductFormChange.bind(this, 'product_ids')}
                  >
                    {
                      this.state.products.map(el => {
                        return <Select.Option key={el.id} label={el.name} value={el.id} />
                      })
                    }
                  </Select>
                </Form.Item>
                <div className="text-right m-t-xl">
                  <Button nativeType="submit" type="primary">{this.trans.get('Save')}</Button>
                  <Button onClick={this.handleReset.bind(this)}>{this.trans.get('Cancel')}</Button>
                </div>
              </Form>
            </div>
          </div>
        </Rodal>
        <Rodal
          visible={this.state.confirmDelete}
          onClose={() => this.setState({confirmDelete: false})}
          animation='slideDown'
          className='rodal-modal rodal-default'
          height={150}
          width={550}
        >
          <div className='modal-data'>
            <div className='header'><h6>{this.trans.get('Confirm Delete')}</h6></div>
            <div className='body'>
              <p>{this.trans.get('Would you really want to delete records ?')}</p>
              <div className="text-right">
                <Button onClick={this.removeSelectedProducts.bind(this)} type="danger">{this.trans.get('Delete')}</Button>
                <Button onClick={() => this.setState({confirmDelete: false})}>{this.trans.get('Cancel')}</Button>
              </div>
            </div>
          </div>
        </Rodal>
      </div>
    )
  }
}

if (document.getElementById('coupon-form')) {
  ReactDOM.render(<CouponForm/>, document.getElementById('coupon-form'))
}
