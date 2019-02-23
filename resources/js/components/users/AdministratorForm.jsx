import React from 'react'
import ReactDOM from 'react-dom'
import Loader from 'react-loaders'
import {
  Input,
  Form,
  Switch,
  Layout,
  Tabs,
  Upload,
  Checkbox,
  Message,
  Radio,
  Notification,
  Alert,
  Loading
} from 'element-react'

import adminFields from './adminFields'
import ShopperComponent from '../ShopperComponent'

export default class AdministratorForm extends ShopperComponent {
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

      roles: []
    }

    this.getRecord = this.getRecord.bind(this)
    this.getRoles = this.getRoles.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
    this.beforePreviewImageUpload = this.beforePreviewImageUpload.bind(this)
  }

  componentDidMount() {
    this.getRoles()
    if (window.location.href !== route('shopper.settings.backend.users.create').template) {
      this.getRecord()
    }
  }

  getRecord() {
    let element = document.getElementById('administrator-form')
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

  getRoles() {
    this.setState({rolesLoading: true})
    axios
      .get(route('shopper.settings.backend.roles.list'))
      .then((response) => {
        this.setState({
          roles: response.data,
          rolesLoading: false
        })
      })
      .catch((error) => {
        this.setState({rolesLoading: false})
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
    let element = document.getElementById('administrator-form')

    this.refs.form.validate((valid) => {
      if (valid) {
        this.setState({loader: true})

        if (window.location.href === route('shopper.settings.backend.users.create').template) {
          this.postForm()
        } else {
          this.updateForm(element.getAttribute('data-id'))
        }
      } else {
        Message.error('Invalid form, check your form please !')
        window.scrollTo({
          "behavior": "smooth",
          "left": 0,
          "top": 0
        })

        return false
      }
    })
  }

  postForm() {
    axios
      .post(route('shopper.settings.backend.users.store'), this.state.form)
      .then((response) => {
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.settings.backend.users.index')
        }, 1500)
      })
      .catch((error) => {
        this.setState({loader: false})
        Message.error(error.response.data.message)
        let errors = error.response.data.errors,
          loginMessage = '', emailMessage = '', roleMessage = '', errorList = ''

        if (error.response.data.errors !== undefined) {
          if (errors.login !== undefined) {
            errors.login.map((err, index) => { loginMessage = err})
            errorList += ' - ' + loginMessage
          }

          if (errors.email !== undefined) {
            errors.email.map((er, index) => { emailMessage = er})
            errorList += ' - ' + emailMessage
          }

          if (errors.role !== undefined) {
            errors.role.map((er, index) => { roleMessage = er})
            errorList += ' - ' + roleMessage
          }

          this.setState({
            hasError: true,
            errors: errorList
          })

          window.scrollTo({
            "behavior": "smooth",
            "left": 0,
            "top": 0
          })
        }
      })
  }

  updateForm(id) {
    axios
      .put(route('shopper.settings.backend.users.update', {id: parseInt(id)}), this.state.form)
      .then((response) => {
        console.log(response.data)
        this.setState({loader: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })

        setInterval(function() {
          window.location = route('shopper.settings.backend.users.index')
        }, 1500)
      })
      .catch((error) => {
        this.setState({loader: false})
        Message.error(error.response.data.message)
        let errors = error.response.data.errors,
          loginMessage = '', emailMessage = '', roleMessage = '', errorList = ''

        if (error.response.data.errors !== undefined) {
          if (errors.login !== undefined) {
            errors.login.map((err, index) => { loginMessage = err})
            errorList += ' - ' + loginMessage
          }

          if (errors.email !== undefined) {
            errors.email.map((er, index) => { emailMessage = er})
            errorList += ' - ' + emailMessage
          }

          if (errors.role !== undefined) {
            errors.role.map((er, index) => { roleMessage = er})
            errorList += ' - ' + roleMessage
          }

          this.setState({
            hasError: true,
            errors: errorList
          })

          window.scrollTo({
            "behavior": "smooth",
            "left": 0,
            "top": 0
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
      <div className="administrators">
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
                <Form.Item prop='is_superuser'>
                  <Switch
                    value={this.state.form.is_superuser}
                    onColor='#13ce66'
                    offColor='#ff4949'
                    onValue={1}
                    offValue={0}
                    onChange={this.onChange.bind(this, 'is_superuser')}
                  >
                  </Switch>
                  <span className='active-label'>{this.trans.get('Super User')}</span>
                  <p className='help-block'>{this.trans.get('Grants this account unlimited access to all areas of the system. Super users can add and manage other users.')}</p>
                </Form.Item>
              </div>
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
                  <Form.Item label={this.trans.get('Roles')} prop='role'>
                    <p className="help-block">{this.trans.get('Roles define user permissions, which can be overriden on the user level, on the Permissions tab (coming soon).')}</p>
                    <Loading text={this.trans.get('Loading Roles...')} loading={this.state.rolesLoading}>
                      <Radio.Group value={this.state.form.role} onChange={this.onChange.bind(this, 'role')}>
                        {
                          this.state.roles.map(role => {
                            return <Radio key={role.id} value={role.id}>{role.name}</Radio>
                          })
                        }
                      </Radio.Group>
                    </Loading>
                  </Form.Item>
                  {
                    (this.state.isCreate === true) ?
                      <Form.Item prop='send_mail'>
                        <Checkbox.Group value={this.state.form.send_mail} onChange={this.onChange.bind(this, 'send_mail')}>
                          <Checkbox name='send_mail' label='send'>{this.trans.get('Send invitation by email')}</Checkbox>
                        </Checkbox.Group>
                        <p className="help-block">{this.trans.get('Sends a welcome message containing email and password information.')}</p>
                      </Form.Item>
                      :
                      ''
                  }
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

if (document.getElementById('administrator-form')) {
  ReactDOM.render(<AdministratorForm />, document.getElementById('administrator-form'))
}
