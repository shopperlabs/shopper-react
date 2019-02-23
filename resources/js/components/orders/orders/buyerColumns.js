import React from 'react'
import {Tag} from 'element-react'
import translate from '../../../helpers/translate'

const buyerColumns = [
  {
    label: translate.get('Name'),
    prop: "name",
    sortable: true
  },
  {
    label: translate.get('Lastname'),
    prop: "last_name",
    sortable: true
  },
  {
    label: translate.get('Email'),
    prop: "email",
    sortable: true
  },
  {
    label: translate.get('Verified'),
    prop: "email_verified_at",
    sortable: true,
    render: function (data) {
      return (
        <Tag type={(data.email_verified_at !== null) ? 'success' : 'warning'}>
          {(data.email_verified_at !== null) ? 'Yes' : 'No'}
        </Tag>
      )
    }
  },
  {
    label: translate.get('Phone'),
    prop: "phone",
    sortable: true
  }
]

export default buyerColumns
