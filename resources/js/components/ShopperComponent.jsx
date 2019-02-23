import React, {Component} from 'react'
import Lang from 'lang.js'
import {i18n} from 'element-react'
import locale from 'element-react/src/locale/lang/en'

export default class ShopperComponent extends Component {
  constructor(props) {
    super(props)

    Lang.prototype._getMessage = function(key, locale) {
      locale = locale || this.getLocale();

      if (this.messages[locale] === undefined) {
        locale = this.getFallback();
      }

      if (this.messages[locale][key] === undefined) {
        locale = this.getFallback();
      }

      if (this.messages[locale][key] === undefined) {
        return null;
      }

      // Added this one - if key value doesn't found, return to fallback
      // To handle this case: {"Hello: ""}
      if (! this.messages[locale][key]) {
        locale = this.getFallback();
      }

      return this.messages[locale][key];
    }

    i18n.use(locale)

    this.trans = new Lang({messages, locale: default_locale, fallback: fallback_locale})
  }
}
