import React from 'react'
import ReactDOM from 'react-dom'
import Rodal from 'rodal'
import Loader from 'react-loaders'
import {
  Input,
  Form,
  Switch,
  Layout,
  Tabs,
  Button,
  Table,
  Message,
  Notification,
  Alert,
  Loading
} from 'element-react'

import rules from './validation'
import fields from './fields'
import productsColumns from '../products/productsColumns'
import TextEditor from '../TextEditor'
import slug from '../../helpers/slugify'
import ShopperComponent from '../ShopperComponent'

export default class TagFrom extends ShopperComponent {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      loading: false,
      hasError: false,
      visibleProduct: false,
      confirmRemoveProduct: false,
      loadingProducts: false,
      isCreate: true,
      disabledAdd: true,
      disabledProductRemove: true,

      errors: '',

      form: fields,
      rules: rules,
      productsColumns: productsColumns,

      selected: [],
      selectedAssociates: [],
      products: [],
      associateProducts: []
    }

    this.getRecord = this.getRecord.bind(this)
    this.getProducts = this.getProducts.bind(this)
  }

  componentDidMount() {
    if (window.location.href !== route('shopper.tags.create').template) {
      let element = document.getElementById('tag-form')
      this.getRecord()
      this.getProducts()
      this.getRelatedProducts(element.getAttribute('data-id'))
    }
  }

  getRecord() {
    let element = document.getElementById('tag-form')
    this.setState({
      isCreate: false,
      loading: true
    })

    axios
      .get(route('shopper.tags.show', {id: parseInt(element.getAttribute('data-id'))}))
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

  getProducts() {
    axios
      .get(route('shopper.catalogue.products.list'))
      .then((response) => {
        this.setState({products: response.data})
      })
      .catch((error) => {})
  }

  getRelatedProducts(id) {
    this.setState({loadingProducts: true})

    axios
      .get(route('shopper.tags.get-products', {id: parseInt(id)}))
      .then((response) => {
        this.setState({
          loadingProducts: false,
          associateProducts: response.data
        })
      })
      .catch((error) => {
        this.setState({loadingProducts: false})
        Message.error(error.response.data.message)
      })
  }

  updateForm(id) {
    axios
      .put(route('shopper.tags.update', {id: parseInt(id)}), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.tags.index')
        }, 1500)
      })
      .catch((error) => {
        this.setState({loader: false})
        Message.error(error.response.data.message)
        let errors = error.response.data.errors, slugMessage = '', nameMessage = ''

        if (error.response.data.errors !== undefined) {
          if (errors.name !== undefined) {
            errors.name.map((err, index) => { nameMessage = err})
          }

          if (errors.slug !== undefined) {
            errors.slug.map((er, index) => { slugMessage = er})
          }

          let errorList = `- ${slugMessage} - ${nameMessage}`
          this.setState({
            hasError: true,
            errors: errorList
          })
        }
      })
  }

  postForm() {
    axios
      .post(route('shopper.tags.store'), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.tags.index')
        }, 1500)
      })
      .catch((error) => {
        this.setState({loader: false})
        Message.error(error.response.data.message)
        let errors = error.response.data.errors, slugMessage = '', nameMessage = ''

        if (error.response.data.errors !== undefined) {
          if (errors.name !== undefined) {
            errors.name.map((err, index) => { nameMessage = err})
          }

          if (errors.slug !== undefined) {
            errors.slug.map((er, index) => { slugMessage = er})
          }

          let errorList = `- ${slugMessage} - ${nameMessage}`
          this.setState({
            hasError: true,
            errors: errorList
          })
        }
      })
  }

  onSubmit(e) {
    e.preventDefault()
    let element = document.getElementById('tag-form')

    this.refs.form.validate((valid) => {
      if (valid) {
        this.setState({loader: true})

        if (window.location.href === route('shopper.tags.create').template) {
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

  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    })
  }

  handleChange(event){
    let value = slug(event.target.value)
    this.setState({
      form: Object.assign({}, this.state.form, { name: event.target.value, slug: value })
    })
  }

  onProductSelect(selection) {
    if (selection.length > 0) {
      this.setState({
        disabledAdd: false,
        selected: selection
      })
    } else {
      this.setState({
        disabledAdd: true,
        selected: selection
      })
    }
  }

  onAssociateProductSelect(selection) {
    if (selection.length > 0) {
      this.setState({
        disabledProductRemove: false,
        selectedAssociates: selection
      })
    } else {
      this.setState({
        disabledProductRemove: true,
        selectedAssociates: selection
      })
    }
  }

  addSelectedProducts() {
    let element = document.getElementById('tag-form')

    if (this.state.selected.length > 0) {
      let ids = [], records = this.state.selected
      records.map((record, index) => ids.push(record.id))

      axios
        .get(route('shopper.tags.set-products', {id: ids, tag_id: parseInt(element.getAttribute('data-id'))}))
        .then((response) => {
          this.setState({
            visibleProduct: false,
            selected: []
          })
          Notification({
            title: response.data.title,
            message: response.data.message,
            type: response.data.status
          })
          this.getRelatedProducts(element.getAttribute('data-id'))
        })
        .catch((error) => {
          Message.error(error.response.data.message)
        })
    }
  }

  removeSelectedProducts() {
    let element = document.getElementById('tag-form')

    if (this.state.selectedAssociates.length > 0) {
      let ids = [], records = this.state.selectedAssociates
      records.map((record, index) => ids.push(parseInt(record.id)))

      axios
        .delete(route('shopper.tags.remove-products', {id: ids, tag_id: parseInt(element.getAttribute('data-id'))}))
        .then((response) => {
          this.setState({
            confirmRemoveProduct: false,
            disabledProductRemove: true
          })
          Notification({
            title: response.data.title,
            message: response.data.message,
            type: response.data.status
          })
          this.getRelatedProducts(element.getAttribute('data-id'))
        })
        .catch((error) => {
          console.log(error.response.data)
          Message.error(error.response.data.message)
        })
    }
  }

  onProductClick(row, column, cell, event) {
    if (!cell.getAttribute('class').includes('selection')) {
      window.location = route('shopper.catalogue.products.edit', {id: parseInt(row.id)})
    }
  }

  render() {
    return(
      <div className="tags">
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
                    <Form.Item label={this.trans.get('Slug')} prop='slug'>
                      <Input type='text' value={this.state.form.slug} onChange={this.onChange.bind(this, 'slug')} autoComplete='off' />
                    </Form.Item>
                  </Layout.Col>
                </Layout.Row>
              </div>
              <Tabs activeName='1' type='card'>
                <Tabs.Pane label='Description' name='1'>
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
                <Tabs.Pane label={this.trans.get('Products')} name='2' disabled={this.state.isCreate}>
                  <div className="products-actions m-b-sm">
                    <Button
                      type="primary"
                      icon="plus"
                      size="small"
                      onClick={() => this.setState({visibleProduct: true})}
                    >{this.trans.get('Add Product')}</Button>
                    <Button
                      type="danger"
                      icon="delete"
                      size='small'
                      disabled={this.state.disabledProductRemove}
                      onClick={() => this.setState({confirmRemoveProduct: true})}
                    >{this.trans.get('Delete')}</Button>
                  </div>
                  <Loading text={this.trans.get('Loading Products...')} loading={this.state.loadingProducts}>
                    <Table
                      style={{width: '100%'}}
                      columns={this.state.productsColumns}
                      data={this.state.associateProducts}
                      stripe={true}
                      height={250}
                      emptyText='No Products'
                      onSelectChange={this.onAssociateProductSelect.bind(this)}
                      onCellClick={this.onProductClick.bind(this)}
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
            <a href={route('shopper.tags.index')}>{this.trans.get('Cancel')}</a>
          </div>
        </Form>
        <Rodal
          visible={this.state.visibleProduct}
          onClose={() => this.setState({visibleProduct: false})}
          animation='slideDown'
          className='rodal-modal rodal-default'
          height={450}
          width={900}
        >
          <div className='modal-data'>
            <h4 className='wrapper-md'>{this.trans.get('Add product')}</h4>
            <div>
              <Table
                style={{width: '100%'}}
                columns={this.state.productsColumns}
                data={this.state.products}
                height={310}
                emptyText={this.trans.get('No Products')}
                onSelectChange={this.onProductSelect.bind(this)}
              />
            </div>
            <div className="text-right wrapper-md">
              <Button onClick={this.addSelectedProducts.bind(this)} type="primary" disabled={this.state.disabledAdd}>{this.trans.get('Add Selected')}</Button>
              <Button onClick={() => this.setState({visibleProduct: false})}>{this.trans.get('Cancel')}</Button>
            </div>
          </div>
        </Rodal>
        <Rodal
          visible={this.state.confirmRemoveProduct}
          onClose={() => this.setState({confirmRemoveProduct: false})}
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
                <Button onClick={() => this.setState({confirmRemoveProduct: false})}>{this.trans.get('Cancel')}</Button>
              </div>
            </div>
          </div>
        </Rodal>
      </div>
    )
  }
}

if (document.getElementById('tag-form')) {
  ReactDOM.render(<TagFrom />, document.getElementById('tag-form'))
}
