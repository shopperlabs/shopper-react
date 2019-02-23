import React from 'react'
import ReactDOM from 'react-dom'
import Rodal from 'rodal'
import Loader from 'react-loaders'
import DropzoneComponent from 'react-dropzone-component'
import {
  Button,
  Input,
  Form,
  Switch,
  Layout,
  Tabs,
  Table,
  Select,
  Message,
  Dialog,
  Notification,
  Alert,
  Loading
} from 'element-react'

import ShopperComponent from '../ShopperComponent'
import fields from './fields'
import ordersColumns from './ordersColumns'
import addressesColumns from './addressesColumns'
import addressFields from './addressFields'
import addressRules from './addressValidation'

export default class UserForm extends ShopperComponent {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      loading: false,
      loadingAddresses: false,
      isCreate: true,
      visible: false,
      hasError: false,
      disabledDelete: true,
      confirmDelete: false,

      errors: '',
      imageUrl: '',

      form: fields,
      addressForm: addressFields,
      addressRules: addressRules,
      rules: {
        name: [
          { required: true, message: 'Please name is required', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please user email is required', trigger: 'blur' },
          { type: 'email', message: 'Please correct email address', trigger: 'blur,change' }
        ],
        password: [
          { required: true, message: 'Please password is required', trigger: 'blur' },
          { validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('Please the password is required'))
              } else {
                if (this.state.form.checkPass !== '') {
                  this.refs.form.validateField('checkPass')
                }
                callback()
              }
            }
          }
        ],
        checkPass: [
          { required: true, message: 'Please confirm the password', trigger: 'blur' },
          { validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('Please input the password again'))
              } else if (value !== this.state.form.password) {
                callback(new Error('The two password don\'t match!'))
              } else {
                callback()
              }
            }
          }
        ],
      },
      ordersColumns: ordersColumns,
      addressesColumns: addressesColumns,

      orders: [],
      addresses: [],
      selected: [],
      countries: [],
      states: [],

      currentAddress: null,
    }

    this.djsConfig = {
      headers: {
        "X-CSRF-TOKEN": document.head.querySelector('meta[name="csrf-token"]').content,
        "X-Requested-With": "XMLHttpRequest"
      },
      acceptedFiles: "image/jpeg,image/png,image/jpeg",
      params: {field: "preview_image"},
      maxFilesize: 2,
      maxFiles: 1,
      thumbnailWidth: 100,
      thumbnailHeight: 100
    }

    this.componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.jpeg'],
      showFiletypeIcon: true,
      postUrl: route('shopper.media.uploader').template
    }

    this.uploadEvents = {
      complete: (response) => {
        let data = JSON.parse(response.xhr.response)

        this.setState({
          form: Object.assign({}, this.state.form, { image_id: data.id })
        })
      }
    }

    this.postForm = this.postForm.bind(this)
    this.updateForm = this.updateForm.bind(this)
    this.getRecord = this.getRecord.bind(this)
    this.getUserOrders = this.getUserOrders.bind(this)
    this.getUserAddresses = this.getUserAddresses.bind(this)
    this.getCountries = this.getCountries.bind(this)
    this.getStatesByCountry = this.getStatesByCountry.bind(this)
    this.postFormAddress = this.postFormAddress.bind(this)
    this.updateFormAddress = this.updateFormAddress.bind(this)
  }

  componentDidMount() {
    if (window.location.href !== route('shopper.users.create').template) {
      this.getRecord()
      this.getCountries()
    }
  }

  getRecord() {
    let element = document.getElementById('user-form')
    this.setState({
      isCreate: false,
      loading: true
    })

    axios
      .get(route('shopper.users.show', {id: parseInt(element.getAttribute('data-id'))}))
      .then((response) => {
        let data = response.data
        this.setState({
          form: Object.assign(this.state.form, data),
          addresses: data.addresses,
          orders: data.orders,
          loading: false
        })
      })
      .catch((error) => {
        this.setState({loading: false})
        Message.error(error.response.data.message)
      })
  }

  getCountries() {
    axios
      .get(route('shopper.settings.locations.countries.list'))
      .then((response) => {
        this.setState({countries: response.data})
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  getStatesByCountry(id) {
    axios
      .get(route('shopper.settings.locations.countries.states', {id: parseInt(id)}))
      .then((response) => {
        this.setState({states: response.data})
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  getUserOrders() {
    let element = document.getElementById('user-form')

    axios
      .get(route('shopper.users.orders', {id: parseInt(element.getAttribute('data-id'))}))
      .then((response) => this.setState({orders: response.data}))
      .catch((error) => Message.error(error.response.data.message))
  }

  getUserAddresses() {
    let element = document.getElementById('user-form')
    this.setState({loadingAddresses: true})

    axios
      .get(route('shopper.users.addresses', {id: parseInt(element.getAttribute('data-id'))}))
      .then((response) => {
        this.setState({
          addresses: response.data,
          loadingAddresses: false
        })
      })
      .catch((error) => {
        this.setState({loadingAddresses: false})
        Message.error(error.response.data.message)
      })
  }

  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    })
  }

  onAddressFormChange(key, value) {
    if (key === 'country_id') {
      this.setState({states: []})

      if (value !== '') {
        this.getStatesByCountry(value)
      }
    }

    this.setState({
      addressForm: Object.assign({}, this.state.addressForm, { [key]: value })
    })
  }

  postForm() {
    axios
      .post(route('shopper.users.store'), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.users.index')
        }, 1500)
      })
      .catch((error) => {
        Message.error(error.response.data.message)
        let errors = error.response.data.errors, emailMessage = ''

        if (error.response.data.errors !== undefined) {
          if (errors.email !== undefined) {
            errors.email.map((er, idx) => { emailMessage = er})

            let errorList = `- ${emailMessage}`

            this.setState({
              hasError: true,
              errors: errorList
            })
          }
        }

        this.setState({loader: false})
      })
  }

  updateForm(id) {
    axios
      .put(route('shopper.users.update', {id: parseInt(id)}), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.users.index')
        }, 1500)
      })
      .catch((error) => {
        Message.error(error.response.data.message)
        let errors = error.response.data.errors, emailMessage = ''

        if (error.response.data.errors !== undefined) {
          if (errors.email !== undefined) {
            errors.email.map((er, idx) => { emailMessage = er})

            let errorList = `- ${emailMessage}`

            this.setState({
              hasError: true,
              errors: errorList
            })
          }
        }

        this.setState({loader: false})
      })
  }

  onSubmit(e) {
    e.preventDefault()
    let element = document.getElementById('user-form')

    this.refs.form.validate((valid) => {
      if (valid) {
        this.setState({loader: true})

        if (window.location.href === route('shopper.users.create').template) {
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

  postFormAddress(id) {
    axios
      .post(route('shopper.addresses.store', {user_id: parseInt(id)}), this.state.addressForm)
      .then((response) => {
        this.hideModal()
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })
        this.getUserAddresses()
        this.refs.addressForm.resetFields()
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  updateFormAddress(id) {
    axios
      .put(route('shopper.addresses.update', {id: parseInt(id)}), this.state.addressForm)
      .then((response) => {
        this.hideModal()
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })
        this.getUserAddresses()
        this.refs.addressForm.resetFields()
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  submitAddress(e) {
    e.preventDefault()
    let element = document.getElementById('user-form')

    this.refs.addressForm.validate((valid) => {
      if (valid) {
        if (this.state.currentAddress === null) {
          this.postFormAddress(element.getAttribute('data-id'))
        } else {
          this.updateFormAddress(this.state.currentAddress.id)
        }
      } else {
        Message.error('Invalid form, check your form please !')
        return false
      }
    })
  }

  onCellClick(row, column, cell, event) {
    if (!cell.getAttribute('class').includes('selection')) {
      this.setState({
        currentAddress: row,
        addressForm: Object.assign(this.state.addressForm, row),
        visible: true
      })
    }
  }

  onOrdersCellClick(row, column, cell, event) {
    window.location = route('shopper.shoporders.orders.edit', row)
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
    if (this.state.selected.length > 0) {
      let ids = [], records = this.state.selected

      records.map((record, index) => ids.push(record.id))

      axios
        .delete(route('shopper.addresses.destroy', {id: ids}))
        .then((response) => {
          this.hideModalDelete()
          Notification({
            title: response.data.title,
            message: response.data.message,
            type: response.data.status
          })
          this.getUserAddresses()
          this.setState({disabledDelete: true})
        })
        .catch((error) => {
          Message.error(error.response.data.message)
        })
    }
  }

  showModal() {
    this.refs.addressForm.resetFields()
    this.setState({
      currentAddress: null,
      visible: true
    })
  }

  hideModal() {
    this.setState({visible: false})
  }

  showModalDelete() {
    this.setState({confirmDelete: true})
  }

  hideModalDelete() {
    this.setState({confirmDelete: false})
  }

  render() {
    const { imageUrl } = this.state
    let componentConfig = this.componentConfig, djsConfig = this.djsConfig, eventHandlers = this.uploadEvents

    return (
      <div className="users" style={{marginTop: '50px'}}>
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
              <Tabs activeName='1' type='card'>
                <Tabs.Pane label={this.trans.get('Informations')} name='1'>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('Name')} prop='name'>
                        <Input type='text' value={this.state.form.name} onChange={this.onChange.bind(this, 'name')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('Lastname')} prop='last_name'>
                        <Input type='text' value={this.state.form.last_name} onChange={this.onChange.bind(this, 'last_name')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('E-Mail Address')} prop='email'>
                        <Input value={this.state.form.email} onChange={this.onChange.bind(this, 'email')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('Phone')} prop='phone'>
                        <Input type='text' value={this.state.form.phone} onChange={this.onChange.bind(this, 'phone')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('Password')} prop='password'>
                        <Input type='password' value={this.state.form.password} onChange={this.onChange.bind(this, 'password')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('Confirm password')} prop='checkPass'>
                        <Input type='password' value={this.state.form.checkPass} onChange={this.onChange.bind(this, 'checkPass')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                </Tabs.Pane>
                <Tabs.Pane label='Images' name='2'>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <span className="image-preview">Avatar</span>
                      <DropzoneComponent config={componentConfig} djsConfig={djsConfig} eventHandlers={eventHandlers} />
                    </Layout.Col>
                  </Layout.Row>
                </Tabs.Pane>
                <Tabs.Pane label={this.trans.get('Addresses')} name='3' disabled={this.state.isCreate}>
                  <div className="address-actions m-b-md">
                    <Button
                      type="primary"
                      icon="plus"
                      size="small"
                      onClick={this.showModal.bind(this)}
                    >{this.trans.get('Create Address')}</Button>
                    <Button
                      type="danger"
                      icon="delete"
                      size='small'
                      disabled={this.state.disabledDelete}
                      onClick={this.showModalDelete.bind(this)}
                    >{this.trans.get('Delete')}</Button>
                  </div>
                  <Loading text={this.trans.get('Loading Addresses...')} loading={this.state.loadingAddresses}>
                    <Table
                      style={{width: '100%'}}
                      columns={this.state.addressesColumns}
                      data={this.state.addresses}
                      stripe={true}
                      height={250}
                      emptyText={this.trans.get('No Address')}
                      onSelectChange={this.onSelect.bind(this)}
                      onCellClick={this.onCellClick.bind(this)}
                    />
                  </Loading>
                </Tabs.Pane>
                <Tabs.Pane label={this.trans.get('Orders')} name='4' disabled={this.state.isCreate}>
                  <Loading text={this.trans.get('Loading Orders...')} loading={this.state.loading}>
                    <Table
                      style={{width: '100%'}}
                      columns={this.state.ordersColumns}
                      data={this.state.orders}
                      stripe={true}
                      height={250}
                      emptyText={this.trans.get('No Orders')}
                      onCellClick={this.onOrdersCellClick.bind(this)}
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
            <a href={route('shopper.users.index')}>{this.trans.get('Cancel')}</a>
          </div>
        </Form>
        <Dialog
          title={(this.state.currentAddress !== null) ? this.trans.get('Update Address') : this.trans.get('Create Address')}
          visible={this.state.visible}
          onCancel={this.hideModal.bind(this)}
        >
          <Dialog.Body>
            <Form
              className='layout'
              ref='addressForm'
              model={this.state.addressForm}
              rules={this.state.addressRules}
              labelWidth='120'
              labelPosition='top'
              onSubmit={this.submitAddress.bind(this)}
            >
              <Switch
                value={this.state.addressForm.active}
                onColor='#13ce66'
                offColor='#ff4949'
                onValue={1}
                offValue={0}
                onChange={this.onAddressFormChange.bind(this, 'active')}
              >
              </Switch>
              <span className='active-label'>{this.trans.get('Default')}</span>
              <p className='m-b-sm'/>
              <Layout.Row gutter="20">
                <Layout.Col span="12">
                  <Form.Item label={this.trans.get('Country')} prop='country_id'>
                    <Select
                      value={this.state.form.country_id}
                      clearable={true}
                      filterable={true}
                      onChange={this.onAddressFormChange.bind(this, 'country_id')}
                    >
                      {
                        this.state.countries.map(el => {
                          return <Select.Option key={el.id} label={el.name} value={el.id} />
                        })
                      }
                    </Select>
                  </Form.Item>
                </Layout.Col>
                <Layout.Col span="12">
                  <Form.Item label={this.trans.get('State')} prop='state_id'>
                    <Select
                      value={this.state.form.state_id}
                      clearable={true}
                      filterable={true}
                      onChange={this.onAddressFormChange.bind(this, 'state_id')}
                    >
                      {
                        this.state.states.map(el => {
                          return <Select.Option key={el.id} label={el.name} value={el.id} />
                        })
                      }
                    </Select>
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
              <Layout.Row gutter="20">
                <Layout.Col span="12">
                  <Form.Item label={this.trans.get('City')} prop='city'>
                    <Input type='text' value={this.state.addressForm.city} onChange={this.onAddressFormChange.bind(this, 'city')} autoComplete='off' />
                  </Form.Item>
                </Layout.Col>
                <Layout.Col span="12">
                  <Form.Item label={this.trans.get('Street')} prop='street'>
                    <Input type='text' value={this.state.addressForm.street} onChange={this.onAddressFormChange.bind(this, 'street')} autoComplete='off' />
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
              <Layout.Row gutter="20">
                <Layout.Col span="12">
                  <Form.Item label={this.trans.get('Phone')} prop='phone_number'>
                    <Input type='text' value={this.state.addressForm.phone_number} onChange={this.onAddressFormChange.bind(this, 'phone_number')} autoComplete='off' />
                  </Form.Item>
                </Layout.Col>
                <Layout.Col span="12">
                  <Form.Item label={this.trans.get('Post Code')} prop='post_code'>
                    <Input type='text' value={this.state.addressForm.post_code} onChange={this.onAddressFormChange.bind(this, 'post_code')} autoComplete='off' />
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
              <Form.Item label={this.trans.get('Address')} prop='address'>
                <Input type='textarea' autosize={{ minRows: 4, maxRows: 6}} value={this.state.addressForm.address} onChange={this.onAddressFormChange.bind(this, 'address')} autoComplete='off' />
              </Form.Item>
            </Form>
          </Dialog.Body>
          <Dialog.Footer className="dialog-footer">
            <Button type="primary" onClick={this.submitAddress.bind(this)}>
              {(this.state.currentAddress !== null) ? this.trans.get('Update'): this.trans.get('Create')}
            </Button>
            <Button onClick={this.hideModal.bind(this)}>{this.trans.get('Cancel')}</Button>
          </Dialog.Footer>
        </Dialog>
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

if (document.getElementById('user-form')) {
  ReactDOM.render(<UserForm />, document.getElementById('user-form'))
}
