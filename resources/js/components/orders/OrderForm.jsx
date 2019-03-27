import React from 'react'
import ReactDOM from 'react-dom'
import Loader from 'react-loaders'
import Rodal from 'rodal'
import {
  Tabs,
  Message,
  Notification,
  Layout,
  Select,
  Table,
  Alert,
  Form,
  Loading,
  Input,
  Button
} from 'element-react'

import Price from './orders/Price'
import fields from './orders/fields'
import offerFields from './orders/offerFields'
import rules from './orders/validation'
import offerRules from './orders/offerValidation'
import columns from './orders/columns'
import buyerColumns from './orders/buyerColumns'
import ShopperComponent from '../ShopperComponent'

export default class OrderForm extends ShopperComponent {
  constructor(props) {
    super(props)

    this.state = {
      isCreate: true,
      loader: false,
      loaderOffer: false,
      loading: false,
      loadingOffers: false,
      buyerLoading: false,
      offerVisible: false,
      disabledDelete: true,
      disabledOffer: true,
      confirmDelete: false,
      visible: false,
      hasError: false,

      errors: '',
      shippingPrice: 0,
      orderPrice: 0,
      totalPrice: 0,

      form: fields,
      offerForm: offerFields,
      rules: rules,
      offerRules: offerRules,
      columns: columns,
      buyerColumns: buyerColumns,

      statuses: [],
      paymentMethods: [],
      shippingTypes: [],
      selected: [],
      buyers: [],
      categories: [],
      products: [],
      offers: [],
      offersList: []
    }

    this.getRecord = this.getRecord.bind(this)
    this.postForm = this.postForm.bind(this)
    this.updateForm = this.updateForm.bind(this)
    this.getStatuses = this.getStatuses.bind(this)
    this.getShippingTypes = this.getShippingTypes.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.getProductByCategory = this.getProductByCategory.bind(this)
    this.getOfferByProduct = this.getOfferByProduct.bind(this)
    this.getOrderOffers = this.getOrderOffers.bind(this)
  }

  componentDidMount() {
    this.getStatuses()
    this.getShippingTypes()
    this.getPaymentMethods()

    if (window.location.href !== route('shopper.shoporders.orders.create').template) {
      this.getRecord()
      this.getOrderOffers()
      this.getCategories()
    }
  }

  getStatuses() {
    axios
      .get(route('shopper.shoporders.statuses.list'))
      .then((response) => {
        this.setState({statuses: response.data})
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  getShippingTypes() {
    axios
      .get(route('shopper.shoporders.shippingtypes.list'))
      .then((response) => {
        this.setState({shippingTypes: response.data})
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  getPaymentMethods() {
    axios
      .get(route('shopper.shoporders.payments.list'))
      .then((response) => {
        this.setState({paymentMethods: response.data})
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
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

  getProductByCategory(id) {
    this.setState({loaderOffer: true})
    axios
      .get(route('shopper.catalogue.categories.products', {id: parseInt(id)}))
      .then((response) => {
        this.setState({
          products: response.data,
          loaderOffer: false
        })
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  getOfferByProduct(id) {
    this.setState({loaderOffer: true})
    axios
      .get(route('shopper.catalogue.products.offers', {id: parseInt(id)}))
      .then((response) => {
        this.setState({
          offers: response.data,
          loaderOffer: false
        })
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  getOrderOffers() {
    let element = document.getElementById('order-form')
    this.setState({loadingOffers: true})
    axios
      .get(route('shopper.shoporders.order.getOffers', {id: parseInt(element.getAttribute('data-id'))}))
      .then((response) => {
        this.setState({
          offersList: response.data,
          loadingOffers: false
        })
      })
      .catch((error) => {
        this.setState({loadingOffers: false})
        Message.error(error.response.data.message)
      })
  }

  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    })
  }

  onOfferFormChange(key, value) {
    switch (key) {
      case 'category_id':
        this.setState({
          products: [],
          offers: []
        })
        if (value !== '') {
          this.getProductByCategory(value)
        }
        break
      case 'product_id':
        this.setState({offers: []})
        if (value !== '') {
          this.getOfferByProduct(value)
        }
        break
    }

    this.setState({
      offerForm: Object.assign({}, this.state.offerForm, { [key]: value })
    })
  }

  postForm() {
    axios
      .post(route('shopper.shoporders.orders.store'), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.shoporders.orders.index')
        }, 1500)
      })
      .catch((error) => {
        this.setState({loader: false})
        Message.error(error.response.data.message)
      })
  }

  updateForm(id) {
    axios
      .put(route('shopper.shoporders.orders.update', {id: parseInt(id)}), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.shoporders.orders.index')
        }, 1500)
      })
      .catch((error) => {
        Message.error(error.response.data.message)
        this.setState({loader: false})

        let errors = error.response.data.errors
        console.log(errors)
      })
  }

  store(e) {
    e.preventDefault()
    let element = document.getElementById('order-form')

    this.refs.form.validate((valid) => {
      if (valid) {
        this.setState({loader: true})

        if (window.location.href === route('shopper.shoporders.orders.create').template) {
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

  OfferStore(e) {
    e.preventDefault()
    let element = document.getElementById('order-form');

    axios
      .post(route('shopper.shoporders.order.offers', {id: parseInt(element.getAttribute('data-id'))}), this.state.offerForm)
      .then((response) => {
        if (response.data.status === 'success') {
          this.setState({
            orderPrice: response.data.orderPrice,
            totalPrice: response.data.totalPrice,
          })
          this.getOrderOffers()
          this.hideOfferModal()

          Notification({
            title: response.data.title,
            message: response.data.message,
            type: response.data.status
          })

          this.refs.offerForm.resetFields()
        } else {
          Notification({
            title: response.data.title,
            message: response.data.message + '. ' + response.data.qteCount + 'available',
            type: response.data.status
          })
        }
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })

    this.refs.offerForm.validate((valid) => {
      if (valid) {

      } else {
        Message.error('Invalid form, check your form please !')
        return false
      }
    })
  }

  handleReset(e) {
    e.preventDefault()

    this.hideOfferModal()
    this.refs.offerForm.resetFields()
  }

  getRecord() {
    let element = document.getElementById('order-form')

    this.setState({
      isCreate: false,
      loading: true,
      loadingOffers: true,
      disabledOffer: false
    })

    axios
      .get(route('shopper.shoporders.orders.show', {id: parseInt(element.getAttribute('data-id'))}))
      .then((response) => {
        let order = response.data
        // set server data to current form
        let formOrder = {
          status_id: order.status_id,
          order_number: order.order_number,
          payment_method_id: order.payment_method_id,
          shipping_type_id: order.shipping_type_id,
          shipping_price: order.shipping_price,
          user_id: order.user.id,
          name: order.user.name,
          last_name: order.user.last_name,
          email: order.user.email,
          phone: order.user.phone
        }

        this.setState({
          form: Object.assign(this.state.form, formOrder),
          shippingPrice: order.shipping_price,
          orderPrice: parseFloat(order.total_price),
          totalPrice: parseFloat(order.total_price) + parseFloat(order.shipping_price),
          loading: false,
          loadingOffers: false
        })
      })
      .catch((error) => {
        this.setState({loading: false})
        Message.error(error.response.data.message)
      })
  }

  addBuyerModal() {
    // Update state for modal and for buyer loading data to the Table Component
    this.setState({
      visible: true,
      buyerLoading: true
    })
    // Get all user list from the database
    // and set users to the state
    axios
      .get(route('shopper.users.list'))
      .then((response) => {
        this.setState({
          buyerLoading: false,
          buyers: response.data
        })
      })
      .catch((error) => {
        this.setState({buyerLoading: false})
        Message.error(error.response.data.message)
      })
  }

  hideAddBuyerModal() {
    this.setState({visible: false})
  }

  showOfferModal() {
    this.setState({offerVisible: true})
  }

  hideOfferModal() {
    this.setState({offerVisible: false})
  }

  showModalDelete() {
    this.setState({confirmDelete: true})
  }

  hideModalDelete() {
    this.setState({confirmDelete: false})
  }

  onSelect(selection) {
    if (selection.length > 0) {
      this.setState({
        disabledDelete: false,
        selected: selection
      })
    } else {
      this.setState({
        disabledDelete: true,
        selected: selection
      })
    }
  }

  onRowClick(row, event, column) {
    let user = {
      user_id: row.id,
      name: row.name,
      last_name: row.last_name,
      email: row.email,
      phone: row.phone,
    }
    this.setState({
      form: Object.assign(this.state.form, user),
      visible: false
    })
  }

  removeBuyer() {
    let user = {
      user_id: '',
      name: '',
      last_name: '',
      email: '',
      phone: ''
    }

    this.setState({
      form: Object.assign(this.state.form, user)
    })
  }

  deleteSelected() {
    let element = document.getElementById('order-form')

    if (this.state.selected.length > 0) {
      let ids = [], records = this.state.selected

      records.map((record, index) => ids.push(record.id))

      axios
        .delete(route('shopper.shoporders.order.destroyOffer', {id: ids, order_id: parseInt(element.getAttribute('data-id'))}))
        .then((response) => {
          this.setState({
            orderPrice: response.data.orderPrice,
            totalPrice: response.data.totalPrice,
          })
          this.hideModalDelete()

          Notification({
            title: response.data.title,
            message: response.data.message,
            type: response.data.status
          })
          this.getOrderOffers()
        })
        .catch((error) => {
          Message.error(error.response.data.message)
        })
    }
  }

  render() {
    let devise = document.getElementById('order-form').getAttribute('data-devise')
    return (
      <div className="orders">
        {(this.state.hasError === true) ? <Alert title={this.trans.get('Error')} type="error" description={this.state.errors} showIcon={true} /> : ''}
        <Price
          shippingPrice={this.state.shippingPrice}
          orderPrice={this.state.orderPrice}
          totalPrice={this.state.totalPrice}
          devise={devise}
        />
        <Form
          className='layout'
          ref='form'
          model={this.state.form}
          rules={this.state.rules}
          labelWidth='120'
          labelPosition='top'
          onSubmit={this.store.bind(this)}
        >
          <div className="layout-row">
            <Loading text={this.trans.get('Loading Data...')} loading={this.state.loading}>
              <div className='wrapper-md'>
                {
                  (this.state.isCreate === false) ?
                    <Layout.Row gutter='20'>
                      <Layout.Col span='12'>
                        <Form.Item label={this.trans.get('Order Number')} prop='order_number'>
                          <Input type='text' value={this.state.form.order_number} disabled autoComplete='off' />
                        </Form.Item>
                      </Layout.Col>
                    </Layout.Row>
                    :
                    ''
                }
              </div>
              <Tabs activeName='1' type='card'>
                <Tabs.Pane label={this.trans.get('Informations')} name='1'>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('Status')}>
                        <Select
                          value={this.state.form.status_id}
                          clearable={true}
                          filterable={true}
                          onChange={this.onChange.bind(this, 'status_id')}
                        >
                          {
                            this.state.statuses.map(el => {
                              return <Select.Option key={el.id} label={el.name} value={el.id} />
                            })
                          }
                        </Select>
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                  <Layout.Row>
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('Payment Method')}>
                        <Select
                          value={this.state.form.payment_method_id}
                          clearable={true}
                          filterable={true}
                          onChange={this.onChange.bind(this, 'payment_method_id')}
                        >
                          {
                            this.state.paymentMethods.map(el => {
                              return <Select.Option key={el.id} label={el.name} value={el.id} />
                            })
                          }
                        </Select>
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                  <Layout.Row>
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('Shipping Type')}>
                        <Select
                          value={this.state.form.shipping_type_id}
                          clearable={true}
                          filterable={true}
                          onChange={this.onChange.bind(this, 'shipping_type_id')}
                        >
                          {
                            this.state.shippingTypes.map(el => {
                              return <Select.Option key={el.id} label={el.name} value={el.id} />
                            })
                          }
                        </Select>
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('Shipping Price')} prop='shipping_price'>
                        <Input type='text' value={this.state.form.shipping_price} onChange={this.onChange.bind(this, 'shipping_price')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                </Tabs.Pane>
                <Tabs.Pane label={this.trans.get('Buyer')} name='2'>
                  <div className="buyers-actions m-b-md">
                    <Button
                      icon="plus"
                      size="small"
                      onClick={this.addBuyerModal.bind(this)}
                    >{this.trans.get('Add Buyer')}</Button>
                    <Button
                      icon="delete"
                      size="small"
                      onClick={this.removeBuyer.bind(this)}
                    >{this.trans.get('Remove Buyer')}</Button>
                  </div>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('Name')} prop='name'>
                        <Input type='text' value={this.state.form.name} onChange={this.onChange.bind(this, 'name')} autoComplete='off' disabled />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('Lastname')} prop='last_name'>
                        <Input type='text' value={this.state.form.last_name} onChange={this.onChange.bind(this, 'last_name')} autoComplete='off' disabled />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('Email')} prop='email'>
                        <Input value={this.state.form.email} onChange={this.onChange.bind(this, 'email')} autoComplete='off' disabled />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('Phone')} prop='phone'>
                        <Input type='text' value={this.state.form.phone} onChange={this.onChange.bind(this, 'phone')} autoComplete='off' disabled />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                </Tabs.Pane>
                <Tabs.Pane label={this.trans.get('Offers')} name='3' disabled={this.state.disabledOffer}>
                  <div className="offer-actions">
                    <Button
                      type="primary"
                      icon="plus"
                      size="small"
                      onClick={this.showOfferModal.bind(this)}
                    >{this.trans.get('Add Offer')}</Button>
                    <Button
                      type="danger"
                      icon="delete"
                      size='small'
                      disabled={this.state.disabledDelete}
                      onClick={this.showModalDelete.bind(this)}
                    >{this.trans.get('Delete')}</Button>
                  </div>
                  <Loading text={this.trans.get('Loading Offers...')} loading={this.state.loadingOffers}>
                    <Table
                      style={{width: '100%'}}
                      columns={this.state.columns}
                      data={this.state.offersList}
                      stripe={true}
                      height={250}
                      emptyText={this.trans.get('No Offers')}
                      onSelectChange={this.onSelect.bind(this)}
                    />
                  </Loading>
                </Tabs.Pane>
              </Tabs>
            </Loading>
          </div>
          <div className="wrapper-md buttons-actions">
            <button className="btn btn-primary" type="submit" disabled={(this.state.loader === true)}>
              {(this.state.loader === true) ? <Loader type="ball-beat" /> : ((this.state.isCreate === true) ? this.trans.get('Create') : this.trans.get('Save')) }
            </button>
            <span>{this.trans.get('Or')}</span>
            <a href={route('shopper.shoporders.orders.index')}>{this.trans.get('Cancel')}</a>
          </div>
        </Form>
        <Rodal
          visible={this.state.visible}
          onClose={this.hideAddBuyerModal.bind(this)}
          animation='slideDown'
          className='rodal-modal rodal-default'
          height={450}
          width={850}
        >
          <div className='modal-data'>
            <h4 className='wrapper-md'>{this.trans.get('Add a new buyer')}</h4>
            <Loading text='Loading Buyers...' loading={this.state.buyerLoading}>
              <div>
                <Table
                  style={{width: '100%'}}
                  columns={this.state.buyerColumns}
                  data={this.state.buyers}
                  height={388}
                  emptyText={this.trans.get('No Buyers')}
                  onRowClick={this.onRowClick.bind(this)}
                />
              </div>
            </Loading>
          </div>
        </Rodal>
        <Rodal
          visible={this.state.offerVisible}
          onClose={this.hideOfferModal.bind(this)}
          animation='slideDown'
          className='rodal-modal rodal-default'
          height={500}
          width={850}
        >
          <div className='modal-data'>
            <h4 style={{padding: '20px 20px 10px 20px'}}>{this.trans.get('Add Offer')} {(this.state.loaderOffer === true) ? <Loader type="ball-beat" /> : '' }</h4>
            <div className='body'>
              <Form
                className='layout'
                ref='offerForm'
                model={this.state.offerForm}
                labelWidth='120'
                labelPosition='top'
                onSubmit={this.OfferStore.bind(this)}
              >
                <Form.Item label={this.trans.get('Quantity')} prop='quantity'>
                  <Input type='text' value={this.state.offerForm.quantity} onChange={this.onOfferFormChange.bind(this, 'quantity')} autoComplete='off' />
                </Form.Item>
                <Form.Item label={this.trans.get('Category')} prop='category_id'>
                  <Select
                    value={this.state.offerForm.category_id}
                    clearable={true}
                    filterable={true}
                    onChange={this.onOfferFormChange.bind(this, 'category_id')}
                  >
                    {
                      this.state.categories.map(el => {
                        return <Select.Option key={el.id} label={el.name} value={el.id} />
                      })
                    }
                  </Select>
                </Form.Item>
                <Form.Item label={this.trans.get('Product')} prop='product_id'>
                  <Select
                    value={this.state.offerForm.product_id}
                    clearable={true}
                    filterable={true}
                    onChange={this.onOfferFormChange.bind(this, 'product_id')}
                  >
                    {
                      this.state.products.map(el => {
                        return <Select.Option key={el.id} label={el.name} value={el.id} />
                      })
                    }
                  </Select>
                </Form.Item>
                <Form.Item label={this.trans.get('Offer')} prop='offer_id'>
                  <Select
                    value={this.state.offerForm.offer_id}
                    clearable={true}
                    filterable={true}
                    onChange={this.onOfferFormChange.bind(this, 'offer_id')}
                  >
                    {
                      this.state.offers.map(el => {
                        return <Select.Option key={el.id} label={el.name} value={el.id} />
                      })
                    }
                  </Select>
                </Form.Item>
                <div className="text-right m-t-xl">
                  <Button nativeType="submit" type="primary">{this.trans.get('Create')}</Button>
                  <Button onClick={this.handleReset.bind(this)}>{this.trans.get('Cancel')}</Button>
                </div>
              </Form>
            </div>
          </div>
        </Rodal>
        <Rodal
          visible={this.state.confirmDelete}
          onClose={this.hideModalDelete.bind(this)}
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
                <Button onClick={this.deleteSelected.bind(this)} type="danger">{this.trans.get('Delete')}</Button>
                <Button onClick={this.hideModalDelete.bind(this)}>{this.trans.get('Cancel')}</Button>
              </div>
            </div>
          </div>
        </Rodal>
      </div>
    )
  }
}

if (document.getElementById('order-form')) {
  ReactDOM.render(<OrderForm/>, document.getElementById('order-form'))
}
