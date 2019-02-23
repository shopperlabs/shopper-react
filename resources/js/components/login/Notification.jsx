import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default class Notification extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div>Bonjour</div>
    )
  }
}

if (document.getElementById('notifications')) {
  ReactDOM.render(<Notification />, document.getElementById('notifications'))
}

