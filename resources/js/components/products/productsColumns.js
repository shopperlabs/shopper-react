import React from 'react'
import translate from '../../helpers/translate'

const productsColumns = [
  {
    type: 'selection'
  },
  {
    label: translate.get('Name'),
    prop: "name",
    sortable: true
  },
  {
    label: translate.get('Active'),
    prop: "active",
    sortable: true,
    render: function (data) {
      return (
        <span>{(data.active === 1) ? translate.get('Yes') : translate.get('No')}</span>
      )
    }
  },
  {
    label: translate.get('Code'),
    prop: "code",
    sortable: true
  },
  {
    label: translate.get('Brand'),
    prop: "brand_name",
    sortable: true
  },
  {
    label: translate.get('Category'),
    prop: "category_name",
    sortable: true
  }
]

export default productsColumns
