import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Input, Form, i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/fr'

export default class NavbarSearch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      form: {
        search: ''
      }
    }
  }

  onSubmit(e) {
    e.preventDefault()
    console.log(this.state.form)
  }

  onChange(key, value) {
    this.state.form[key] = value
    this.forceUpdate()
  }

  render() {
    i18n.use(locale)
    return (
      <Form className="fr-FR" model={this.state.form} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
        <Input icon="search" placeholder="Search" value={this.state.form.search} onChange={this.onChange.bind(this, 'search')}/>
      </Form>
    )
  }
}

if (document.getElementById('searchable')) {
  ReactDOM.render(<NavbarSearch />, document.getElementById('searchable'))
}
