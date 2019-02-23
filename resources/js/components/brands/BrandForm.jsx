import React from 'react'
import ReactDOM from 'react-dom'
import Loader from 'react-loaders'
import DropzoneComponent from 'react-dropzone-component'
import {
  Input,
  Form,
  Switch,
  Layout,
  Tabs,
  Upload,
  Message,
  Notification,
  Alert,
  Loading
} from 'element-react'

import rules from './validation'
import fields from './fields'
import TextEditor from '../TextEditor'
import slug from '../../helpers/slugify'
import ShopperComponent from '../ShopperComponent'

export default class BrandForm extends ShopperComponent {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      loading: false,
      isCreate: true,
      hasError: false,

      imageUrl: '',
      errors: '',

      form: fields,
      rules: rules,

      fileList: []
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

    this.getRecord = this.getRecord.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
    this.beforePreviewImageUpload = this.beforePreviewImageUpload.bind(this)
  }

  componentDidMount() {
    if (window.location.href !== route('shopper.catalogue.brands.create').template) {
      this.getRecord()
    }
  }

  getRecord() {
    let element = document.getElementById('brand-form')
    this.setState({
      isCreate: false,
      loading: true
    })

    axios
      .get(route('shopper.catalogue.brands.show', {id: parseInt(element.getAttribute('data-id'))}))
      .then((response) => {
        let data = response.data
        // Set a preview image if is not null
        if (data.imageUrl !== null) {
          this.setState({imageUrl: data.imageUrl})
        }

        this.setState({
          form: Object.assign(this.state.form, data.record),
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
      .put(route('shopper.catalogue.brands.update', {id: parseInt(id)}), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.catalogue.brands.index')
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
      .post(route('shopper.catalogue.brands.store'), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.catalogue.brands.index')
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

  onSubmit(e) {
    e.preventDefault()
    let element = document.getElementById('brand-form')

    this.refs.form.validate((valid) => {
      if (valid) {
        this.setState({loader: true})

        if (window.location.href === route('shopper.catalogue.brands.create').template) {
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
    formData.append('model', 'brand')

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

  render() {
    const { imageUrl } = this.state
    let componentConfig = this.componentConfig, djsConfig = this.djsConfig, eventHandlers = this.uploadEvents

    return (
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
                    <Form.Item label={this.trans.get('Sku')} prop='code'>
                      <Input type='text' value={this.state.form.code} onChange={this.onChange.bind(this, 'code')} autoComplete='off' />
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
                      { imageUrl ? <img src={imageUrl} className="previw_image" /> : <i className="el-icon-plus avatar-uploader-icon"/> }
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
            </Tabs>
          </Loading>
        </div>
        <div className="wrapper-md buttons-actions">
          <button className="btn btn-primary" type="submit" disabled={(this.state.loader === true)}>
            {(this.state.loader === true) ? <Loader type="ball-beat" /> : ((this.state.isCreate === true) ? this.trans.get('Create') : this.trans.get('Save')) }
          </button>
          <span>{this.trans.get('Or')}</span>
          <a href={route('shopper.catalogue.brands.index')}>{this.trans.get('Cancel')}</a>
        </div>
      </Form>
    )
  }
}

if (document.getElementById('brand-form')) {
  ReactDOM.render(<BrandForm />, document.getElementById('brand-form'))
}
