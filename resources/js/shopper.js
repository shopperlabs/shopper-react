/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */
import './libs/pace'
import './helpers/translate'
import './bootstrap'
import './libs/file-manager'
import './components/NavbarSearch'
import './components/categories/CategoryForm'
import './components/brands/BrandForm'
import './components/products/ProductForm'
import './components/products/SocialShare'
import './components/users/UserForm'
import './components/users/AdministratorForm'
import './components/users/AdministratorProfileForm'
import './components/orders/StatusForm'
import './components/orders/ShippingTypeForm'
import './components/orders/PaymentForm'
import './components/orders/OrderForm'
import './components/locations/CountryForm'
import './components/tags/TagFrom'
import './components/reviews/ReviewForm'
import './components/promo/DiscountForm'
import translate from './helpers/translate'

// Language management
const default_locale = window.default_locale
const fallback_locale = window.fallback_locale
const messages = window.messages

/**
 * Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Button Menu Sidebar
let buttonMenu = document.getElementById('menu-burger')

buttonMenu.addEventListener('click', function (event) {
  event.preventDefault()
  event.stopPropagation()
  toggleSidebar()
})

// Click on tr table record
let trs = document.querySelectorAll('.record-link')

trs.forEach((tr) => {
  tr.addEventListener('click', function (event) {
    event.preventDefault()
    event.stopPropagation()

    window.location = this.getAttribute('data-url')
  })
})

// Hide alert
let alerts =  document.querySelectorAll('.alert')

if (alerts.length > 0) {
  alerts.forEach((alert) => {
    alert.addEventListener('click', function (event) {
      event.preventDefault()
      alert.style.display = 'none'
    })
  })
}

// Toogle sidebar
function toggleSidebar() {
  let content = document.getElementById('content')
  let subsidebar = document.getElementById('aside-wrap')
  let header = document.getElementById('nav-header')

  content.classList.toggle('full-width')
  header.classList.toggle('full-width')
  subsidebar.classList.toggle('hidden')
}

/**
 * ==============================================================================
 * Algolia search
 * ==============================================================================
 */
let autocomplete = require('autocomplete.js'),
  algolia = document.getElementById('algolia'),
  algoliaLogo = algolia.getAttribute('data-logo'),
  client = algoliasearch(algolia.getAttribute('data-appID'), algolia.getAttribute('data-client-secret')),
  products = client.initIndex('shopper_catalogue_products'),
  categories = client.initIndex('shopper_catalogue_categories'),
  brands = client.initIndex('shopper_catalogue_brands'),
  users = client.initIndex('shopper_users')

autocomplete('#search-input', { hint: false }, [
  {
    source: autocomplete.sources.hits(products, { hitsPerPage: 5 }),
    displayKey: 'name',
    templates: {
      header: '<h4 class="algolia-search-title">Products</h4>',
      suggestion: function(suggestion) {
        return `<span>${suggestion._highlightResult.name.value}</span>`
      },
      empty: function (result) {
        return `<span>Sorry no results for ${result.query}</span>`
      }
    }
  },
  {
    source: autocomplete.sources.hits(categories, { hitsPerPage: 5 }),
    displayKey: 'name',
    templates: {
      header: '<h4 class="algolia-search-title">Categories</h4>',
      suggestion: function(suggestion) {
        return `<span>${suggestion._highlightResult.name.value}</span>`
      },
      empty: function (result) {
        return `<span>No categories for the query ${result.query}</span>`
      }
    }
  },
  {
    source: autocomplete.sources.hits(brands, { hitsPerPage: 5 }),
    displayKey: 'name',
    templates: {
      header: '<h4 class="algolia-search-title">Brands</h4>',
      suggestion: function(suggestion) {
        return `<span>${suggestion._highlightResult.name.value}</span>`
      },
      empty: function (result) {
        return `<span>No brand for the query ${result.query}</span>`
      }
    }
  },
  {
    source: autocomplete.sources.hits(users, { hitsPerPage: 5 }),
    displayKey: 'name',
    templates: {
      header: '<h4 class="algolia-search-title">Users</h4>',
      footer: `<span class="search-foot">
        <a href="https://www.algolia.com" target="_blank">
          <img src="${algoliaLogo}" width="75" height="25">
        </a>
      </span>`,
      suggestion: function(suggestion) {
        return `<span>${suggestion._highlightResult.name.value +' '+ suggestion.last_name}</span>`
      },
      empty: function (result) {
        return `<span>No users for the query ${result.query}</span>`
      }
    }
  }
]).on('autocomplete:selected', function(event, suggestion, dataset, context) {
  switch (dataset) {
    case 1:
      window.location.href = route('shopper.catalogue.products.edit', {id: suggestion.id})
      break
    case 2:
      window.location.href = route('shopper.catalogue.categories.edit', {id: suggestion.id})
      break
    case 3:
      window.location.href = route('shopper.catalogue.brands.edit', {id: suggestion.id})
      break
    case 4:
      window.location.href = route('shopper.users.edit', {id: suggestion.id})
      break
  }
})

/**
 * ==============================================================================
 * Filemanager
 * ==============================================================================
 */
let filemaner = document.getElementById('fm')

if (filemaner) {
  document.addEventListener('DOMContentLoaded', function() {
    // Add callback to file manager
    fm.$store.commit('fm/setFileCallBack', function(fileUrl) {
      window.opener.fmSetLink(fileUrl)
      window.close()
    });
  });
}

/**
 * ==============================================================================
 * Mailing JavaScript
 * ==============================================================================
 */
$(document).ready(function() {
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  })

  let $_markdownInput = $('.markdown-input'), $_markdownTruth = $('#markdown--truth')
  const el = document.querySelector('img.mail')
  const observer = lozad(el) // passing a `NodeList` (e.g. `document.querySelectorAll()`) is also valid
  observer.observe()

  $(function () {
    $('[data-toggle="popover"]').popover()
  })

  $(document).on('click', function (e) {
    $('[data-toggle="popover"],[data-original-title]').each(function () {
      //the 'is' for buttons that trigger popups
      //the 'has' for icons within a button that triggers a popup
      if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
        (($(this).popover('hide').data('bs.popover')||{}).inState||{}).click = false  // fix for BS 3.3.6
      }
    })
  })

  $('form#create_mailable').on('submit', function(e) {
    e.preventDefault()
    let $_markdownView = $('#markdownView'), $_mailableAlerts = $('.new-mailable-alerts')

    if ( $('input#markdown--truth').is(':checked') && $_markdownView.val() === '') {
      $_markdownView.addClass('is-invalid')
      return
    }

    axios
      .post($(this).attr('action'), $(this).serialize())
      .then(function (response) {
        if (response.data.status === 'ok') {
          $('#newMailableModal').modal('toggle')
          notie.alert({ type: 1, text: response.data.message, time: 3 })

          setTimeout(function() { location.reload(); }, 1000)
        } else {
          $_mailableAlerts.text(response.data.message)
          $_mailableAlerts.removeClass('d-none')
        }
      })
      .catch(function (error) {
        notie.alert({ type: 'error', text: error, time: 2 })
      })
  })

  if ($_markdownTruth.is(':checked')) {
    $_markdownInput.show()
  } else {
    $_markdownInput.hide()
  }

  $_markdownTruth.change(
    function() {
      if ($(this).is(':checked')) {
        $_markdownInput.show()
      } else {
        $_markdownInput.hide()
      }
    })

  $('.remove-item').click(function() {
    let mailableName = $(this).data('mailable-name')

    notie.confirm({
      text: 'Are you sure you want to do that?<br>Delete Mailable <b>'+ mailableName +'</b>',
      submitCallback: function () {
        axios
          .post(route('shopper.settings.mails.mailables.deleteMailable'), {
            mailablename: mailableName,
          })
          .then(function (response) {
            if (response.data.status === 'ok') {
              notie.alert({ type: 1, text: 'Mailable deleted', time: 2 })
              jQuery('tr#mailable_item_' + mailableName).fadeOut('slow')

              // let tbody = $("#mailables_list tbody")
              /*if (tbody.children().length <= 1) {
                location.reload()
              }*/
              window.location = route('shopper.settings.mails.mailables.mailableList')
            } else {
              notie.alert({ type: 'error', text: 'Mailable not deleted', time: 2 })
            }
          })
          .catch(function (error) {
            notie.alert({ type: 'error', text: error, time: 2 })
          })
      }
    })
  })
})

/**
 * ==============================================================================
 * Ajax remove record
 * ==============================================================================
 */
$('form.record-delete').on('submit', function(e) {
  e.preventDefault()
  let $_this = $(this)

  notie.confirm({
    text: translate.get('Are you sure you want to do remove this record?'),
    submitCallback: function () {
      axios
        .delete($_this.attr('action'), $_this.serializeArray())
        .then(function (response) {
          if (response.data.status === 'ok') {
            notie.alert({ type: 1, text: translate.get(`Record deleted successfully <br><small>Redirecting...</small>`), time: 3 })

            setTimeout(function() {
              window.location.replace(response.data.redirect_url);
            }, 3000)
          }
        })
        .catch(function (error) {
          notie.alert({ type: 'error', text: error, time: 3 })
        })
    }
  })
})
