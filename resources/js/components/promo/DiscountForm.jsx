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
import fields from './discounts/fields'
import rules from './discounts/validation'
import columns from '../orders/orders/columns'
import offerFields from './discounts/offerFields'
import ShopperComponent from '../ShopperComponent'

export default class DiscountForm extends ShopperComponent {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      loading: false,
      loaderOffer: false,
      loadingOffers: false,
      isCreate: true,
      hasError: false,
      offerVisible: false,
      disabledDelete: true,
      confirmDelete: false,

      errors: '',

      form: fields,
      offerForm: offerFields,
      rules: rules,
      columns: columns,

      categories: [],
      products: [],
      offers: [],
      offersList: [],
      selected: []
    }

    this.getRecord = this.getRecord.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.getProductByCategory = this.getProductByCategory.bind(this)
    this.getOfferByProduct = this.getOfferByProduct.bind(this)
    this.getDiscountOffers = this.getDiscountOffers.bind(this)
  }

  componentDidMount() {
    if (window.location.href !== route('shopper.promo.discounts.create').template) {
      this.getRecord()
      this.getCategories()
      this.getDiscountOffers()
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

  getRecord() {
    let element = document.getElementById('discount-form')
    this.setState({
      isCreate: false,
      loading: true
    })

    axios
      .get(route('shopper.promo.discounts.show', {id: parseInt(element.getAttribute('data-id'))}))
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
          loading: false
        })
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  getDiscountOffers() {
    let element = document.getElementById('discount-form')
    this.setState({loadingOffers: true})

    axios
      .get(route('shopper.promo.discounts.getOffers', {id: parseInt(element.getAttribute('data-id'))}))
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

  updateForm(id) {
    axios
      .put(route('shopper.promo.discounts.update', {id: parseInt(id)}), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.promo.discounts.index')
        }, 1500)
      })
      .catch((error) => {
        this.setState({loader: false})
        Message.error(error.response.data.message)
        let errors = error.response.data.errors, codeMessage = '', nameMessage = ''

        if (error.response.data.errors !== undefined) {
          if (errors.name !== undefined) {
            errors.name.map((err, index) => { nameMessage = err})
          }

          let errorList = `- ${nameMessage}`

          this.setState({
            hasError: true,
            errors: errorList
          })
        }
      })
  }

  postForm() {
    axios
      .post(route('shopper.promo.discounts.store'), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.promo.discounts.index')
        }, 1500)
      })
      .catch((error) => {
        this.setState({loader: false})
        Message.error(error.response.data.message)
        let errors = error.response.data.errors, codeMessage = '', nameMessage = ''

        if (error.response.data.errors !== undefined) {
          if (errors.name !== undefined) {
            errors.name.map((err, index) => { nameMessage = err})
          }

          let errorList = `- ${nameMessage} - ${error.response.data.message}`
          this.setState({
            hasError: true,
            errors: errorList
          })
        }
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

  onSubmit(e) {
    e.preventDefault()
    let element = document.getElementById('discount-form')

    this.refs.form.validate((valid) => {
      if (valid) {
        this.setState({loader: true})

        if (window.location.href === route('shopper.promo.discounts.create').template) {
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
    let element = document.getElementById('discount-form');

    if (this.state.offerForm.offer_id !== '') {
      axios
        .post(route('shopper.promo.discounts.offers', {id: parseInt(element.getAttribute('data-id'))}), this.state.offerForm)
        .then((response) => {
          this.getDiscountOffers()
          this.setState({offerVisible: false})

          Notification({
            title: response.data.title,
            message: response.data.message,
            type: response.data.status
          })

          this.refs.offerForm.resetFields()
        })
        .catch((error) => {
          Message.error(error.response.data.message)
        })
    } else {
      Notification({
        title: this.trans.get('Error'),
        message: this.trans.get('Please select offer before apply your discount'),
        type: 'error'
      })
    }
  }

  handleReset(e) {
    e.preventDefault()

    this.setState({offerVisible: false})
    this.refs.offerForm.resetFields()
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

  deleteSelected() {
    let element = document.getElementById('discount-form')

    if (this.state.selected.length > 0) {
      let ids = [], records = this.state.selected

      records.map((record, index) => ids.push(record.id))

      axios
        .delete(route('shopper.promo.discounts.destroyOffer', {id: ids}))
        .then((response) => {
          this.hideModalDelete()

          Notification({
            title: response.data.title,
            message: response.data.message,
            type: response.data.status
          })
          this.getDiscountOffers()
        })
        .catch((error) => {
          Message.error(error.response.data.message)
        })
    }
  }

  render() {
    return (
      <div className="discounts">
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
                </Layout.Row>
              </div>
              <Tabs activeName='1' type='card'>
                <Tabs.Pane label={this.trans.get('Settings')} name='1'>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('Period available for the discount')} prop='date'>
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
                      <Form.Item label={this.trans.get('Code')} prop='code'>
                        <Input type='text' value={this.state.form.code} onChange={this.onChange.bind(this, 'code')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('Discount type')} prop='type'>
                        <Select value={this.state.form.type} onChange={this.onChange.bind(this, 'type')}>
                          <Select.Option label={this.trans.get('Price')} value="fixed" />
                          <Select.Option label={this.trans.get('Percent')} value="percent" />
                        </Select>
                      </Form.Item>
                    </Layout.Col>
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('Discount value')} prop='value'>
                        <InputNumber value={this.state.form.value} onChange={this.onChange.bind(this, 'value')} min="1" max="100" />
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
                <Tabs.Pane label={this.trans.get('Offers')} name='3' disabled={this.state.isCreate}>
                  <div className="offer-actions">
                    <Button
                      type="primary"
                      icon="plus"
                      size="small"
                      onClick={() => this.setState({offerVisible: true})}
                    >{this.trans.get('Add Offer')}</Button>
                    <Button
                      type="danger"
                      icon="delete"
                      size='small'
                      disabled={this.state.disabledDelete}
                      onClick={() => this.setState({confirmDelete: true})}
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
            <a href={route('shopper.promo.discounts.index')}>{this.trans.get('Cancel')}</a>
          </div>
        </Form>
        <Rodal
          visible={this.state.offerVisible}
          onClose={() => this.setState({offerVisible: false})}
          animation='slideDown'
          className='rodal-modal rodal-default'
          height={420}
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
                  <Button nativeType="submit" type="primary">{this.trans.get('Save')}</Button>
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

if (document.getElementById('discount-form')) {
  ReactDOM.render(<DiscountForm/>, document.getElementById('discount-form'))
}
