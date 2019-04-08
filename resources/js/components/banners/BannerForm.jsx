import React from 'react'
import ReactDOM from 'react-dom'
import Loader from 'react-loaders'
import {
  Input,
  Form,
  Select,
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
import ShopperComponent from '../ShopperComponent'

export default class BannerForm extends ShopperComponent {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      loading: false,
      isCreate: true,
      hasError: false,
      showInput: false,
      showInputUrl: false,
      showInputRoutename: false,

      imageUrl: '',
      backgroundImageUrl: '',
      errors: '',

      form: fields,
      rules: rules,

      sizes: [],
      results: [],
    }

    this.getRecord = this.getRecord.bind(this)
    this.getSizes = this.getSizes.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
    this.beforePreviewImageUpload = this.beforePreviewImageUpload.bind(this)
  }

  componentDidMount() {
    this.getSizes()

    if (window.location.href !== route('shopper.catalogue.banners.create').template) {
      this.getRecord()
    }
  }

  getSizes() {
    axios
      .get(route('shopper.catalogue.sizes.list'))
      .then((response) => {
        this.setState({sizes: response.data})
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  getRecord() {
    let element = document.getElementById('banner-form')

    this.setState({
      isCreate: false,
      loading: true,
    })

    axios
      .get(route('shopper.catalogue.banners.show', {id: parseInt(element.getAttribute('data-id'))}))
      .then((response) => {
        let data = response.data
        // Set a preview image if is not null
        if (data.imageUrl !== null) {
          this.setState({imageUrl: data.imageUrl})
        }

        if (data.backgroundImageUrl !== null) {
          this.setState({backgroundImageUrl: data.backgroundImageUrl})
        }

        this.setState({
          form: Object.assign(this.state.form, data.record),
          loading: false,
        })
      })
      .catch((error) => {
        this.setState({loading: false})
        Message.error(error.response.data.message)
      })

    switch (this.state.form.link_type) {
      case 'none':
        this.setState({
          results: [],
          showInput: false,
          showInputUrl: false,
          showInputRoutename: false,
        })
        break
      case 'product':
        let entries = []
        axios
          .get(route('shopper.catalogue.products.list'))
          .then(response => {
            response.data.map(result => {
              let product = {
                id: result.id,
                name: result.name,
                url: result.slug
              }
              entries.push(product)
            })
            this.setState({results: entries})
          })
          .catch(error => {
            Message.error(error.response.data.message)
          })

        this.setState({
          showInput: true,
          showInputUrl: false,
          showInputRoutename: false,
        })
        break
      case 'web_route':
        this.setState({
          showInputRoutename: true,
          showInput: false,
          showInputUrl: false,
        })
        break
      case 'full_url':
        this.setState({
          showInput: false,
          showInputUrl: true,
          showInputRoutename: false,
        })
        break
    }
  }

  onChange(key, value) {
    if (key === 'link_type') {
      switch (value) {
        case 'none':
          this.setState({
            results: [],
            showInput: false,
            showInputUrl: false,
            showInputRoutename: false,
          })
          break
        case 'product':
          let data = []
          axios
            .get(route('shopper.catalogue.products.list'))
            .then(response => {
              response.data.map(result => {
                let product = {
                  id: result.id,
                  name: result.name,
                  url: result.slug
                }
                data.push(product)
              })
              this.setState({results: data})
            })
            .catch(error => {
              Message.error(error.response.data.message)
            })

          this.setState({
            showInput: true,
            showInputUrl: false,
            showInputRoutename: false,
          })
          break
        case 'web_route':
          this.setState({
            showInputRoutename: true,
            showInput: false,
            showInputUrl: false,
          })
          break
        case 'full_url':
          this.setState({
            showInput: false,
            showInputUrl: true,
            showInputRoutename: false,
          })
          break
      }
    }

    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    })
  }

  updateForm(id) {
    axios
      .put(route('shopper.catalogue.banners.update', {id: parseInt(id)}), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.catalogue.banners.index')
        }, 1500)
      })
      .catch((error) => {
        Message.error(error.response.data.message)
        let errors = error.response.data.errors, codeMessage = '', titleMessage = ''

        if (error.response.data.errors !== undefined) {
          if (errors.code !== undefined) {
            errors.code.map((err, index) => { codeMessage = err})
          }

          if (errors.title !== undefined) {
            errors.title.map((er, index) => { titleMessage = er})
          }

          let errorList = `- ${codeMessage} - ${titleMessage}`
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
      .post(route('shopper.catalogue.banners.store'), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.catalogue.banners.index')
        }, 1500)
      })
      .catch((error) => {
        Message.error(error.response.data.message)
        let errors = error.response.data.errors, codeMessage = '', titleMessage = ''

        if (error.response.data.errors !== undefined) {
          if (errors.code !== undefined) {
            errors.code.map((err, index) => { codeMessage = err})
          }

          if (errors.title !== undefined) {
            errors.title.map((er, index) => { titleMessage = er})
          }

          let errorList = `- ${codeMessage} - ${titleMessage}`
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
    let element = document.getElementById('banner-form')

    this.refs.form.validate((valid) => {
      if (valid) {
        this.setState({loader: true})

        if (window.location.href === route('shopper.catalogue.banners.create').template) {
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

  beforePreviewImageUpload(file) {
    const validFormat = ['image/png', 'image/jpg', 'image/jpeg']
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!validFormat.includes(file.type)) {
      Message.error('Image must be valid image format (png, jpg, jpeg)!');
    }

    if (!isLt2M) {
      Message.error('Picture size can not exceed 2MB!');
    }

    return true;
  }

  handleRemove(file, fileList, type) {
    if (type === 'image') {
      this.setState({
        imageUrl: '',
      })
    } else {
      this.setState({
        backgroundImageUrl: '',
      })
    }
  }

  uploadFile(option, type) {
    const formData = new FormData()
    formData.append(option.filename, option.file)
    formData.append('field', type)

    axios
      .post(option.action, formData)
      .then((response) => {
        if (type === 'image') {
          this.setState({
            imageUrl: response.data.url,
            form: Object.assign({}, this.state.form, { image: response.data.id })
          })
        } else {
          this.setState({
            backgroundImageUrl: response.data.url,
            form: Object.assign({}, this.state.form, { backgroundImage: response.data.id })
          })
        }
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  render() {
    const { imageUrl, backgroundImageUrl } = this.state

    return (
      <div className="banners">
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
                <Layout.Row gutter='20'>
                  <Layout.Col span='12'>
                    <Form.Item label={this.trans.get('Code')} prop='code'>
                      <Input type='text' value={this.state.form.code} onChange={this.onChange.bind(this, 'code')} autoComplete='off' />
                    </Form.Item>
                  </Layout.Col>
                </Layout.Row>
              </div>
              <Tabs activeName='1' type='card'>
                <Tabs.Pane label={this.trans.get('Informations')} name='1'>
                  <Layout.Row gutter='20'>
                    <Layout.Col span='12'>
                      <Form.Item label={this.trans.get('Title')} prop='title'>
                        <Input type='text' value={this.state.form.title} onChange={this.onChange.bind(this, 'title')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                    <Layout.Col span='12'>
                      <Form.Item label={this.trans.get('Subtitle')} prop='subtitle'>
                        <Input type='text' value={this.state.form.subtitle} onChange={this.onChange.bind(this, 'subtitle')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                  <Layout.Row gutter='20'>
                    <Layout.Col span='12'>
                      <Form.Item label={this.trans.get('Size')}>
                        <Select
                          value={this.state.form.size_id}
                          clearable={true}
                          filterable={true}
                          onChange={this.onChange.bind(this, 'size_id')}
                        >
                          {
                            this.state.sizes.map(size => {
                              return <Select.Option key={size.id} label={size.dimension} value={size.id} />
                            })
                          }
                        </Select>
                      </Form.Item>
                    </Layout.Col>
                    <Layout.Col span='12'>
                      <Form.Item label={this.trans.get('Text Position')} prop='text_position'>
                        <Select value={this.state.form.text_position} onChange={this.onChange.bind(this, 'text_position')}>
                          <Select.Option label={this.trans.get('None')} value="none" />
                          <Select.Option label={this.trans.get('Left')} value="left" />
                          <Select.Option label={this.trans.get('Right')} value="right" />
                          <Select.Option label={this.trans.get('Center')} value="center" />
                        </Select>
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                  <Layout.Row gutter='20'>
                    <Layout.Col span='12'>
                      <Form.Item label={this.trans.get('Price')} prop='price'>
                        <Input type='text' value={this.state.form.price} onChange={this.onChange.bind(this, 'price')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                    <Layout.Col span='12'>
                      <Form.Item label={this.trans.get('Button Text')} prop='button_text'>
                        <Input type='text' value={this.state.form.button_text} onChange={this.onChange.bind(this, 'button_text')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                  <Layout.Row gutter='20'>
                    <Layout.Col span='12'>
                      <Form.Item label={this.trans.get('Link Type')} prop='link_type'>
                        <Select value={this.state.form.text_position} onChange={this.onChange.bind(this, 'link_type')}>
                          <Select.Option label={this.trans.get('None')} value="none" />
                          <Select.Option label={this.trans.get('Shop Product')} value="product" />
                          <Select.Option label={this.trans.get('Web Route')} value="web_route" />
                          <Select.Option label={this.trans.get('Full url')} value="full_url" />
                        </Select>
                      </Form.Item>
                    </Layout.Col>
                    <Layout.Col span='12'>
                      <Form.Item label={this.trans.get('Button Icon')} prop='button_icon'>
                        <Input type='text' placeholder='Eg.: fas fa-arrow-right' value={this.state.form.button_icon} onChange={this.onChange.bind(this, 'button_icon')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                  {(this.state.showInput === true) ?
                    <Layout.Row gutter='20'>
                      <Layout.Col span='12'>
                        <Form.Item label={this.trans.get('Product Link URL')}>
                          <Select
                            value={this.state.form.link_url}
                            clearable={true}
                            filterable={true}
                            onChange={this.onChange.bind(this, 'link_url')}
                          >
                            {
                              this.state.results.map(result => {
                                return <Select.Option key={result.id} label={result.name} value={result.url} />
                              })
                            }
                          </Select>
                        </Form.Item>
                      </Layout.Col>
                    </Layout.Row>
                    : ''
                  }
                  {(this.state.showInputUrl === true) ?
                    <Layout.Row gutter='20'>
                      <Layout.Col span='12'>
                        <Form.Item label={this.trans.get('Full Link URL')}>
                          <Input type='text' placeholder='http://example.com' value={this.state.form.link_url} onChange={this.onChange.bind(this, 'link_url')} autoComplete='off' />
                        </Form.Item>
                      </Layout.Col>
                    </Layout.Row>
                    : ''
                  }
                  {(this.state.showInputRoutename === true) ?
                    <Layout.Row gutter='20'>
                      <Layout.Col span='12'>
                        <Form.Item label={this.trans.get('Website route name')}>
                          <Input type='text' placeholder='Route name. Eg: login for route(login)' value={this.state.form.link_url} onChange={this.onChange.bind(this, 'link_url')} autoComplete='off' />
                        </Form.Item>
                      </Layout.Col>
                    </Layout.Row>
                    : ''
                  }
                </Tabs.Pane>
                <Tabs.Pane label='Images' name='3'>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <span className="image-preview">{this.trans.get('Image')}</span>
                      <Upload
                        action={route('shopper.media.uploader').template}
                        className="preview-uploader"
                        beforeUpload={(file) => this.beforePreviewImageUpload(file)}
                        onRemove={(file, fileList) => this.handleRemove(file, fileList, 'image')}
                        limit={1}
                        httpRequest={(option) => this.uploadFile(option, 'image')}
                      >
                        { imageUrl ? <img src={imageUrl} className="avatar" /> : <i className="el-icon-plus avatar-uploader-icon"/> }
                      </Upload>
                    </Layout.Col>
                  </Layout.Row>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <span className="image-preview">Background Image</span>
                      <Upload
                        action={route('shopper.media.uploader').template}
                        className="preview-uploader"
                        beforeUpload={(file) => this.beforePreviewImageUpload(file)}
                        onRemove={(file, fileList) => this.handleRemove(file, fileList, 'backgroundImage')}
                        limit={1}
                        httpRequest={(option) => this.uploadFile(option, 'backgroundImage')}
                      >
                        { backgroundImageUrl ? <img src={backgroundImageUrl} className="avatar" /> : <i className="el-icon-plus avatar-uploader-icon"/> }
                      </Upload>
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
            <a href={route('shopper.catalogue.banners.index')}>{this.trans.get('Cancel')}</a>
          </div>
        </Form>
      </div>
    )
  }
}

if (document.getElementById('banner-form')) {
  ReactDOM.render(<BannerForm />, document.getElementById('banner-form'))
}
