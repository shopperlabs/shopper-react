import Lang from 'lang.js'

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

let translate =  new Lang({messages, locale: default_locale, fallback: fallback_locale})

export default translate
