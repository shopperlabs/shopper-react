import React from 'react'
import ReactDOM from 'react-dom'
import Rodal from 'rodal'
import {Notification, Loading, Message} from 'element-react'
import ShopperComponent from '../ShopperComponent'

export default class SocialShare extends ShopperComponent {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      visibleTwitter: false,
      loading: false,
      record: null
    }
  }

  componentDidMount() {
    this.getRecord()
  }

  getRecord() {
    let element = document.getElementById('product-form')

    axios
      .get(route('shopper.catalogue.products.show', {id: parseInt(element.getAttribute('data-id'))}))
      .then((response) => {
        this.setState({record: response.data.record})
      })
      .catch((error) => {})
  }

  publishOnFacebook() {
    this.setState({visible: true})
    axios
      .get(route('shopper.catalogue.product.facebook', {id: parseInt(this.state.record.id)}))
      .then((response) => {
        this.setState({visible: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })
      })
      .catch((error) => {
        this.setState({visible: false})
        Message.error(error.response.data.message)
      })
  }

  publishOnTwitter() {
    this.setState({visible: true})
    axios
      .get(route('shopper.catalogue.product.twitter', {id: parseInt(this.state.record.id)}))
      .then((response) => {
        this.setState({visible: false})
        Notification({
          title: response.data.title,
          message: response.data.message,
          type: response.data.status
        })
      })
      .catch((error) => {
        this.setState({visible: false})
        Message.error(error.response.data.message)
      })
  }

  render() {
    return (
      <span className='social-share-button'>
        <a className="btn btn-twitter" onClick={this.publishOnTwitter.bind(this)}>
          <i className="fab fa-twitter"/> {this.trans.get('Publish on Twitter')}
        </a>
        <a className="btn btn-facebook" onClick={this.publishOnFacebook.bind(this)}>
          <i className="fab fa-facebook-f"/> {this.trans.get('Publish on Facebook')}
        </a>
        <Rodal
          visible={this.state.visible}
          onClose={() => {this.setState({visible: false})}}
          animation='slideDown'
          className='rodal-loading'
          height={80}
          width={100}
        >
          <Loading text={this.trans.get('Publishing...')} />
        </Rodal>
      </span>
    )
  }
}

if (document.getElementById('social-share')) {
  ReactDOM.render(<SocialShare/>, document.getElementById('social-share'))
}
