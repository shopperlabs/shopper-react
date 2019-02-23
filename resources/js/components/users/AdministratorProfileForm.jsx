import React from 'react'
import ReactDOM from 'react-dom'
import Loader from 'react-loaders'
import {
  Input,
  Form,
  Layout,
  Tabs,
  Upload,
  Message,
  Notification,
  Alert,
  Loading
} from 'element-react'

import adminFields from './adminFields'
import ShopperComponent from '../ShopperComponent'

export default class AdministratorProfileForm extends ShopperComponent {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      loading: false,
      rolesLoading: false,
      isCreate: true,
      hasError: false,

      errors: '',
      imageUrl: '',

      form: adminFields,
      rules: {
        login: [
          { required: true, message: 'Please login is required', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please user email is required', trigger: 'blur' },
          { type: 'email', message: 'Please correct email address', trigger: 'blur,change' }
        ],
        password: [
          { validator: (rule, value, callback) => {
              if (this.state.form.checkPass !== '') {
                this.refs.form.validateField('checkPass')
              }
              callback()
            }
          }
        ],
        checkPass: [
          { validator: (rule, value, callback) => {
              if (value !== this.state.form.password) {
                callback(new Error('The two password don\'t match!'))
              } else {
                callback()
              }
            }
          }
        ],
      }
    }

    this.getRecord = this.getRecord.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
    this.beforePreviewImageUpload = this.beforePreviewImageUpload.bind(this)
  }

  componentDidMount() {
    this.getRecord()
  }

  getRecord() {
    let element = document.getElementById('administrator-profile-form')
    this.setState({
      isCreate: false,
      loading: true
    })

    axios
      .get(route('shopper.settings.backend.users.show', {id: parseInt(element.getAttribute('data-id'))}))
      .then((response) => {
        let data = response.data
        this.setState({
          form: Object.assign(this.state.form, data.record),
          imageUrl: data.imageUrl,
          loading: false
        })
      })
      .catch((error) => {
        this.setState({loading: false})
        Message.error(error.response.data.message)
      })
  }

  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    })
  }

  onSubmit(e) {
    e.preventDefault()

    this.refs.form.validate((valid) => {
      if (valid) {
        this.setState({loader: true})
        this.postForm()
      } else {
        Message.error('Invalid form, check your form please !')
        return false
      }
    })
  }

  postForm() {
    axios
      .put(route('shopper.settings.backend.users.saveProfile'), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.settings.backend.users.profile')
        }, 1500)
      })
      .catch((error) => {
        this.setState({loader: false})
        Message.error(error.response.data.message)
        let errors = error.response.data.errors, loginMessage = '', emailMessage = ''

        if (error.response.data.errors !== undefined) {
          if (errors.login !== undefined) {
            errors.login.map((err, index) => { loginMessage = err})
          }

          if (errors.email !== undefined) {
            errors.email.map((er, index) => { emailMessage = er})
          }

          let errorList = `- ${emailMessage} - ${loginMessage}`
          this.setState({
            hasError: true,
            errors: errorList
          })
        }
      })
  }

  beforePreviewImageUpload(file) {
    const validFormat = ['image/png', 'image/jpg', 'image/jpeg']
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!validFormat.includes(file.type)) {
      Message.error('Avatar must be valid image format (png, jpg, jpeg)!');
    }

    if (!isLt2M) {
      Message.error('Preview picture size can not exceed 2MB!');
    }

    return true;
  }

  handleRemove(file, fileList) {
    this.setState({
      imageUrl: '',
      form: Object.assign({}, this.state.form, { image_id: null })
    })
  }

  uploadFile(option) {
    const formData = new FormData()
    formData.append(option.filename, option.file)
    formData.append('field', 'preview_image')

    axios
      .post(option.action, formData)
      .then((response) => {
        this.setState({
          imageUrl: response.data.url,
          form: Object.assign({}, this.state.form, { image_id: response.data.id })
        })
      })
      .catch((error) => {
        Message.error(error.response.data.message)
      })
  }

  render() {
    const { imageUrl } = this.state

    return (
      <div className="administrators" style={{marginTop: '50px'}}>
        {(this.state.hasError === true) ? <Alert onClose={() => this.setState({hasError: false})} title={this.trans.get('Error')} type="error" description={this.state.errors} showIcon={true} /> : ''}
        <p style={{marginTop: '20px'}}/>
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
                <Tabs.Pane label='Account' name='1'>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('Username')} prop='login'>
                        <Input type='text' value={this.state.form.login} onChange={this.onChange.bind(this, 'login')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('E-Mail Address')} prop='email'>
                        <Input value={this.state.form.email} onChange={this.onChange.bind(this, 'email')} autoComplete='off' />
                      </Form.Item>
                    </Layout.Col>
                  </Layout.Row>
                  <Layout.Row gutter="20">
                    <Layout.Col span="12">
                      <Form.Item label={this.trans.get('First Name')} prop='first_name'>
                        <Input type='text' value={this.state.form.first_name} onChange={this.onChange.bind(this, 'first_name')} autoComplete='off' />
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
                <Tabs.Pane label='Image' name='3'>
                  <Layout.Row gutter="20">
                    <Layout.Col span="8">
                      <span className="image-preview">Avatar</span>
                      <Upload
                        action={route('shopper.media.uploader').template}
                        className="preview-uploader"
                        beforeUpload={(file) => this.beforePreviewImageUpload(file)}
                        onRemove={(file, fileList) => this.handleRemove(file, fileList)}
                        limit={1}
                        httpRequest={(option) => this.uploadFile(option)}
                      >
                        { imageUrl ? <img src={imageUrl} className="previw_image" /> : <i className="el-icon-plus avatar-uploader-icon"></i> }
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
            <a href={route('shopper.settings.backend.users.index')}>{this.trans.get('Cancel')}</a>
          </div>
        </Form>
      </div>
    )
  }
}

if (document.getElementById('administrator-profile-form')) {
  ReactDOM.render(<AdministratorProfileForm />, document.getElementById('administrator-profile-form'))
}
