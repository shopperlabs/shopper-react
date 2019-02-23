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
  Upload,
  Message,
  Card,
  Checkbox,
  Notification,
  Alert,
  Loading
} from 'element-react'

import fields from './fields'
import offerFields from './offerFields'
import rules from './validation'
import offerRules from './offerValidation'
import columns from './columns'
import productsColumns from './productsColumns'
import TextEditor from '../TextEditor'
import slug from '../../helpers/slugify'
import ShopperComponent from '../ShopperComponent'

export default class ProductForm extends ShopperComponent {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      loading: false,
      loadingOffers: false,
      loadingRelatedProducts: false,
      loadProducts: false,
      offerLoadingForm: false,
      isCreate: true,
      disabledDelete: true,
      disabledAdd: true,
      disabledProductRemove: true,
      confirmDelete: false,
      confirmRemoveProduct: false,
      visible: false,
      visibleProduct: false,
      hasError: false,
      disabledOffer: true,
      checkAll: false,
      isIndeterminate: true,
      displayAdditionalCategories: false,

      imageUrl: '',
      errors: '',

      columns: columns,
      productsColumns: productsColumns,
      form: fields,
      rules: rules,
      offerForm: offerFields,
      offerRules: offerRules,

      options: [],
      categories: [],
      checkedCategories: [],
      brands: [],
      offers: [],
      relatedProducts: [],
      products: [],
      productIds: [],
      selected: [],
      selectedProducts: [],

      currentOffer: null,
    }

    this.djsConfig = {
      headers: {
        "X-CSRF-TOKEN": document.head.querySelector('meta[name="csrf-token"]').content,
        "X-Requested-With": "XMLHttpRequest"
      },
      acceptedFiles: "image/jpeg,image/png,image/jpeg",
      maxFilesize: 2,
      params: {field: "images"},
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
        let data = JSON.parse(response.xhr.response), ids = this.state.form.ids
        ids.push(data.id)

        this.setState({
          form: Object.assign({}, this.state.form, { ids: ids })
        })
      }
    }

    this.getOffers = this.getOffers.bind(this)
    this.updateForm = this.updateForm.bind(this)
    this.postForm = this.postForm.bind(this)
    this.postFormOffer = this.postFormOffer.bind(this)
    this.updateFormOffer = this.updateFormOffer.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
    this.getRecord = this.getRecord.bind(this)
    this.getProducts = this.getProducts.bind(this)
    this.additionnalCategories = this.additionnalCategories.bind(this)
  }

  componentDidMount() {
    this.getCategories()
    this.getBrands()

    if (window.location.href !== route('shopper.catalogue.products.create').template) {
      let element = document.getElementById('product-form')
      this.getRecord()
      this.getProducts(element.getAttribute('data-id'))
      this.getRelatedProducts(element.getAttribute('data-id'))
      this.getOffers(element.getAttribute('data-id'))
    }
  }

  getCategories() {
    axios
      .get(route('shopper.catalogue.categories.list'))
      .then((response) => {
        this.setState({options: response.data})
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  additionnalCategories(id) {
    if (id === null) {
      axios
        .get(route('shopper.catalogue.categories.list'))
        .then((response) => {
          let categories = []
          response.data.map((category, idx) => categories.push(category.name))
          this.setState({categories: categories})
        })
        .catch((error) => {
          Message.error(error.response.data.message)
        })
    } else {
      axios
        .get(route('shopper.catalogue.categories.list', {id: parseInt(id)}))
        .then((response) => {
          let categories = []
          response.data.map((category, idx) => categories.push(category.name))
          this.setState({categories: categories})
        })
        .catch((error) => {
          Message.error(error.response.data.message)
        })
    }
  }

  getBrands() {
    axios
      .get(route('shopper.catalogue.brands.list'))
      .then((response) => {
        this.setState({brands: response.data})
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  getProducts(id) {
    axios
      .get(route('shopper.catalogue.products.list', {id: parseInt(id)}))
      .then((response) => {
        this.setState({products: response.data})
      })
      .catch((error) => {})
  }

  getRelatedProducts(id) {
    this.setState({loadingRelatedProducts: true})

    axios
      .get(route('shopper.catalogue.products.relatedProducts', {id: parseInt(id)}))
      .then((response) => {
        this.setState({
          loadingRelatedProducts: false,
          relatedProducts: response.data
        })
      })
      .catch((error) => {
        this.setState({loadingRelatedProducts: false})
        Message.error(error.response.data.message)
      })
  }

  getRecord() {
    let element = document.getElementById('product-form')

    this.setState({
      isCreate: false,
      loading: true,
      loadingOffers: true,
      disabledOffer: false
    })

    axios
      .get(route('shopper.catalogue.products.show', {id: parseInt(element.getAttribute('data-id'))}))
      .then((response) => {
        let data = response.data, additionnalsCategories = []
        // Set a preview image if is not null
        if (data.imageUrl !== null) {
          this.setState({imageUrl: data.imageUrl})
        }

        this.additionnalCategories(data.record.category_id)
        if (data.record.category_id !== null) {
          // foreach additionnal categories
          // update additionnal categories array with category name
          data.record.categories.map((category, idx) => {
            additionnalsCategories.push(category.name)
          })

          this.setState({
            checkedCategories: additionnalsCategories,
            form: Object.assign({}, this.state.form, { additionnalsCategories: additionnalsCategories }),
            displayAdditionalCategories: true
          })
        }

        this.setState({
          form: Object.assign(this.state.form, data.record),
          offers: data.record.offers,
          loading: false,
          loadingOffers: false
        })
      })
      .catch((error) => {
        this.setState({loading: false})
        Message.error(error.response.data.message)
      })
  }

  getOffers(id) {
    this.setState({loadingOffers: true})

    axios
      .get(route('shopper.catalogue.offers.list', {product_id: parseInt(id)}))
      .then((response) => {
        this.setState({
          loadingOffers: false,
          offers: response.data
        })
      })
      .catch((error) => {
        this.setState({loadingOffers: false})
        Message.error(error.response.data.message)
      })
  }

  updateForm(id) {
    axios
      .put(route('shopper.catalogue.products.update', {id: parseInt(id)}), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.catalogue.products.index')
        }, 1500)
      })
      .catch((error) => {
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

        this.setState({loader: false})
      })
  }

  postForm() {
    axios
      .post(route('shopper.catalogue.products.store'), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.catalogue.products.index')
        }, 1500)
      })
      .catch((error) => {
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

        this.setState({loader: false})
      })
  }

  postFormOffer(id) {
    axios
      .post(route('shopper.catalogue.offers.store', {product_id: parseInt(id)}), this.state.offerForm)
      .then((response) => {
        this.hideModal()
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })
        this.getOffers(id)
        this.refs.offerForm.resetFields()
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  updateFormOffer(id) {
    let element = document.getElementById('product-form')

    axios
      .put(route('shopper.catalogue.offers.update', {id: parseInt(id)}), this.state.offerForm)
      .then((response) => {
        this.hideModal()
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })
        this.getOffers(element.getAttribute('data-id'))
        this.refs.offerForm.resetFields()
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  onSubmit(e) {
    e.preventDefault()
    let element = document.getElementById('product-form')

    this.refs.form.validate((valid) => {
      if (valid) {
        this.setState({loader: true})

        if (window.location.href === route('shopper.catalogue.products.create').template) {
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

  onOfferSubmit(e) {
    e.preventDefault()
    let element = document.getElementById('product-form')

    this.refs.offerForm.validate((valid) => {
      if (valid) {
        if (this.state.currentOffer === null) {
          this.postFormOffer(element.getAttribute('data-id'))
        } else {
          this.updateFormOffer(this.state.currentOffer.id)
        }
      } else {
        Message.error('Invalid form, check your form please !')
        return false
      }
    })
  }

  handleReset(e) {
    e.preventDefault()

    this.hideModal()
    this.refs.offerForm.resetFields()
  }

  showModal() {
    this.refs.offerForm.resetFields()
    this.setState({
      currentOffer: null,
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

  showAddProductModal() {
    this.setState({visibleProduct: true})
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

  onOfferFormChange(key, value) {
    this.setState({
      offerForm: Object.assign({}, this.state.offerForm, { [key]: value })
    })
  }

  beforePreviewImageUpload(file) {
    const validFormat = ['image/png', 'image/jpg', 'image/jpeg']
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!validFormat.includes(file.type)) {
      Message.error('Preview Image must be valid image format (png, jpg, jpeg)!');
    }

    if (!isLt2M) {
      Message.error('Preview picture size can not exceed 2MB!');
    }

    return true;
  }

  handleRemove(file, fileList) {
    this.setState({
      imageUrl: '',
    })
  }

  uploadFile(option) {
    const formData = new FormData()
    formData.append(option.filename, option.file)
    formData.append('field', 'preview_image')
    formData.append('model', 'product')

    axios
      .post(option.action, formData)
      .then((response) => {
        this.setState({
          imageUrl: response.data.url,
          form: Object.assign({}, this.state.form, { preview_image: response.data.id })
        })
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  onCellClick(row, column, cell, event) {
    if (!cell.getAttribute('class').includes('selection')) {
      this.setState({
        currentOffer: row,
        offerForm: Object.assign(this.state.offerForm, row),
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
    let element = document.getElementById('product-form')

    if (this.state.selected.length > 0) {
      let ids = [], records = this.state.selected

      records.map((record, index) => ids.push(record.id))

      axios
        .delete(route('shopper.catalogue.offers.destroy', {id: ids}))
        .then((response) => {
          this.hideModalDelete()
          Notification({
            title: response.data.title,
            message: response.data.message,
            type: response.data.status
          })
          this.getOffers(element.getAttribute('data-id'))
        })
        .catch((error) => {
          Message.error(error.response.data.message)
        })
    }
  }

  removeSelectedProducts() {
    let element = document.getElementById('product-form')

    if (this.state.selectedProducts.length > 0) {
      let ids = [], records = this.state.selectedProducts

      records.map((record, index) => ids.push(record.id))

      axios
        .delete(route('shopper.catalogue.products.removeRelatedProducts', {id: ids, product_id: parseInt(element.getAttribute('data-id'))}))
        .then((response) => {
          this.setState({confirmRemoveProduct: false})
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

  onRelatedProductCellClick(row, column, cell, event) {
    if (!cell.getAttribute('class').includes('selection')) {
      window.location = route('shopper.catalogue.products.edit', {id: parseInt(row.id)})
    }
  }

  onRelatedProductSelect(selection) {
    if (selection.length > 0) {
      this.setState({
        disabledProductRemove: false,
        selectedProducts: selection
      })
    } else {
      this.setState({
        disabledProductRemove: true,
        selectedProducts: selection
      })
    }
  }

  onProductSelect(selection) {
    if (selection.length > 0) {
      this.setState({
        disabledAdd: false,
        productIds: selection
      })
    } else {
      this.setState({
        disabledAdd: true,
        productIds: selection
      })
    }
  }

  addSelectedProducts() {
    let element = document.getElementById('product-form')

    if (this.state.productIds.length > 0) {
      let ids = [], records = this.state.productIds
      records.map((record, index) => ids.push(record.id))

      axios
        .get(route('shopper.catalogue.products.setRelatedProducts', {id: ids, product_id: parseInt(element.getAttribute('data-id'))}))
        .then((response) => {
          this.setState({visibleProduct: false})
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

  handleCheckAllChange(checked) {
    const checkedCategories = checked ? this.state.categories : []

    this.setState({
      isIndeterminate: false,
      checkAll: checked,
      checkedCategories: checkedCategories,
      form: Object.assign({}, this.state.form, { additionnalsCategories: checkedCategories })
    });
  }

  handleCheckedCategoriesChange(value) {
    const checkedCount = value.length
    const categoriesLength = this.state.categories.length

    this.setState({
      checkedCategories: value,
      checkAll: checkedCount === categoriesLength,
      isIndeterminate: checkedCount > 0 && checkedCount < categoriesLength,
      form: Object.assign({}, this.state.form, { additionnalsCategories: value })
    })
  }

  render() {
    const { imageUrl } = this.state
    let componentConfig = this.componentConfig, djsConfig = this.djsConfig, eventHandlers = this.uploadEvents

    return (
      <div className="products">
        <Form
          className='layout'
          ref='form'
          model={this.state.form}
          rules={this.state.rules}
          labelWidth='120'
          labelPosition='top'
          onSubmit={this.onSubmit.bind(this)}
        >
          {(this.state.hasError === true) ? <Alert title={this.trans.get('Error')} type="error" description={this.state.errors} showIcon={true} /> : ''}
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
                <Tabs.Pane label={this.trans.get('Settings')} name='1'>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <Layout.Row gutter="20">
                        <Layout.Col span="24">
                          <Form.Item label={this.trans.get('Category')}>
                            <Select
                              value={this.state.form.category_id}
                              clearable={true}
                              filterable={true}
                              onChange={this.onChange.bind(this, 'category_id')}
                            >
                              {
                                this.state.options.map(el => {
                                  return <Select.Option key={el.id} label={el.name} value={el.id} />
                                })
                              }
                            </Select>
                          </Form.Item>
                        </Layout.Col>
                      </Layout.Row>
                      <Layout.Row gutter="20">
                        <Layout.Col span="24">
                          <Form.Item label={this.trans.get('Brand')}>
                            <Select
                              value={this.state.form.brand_id}
                              clearable={true}
                              filterable={true}
                              onChange={this.onChange.bind(this, 'brand_id')}
                            >
                              {
                                this.state.brands.map(el => {
                                  return <Select.Option key={el.id} label={el.name} value={el.id} />
                                })
                              }
                            </Select>
                          </Form.Item>
                        </Layout.Col>
                      </Layout.Row>
                      <Layout.Row gutter="20">
                        <Layout.Col span="24">
                          <Form.Item label={this.trans.get('Sku')} prop='code'>
                            <Input type='text' value={this.state.form.code} onChange={this.onChange.bind(this, 'code')} autoComplete='off' />
                          </Form.Item>
                        </Layout.Col>
                      </Layout.Row>
                    </Layout.Col>
                    {
                      (this.state.isCreate !== true && this.state.displayAdditionalCategories === true) ?
                        <Layout.Col span="12">
                          <label className="el-form-item__label">{this.trans.get('Additionnal categories')}</label>
                          <Card className="box-card">
                            <Checkbox
                              checked={this.state.checkAll}
                              indeterminate={this.state.isIndeterminate}
                              onChange={this.handleCheckAllChange.bind(this)}
                            >Check all</Checkbox>
                            <div style={{margin: '15px 0'}} />
                            <Checkbox.Group
                              value={this.state.checkedCategories}
                              onChange={this.handleCheckedCategoriesChange.bind(this)}
                            >
                            {
                              this.state.categories.map((category, index) =>
                                <Checkbox key={index} label={category}/>
                              )
                            }
                            </Checkbox.Group>
                          </Card>
                        </Layout.Col>
                      : ''
                    }
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
                          height='350px'
                        />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                </Tabs.Pane>
                <Tabs.Pane label='Images' name='3'>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <span className="image-preview">{this.trans.get('Preview Image')}</span>
                      <Upload
                        action={route('shopper.media.uploader').template}
                        className="preview-uploader"
                        beforeUpload={(file) => this.beforePreviewImageUpload(file)}
                        onRemove={(file, fileList) => this.handleRemove(file, fileList)}
                        limit={1}
                        httpRequest={(option) => this.uploadFile(option)}
                      >
                        { imageUrl ? <img src={imageUrl} className="avatar" /> : <i className="el-icon-plus avatar-uploader-icon"/> }
                      </Upload>
                    </Layout.Col>
                  </Layout.Row>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <span className="image-preview">Images (gallery)</span>
                      <DropzoneComponent config={componentConfig} djsConfig={djsConfig} eventHandlers={eventHandlers} />
                    </Layout.Col>
                  </Layout.Row>
                </Tabs.Pane>
                <Tabs.Pane label={this.trans.get('Offers')} name='4' disabled={this.state.isCreate}>
                  <div className="offer-actions">
                    <Button
                      type="primary"
                      icon="plus"
                      size="small"
                      onClick={this.showModal.bind(this)}
                    >{this.trans.get('Create Offer')}</Button>
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
                      data={this.state.offers}
                      stripe={true}
                      height={250}
                      emptyText={this.trans.get('No Offers')}
                      onSelectChange={this.onSelect.bind(this)}
                      onCellClick={this.onCellClick.bind(this)}
                    />
                  </Loading>
                </Tabs.Pane>
                <Tabs.Pane label={this.trans.get('Related Products')} name='5' disabled={this.state.isCreate}>
                  <div className="products-actions m-b-sm">
                    <Button
                      type="primary"
                      icon="plus"
                      size="small"
                      onClick={this.showAddProductModal.bind(this)}
                    >{this.trans.get('Add Product')}</Button>
                    <Button
                      type="danger"
                      icon="delete"
                      size='small'
                      disabled={this.state.disabledProductRemove}
                      onClick={() => this.setState({confirmRemoveProduct: true})}
                    >Deleted</Button>
                  </div>
                  <Loading text={this.trans.get('Loading Related Products...')} loading={this.state.loadingRelatedProducts}>
                    <Table
                      style={{width: '100%'}}
                      columns={this.state.productsColumns}
                      data={this.state.relatedProducts}
                      stripe={true}
                      height={250}
                      emptyText={this.trans.get('No Related Products')}
                      onSelectChange={this.onRelatedProductSelect.bind(this)}
                      onCellClick={this.onRelatedProductCellClick.bind(this)}
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
            <a href={route('shopper.catalogue.products.index')}>{this.trans.get('Cancel')}</a>
          </div>
        </Form>
        <Rodal
          visible={this.state.visible}
          onClose={this.hideModal.bind(this)}
          animation='slideDown'
          className='rodal-modal rodal-default'
          height={450}
          width={750}
        >
          <div className='modal-data'>
            <div className='header'>
              <h6>
                {(this.state.currentOffer !== null) ? this.trans.get('Update Offer'): this.trans.get('Create Offer')}
              </h6>
            </div>
            <Loading text={this.trans.get('Loading Offer data...')} loading={this.state.offerLoadingForm}>
              <div className='body'>
                <Form
                  className='layout'
                  ref='offerForm'
                  model={this.state.offerForm}
                  rules={this.state.offerRules}
                  labelWidth='120'
                  labelPosition='top'
                  onSubmit={this.onOfferSubmit.bind(this)}
                >
                  <Form.Item prop='active'>
                    <Switch
                      value={this.state.offerForm.active}
                      onColor='#13ce66'
                      offColor='#ff4949'
                      onValue={1}
                      offValue={0}
                      onChange={this.onOfferFormChange.bind(this, 'active')}
                    >
                    </Switch>
                    <span className='active-label'>{this.trans.get('Active')}</span>
                  </Form.Item>
                  <Layout.Row gutter='20'>
                    <Layout.Col span='12'>
                      <Form.Item label={this.trans.get('Name')} prop='name'>
                        <Input type='text' value={this.state.offerForm.name} onChange={this.onOfferFormChange.bind(this, 'name')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                    <Layout.Col span='12'>
                      <Form.Item label={this.trans.get('Code')} prop='code'>
                        <Input type='text' value={this.state.offerForm.code} onChange={this.onOfferFormChange.bind(this, 'code')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                  <Layout.Row gutter='20'>
                    <Layout.Col span='12'>
                      <Form.Item label={this.trans.get('Price')} prop='price'>
                        <Input type='text' value={this.state.offerForm.price} onChange={this.onOfferFormChange.bind(this, 'price')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                    <Layout.Col span='12'>
                      <Form.Item label={this.trans.get('Old Price')} prop='old_price'>
                        <Input type='text'  value={this.state.offerForm.old_price} onChange={this.onOfferFormChange.bind(this, 'old_price')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                  <Layout.Row gutter='20'>
                    <Layout.Col span='12'>
                      <Form.Item label={this.trans.get('Quantity')} prop='quantity'>
                        <Input type='text' value={this.state.offerForm.quantity} onChange={this.onOfferFormChange.bind(this, 'quantity')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                  <div className="text-right">
                    <Button nativeType="submit" type="primary">
                      {(this.state.currentOffer !== null) ? this.trans.get('Update') : this.trans.get('Create')}
                    </Button>
                    <Button onClick={this.handleReset.bind(this)}>{this.trans.get('Cancel')}</Button>
                  </div>
                </Form>
              </div>
            </Loading>
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
        <Rodal
          visible={this.state.visibleProduct}
          onClose={() => this.setState({visibleProduct: false})}
          animation='slideDown'
          className='rodal-modal rodal-default'
          height={450}
          width={900}
        >
          <div className='modal-data'>
            <h4 className='wrapper-md'>{this.trans.get('Add Product')}</h4>
            <div>
              <Table
                style={{width: '100%'}}
                columns={this.state.productsColumns}
                data={this.state.products}
                height={310}
                emptyText={this.trans.get('No products')}
                onSelectChange={this.onProductSelect.bind(this)}
              />
            </div>
            <div className="text-right wrapper-md">
              <Button onClick={this.addSelectedProducts.bind(this)} type="primary" disabled={this.state.disabledAdd}>{this.trans.get('Add Selected')}</Button>
              <Button onClick={() => this.setState({visibleProduct: false})}>{this.trans.get('Cancel')}</Button>
            </div>
          </div>
        </Rodal>
      </div>
    )
  }
}

if (document.getElementById('product-form')) {
  ReactDOM.render(<ProductForm />, document.getElementById('product-form'))
}
