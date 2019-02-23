import React from 'react'
import {Tag} from 'element-react'
import translate from '../../helpers/translate'

const columns = [
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
        <Tag type={(data.active === 1) ? 'success' : 'warning'}>
          {(data.active === 1) ? translate.get('Yes') : translate.get('No')}
        </Tag>
      )
    }
  },
  {
    label: translate.get('Code'),
    prop: "code",
    sortable: true
  },
  {
    label: translate.get('Price'),
    prop: "price",
    sortable: true
  },
  {
    label: translate.get('Old Price'),
    prop: "old_price",
    sortable: true
  },
  {
    label: translate.get('Quantity'),
    prop: "quantity",
    sortable: true
  }
]

export default columns
