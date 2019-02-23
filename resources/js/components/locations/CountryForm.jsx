import React from 'react'
import ReactDOM from 'react-dom'
import Rodal from 'rodal'
import Loader from 'react-loaders'
import {
  Button,
  Input,
  Form,
  Switch,
  Layout,
  Tabs,
  Table,
  Message,
  Dialog,
  Notification,
  Alert,
  Loading
} from 'element-react'

import columns from './columns'
import rules from './validation'
import fields from './fields'
import stateFields from './stateFields'
import ShopperComponent from '../ShopperComponent'

export default class CountryForm extends ShopperComponent {
  constructor(props) {
    super(props)

    this.state = {
      isCreate: true,
      loader: false,
      loading: false,
      loadingStates: false,
      disabledDelete: true,
      confirmDelete: false,
      visible: false,
      hasError: false,

      errors: '',

      form: fields,
      stateForm: stateFields,
      rules: rules,
      stateRules: rules,
      columns: columns,

      states: [],
      selected: [],

      currentState: null
    }

    this.getRecord = this.getRecord.bind(this)
    this.getStates = this.getStates.bind(this)
    this.postFormState = this.postFormState.bind(this)
    this.updateFormState = this.updateFormState.bind(this)
  }

  componentDidMount() {
    if (window.location.href !== route('shopper.settings.locations.countries.create').template) {
      let element = document.getElementById('location-form')

      this.getRecord(element.getAttribute('data-id'))
    }
  }

  getRecord(id) {
    this.setState({
      isCreate: false,
      loading: true,
      loadingStates: true
    })

    axios
      .get(route('shopper.settings.locations.countries.show', {id: parseInt(id)}))
      .then((response) => {
        let data = response.data
        this.setState({
          form: Object.assign(this.state.form, data),
          states: data.states,
          loading: false,
          loadingStates: false
        })
      })
      .catch((error) => {
        this.setState({
          loading: false,
          loadingStates: false
        })
        Message.error(error.response.data.message)
      })
  }

  getStates() {
    let element = document.getElementById('location-form')
    this.setState({loadingStates: true})
    axios
      .get(route('shopper.settings.locations.countries.show', {id: parseInt(element.getAttribute('data-id'))}))
      .then((response) => {
        let data = response.data
        this.setState({
          states: data.states,
          loadingStates: false
        })
      })
      .catch((error) => {
        this.setState({loadingStates: false})
        Message.error(error.response.data.message)
      })
  }

  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    })
  }

  onStateFormChange(key, value) {
    this.setState({
      stateForm: Object.assign({}, this.state.stateForm, { [key]: value })
    })
  }

  postForm() {
    axios
      .post(route('shopper.settings.locations.countries.store'), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.settings.locations.countries.index')
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

          if (errors.code !== undefined) {
            errors.code.map((er, index) => { codeMessage = er})
          }

          let errorList = `- ${codeMessage} - ${nameMessage}`
          this.setState({
            hasError: true,
            errors: errorList
          })
        }
      })
  }

  updateForm(id) {
    axios
      .put(route('shopper.settings.locations.countries.update', {id: parseInt(id)}), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.settings.locations.countries.index')
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

          if (errors.code !== undefined) {
            errors.code.map((er, index) => { codeMessage = er})
          }

          let errorList = `- ${codeMessage} - ${nameMessage}`
          this.setState({
            hasError: true,
            errors: errorList
          })
        }
      })
  }

  onSubmit(e) {
    e.preventDefault()
    let element = document.getElementById('location-form')

    this.refs.form.validate((valid) => {
      if (valid) {
        this.setState({loader: true})

        if (window.location.href === route('shopper.settings.locations.countries.create').template) {
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

  postFormState(id) {
    axios
      .post(route('shopper.settings.locations.states.store', {country_id: parseInt(id)}), this.state.stateForm)
      .then((response) => {
        this.hideModal()
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })
        this.getStates()
        this.refs.stateForm.resetFields()
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  updateFormState(id) {
    axios
      .put(route('shopper.settings.locations.states.update', {id: parseInt(id)}), this.state.stateForm)
      .then((response) => {
        this.hideModal()
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })
        this.getStates()
        this.refs.stateForm.resetFields()
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  storeState(e) {
    e.preventDefault()
    let element = document.getElementById('location-form')

    this.refs.stateForm.validate((valid) => {
      if (valid) {
        if (this.state.currentState === null) {
          this.postFormState(element.getAttribute('data-id'))
        } else {
          this.updateFormState(this.state.currentState.id)
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
        currentState: row,
        stateForm: Object.assign(this.state.stateForm, row),
        visible: true
      })
    }
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
        .delete(route('shopper.settings.locations.states.destroy', {id: ids}))
        .then((response) => {
          this.hideModalDelete()
          Notification({
            title: response.data.title,
            message: response.data.message,
            type: response.data.status
          })
          this.getStates()
          this.setState({disabledDelete: true})
        })
        .catch((error) => {
          Message.error(error.response.data.message)
        })
    }
  }

  showModal() {
    this.refs.stateForm.resetFields()
    this.setState({
      currentState: null,
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
    return (
      <div className="settings.locations">
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
                <Form.Item prop="is_enabled">
                  <Switch
                    value={this.state.form.is_enabled}
                    onColor='#13ce66'
                    offColor='#ff4949'
                    onValue={1}
                    offValue={0}
                    onChange={this.onChange.bind(this, 'is_enabled')}
                  >
                  </Switch>
                  <span className='active-label'>{this.trans.get('Enabled')}</span>
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
                <Tabs.Pane label={this.trans.get('Informations')} name='1'>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('ISO 3')} prop='iso_3'>
                        <Input type='text' value={this.state.form.iso_3} onChange={this.onChange.bind(this, 'iso_3')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('Calling Code')} prop='calling_code'>
                        <Input type='text' value={this.state.form.calling_code} onChange={this.onChange.bind(this, 'calling_code')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                </Tabs.Pane>
                <Tabs.Pane label={this.trans.get('States')} name='2' disabled={this.state.isCreate}>
                  <div className="settings.locations-actions m-b-md">
                    <Button
                      type="primary"
                      icon="plus"
                      size="small"
                      onClick={this.showModal.bind(this)}
                    >{this.trans.get('Create State')}</Button>
                    <Button
                      type="danger"
                      icon="delete"
                      size='small'
                      disabled={this.state.disabledDelete}
                      onClick={this.showModalDelete.bind(this)}
                    >{this.trans.get('Delete')}</Button>
                  </div>
                  <Loading text={this.trans.get('Loading States...')} loading={this.state.loadingStates}>
                    <Table
                      style={{width: '100%'}}
                      columns={this.state.columns}
                      data={this.state.states}
                      stripe={true}
                      height={250}
                      emptyText={this.trans.get('No States')}
                      onSelectChange={this.onSelect.bind(this)}
                      onCellClick={this.onCellClick.bind(this)}
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
            <a href={route('shopper.settings.locations.countries.index')}>{this.trans.get('Cancel')}</a>
          </div>
        </Form>
        <Dialog
          title={(this.state.currentState !== null) ? this.trans.get('Update State') : this.trans.get('Create State')}
          visible={this.state.visible}
          onCancel={this.hideModal.bind(this)}
        >
          <Dialog.Body>
            <Form
              className='layout'
              ref='stateForm'
              model={this.state.stateForm}
              rules={this.state.rules}
              labelWidth='120'
              labelPosition='top'
              onSubmit={this.storeState.bind(this)}
            >
              <Form.Item label={this.trans.get('Name')} prop='name'>
                <Input type='text' value={this.state.stateForm.name} onChange={this.onStateFormChange.bind(this, 'name')} autoComplete='off' />
              </Form.Item>
              <Form.Item label={this.trans.get('Code')} prop='code'>
                <Input type='text' value={this.state.stateForm.code} onChange={this.onStateFormChange.bind(this, 'code')} autoComplete='off' />
              </Form.Item>
            </Form>
          </Dialog.Body>
          <Dialog.Footer className="dialog-footer">
            <Button type="primary" onClick={this.storeState.bind(this)}>
              {(this.state.currentState !== null) ? this.trans.get('Update') : this.trans.get('Create')}
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

if (document.getElementById('location-form')) {
  ReactDOM.render(<CountryForm/>, document.getElementById('location-form'))
}
