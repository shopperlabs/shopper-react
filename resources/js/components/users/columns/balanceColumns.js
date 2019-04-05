import React from 'react'
import { Tag } from 'element-react'
import translate from '../../../helpers/translate'

const balanceColumns = [
  {
    type: 'selection'
  },
  {
    label: translate.get('Added At'),
    prop: "created_at",
    sortable: true,
  },
  {
    label: translate.get('Amount'),
    prop: "amount",
    sortable: true
  },
  {
    label: translate.get('Type'),
    prop: "type",
    sortable: true,
    filters: [{ text: 'Deposit', value: 'deposit' }, { text: 'Withdraw', value: 'withdraw' }],
    filterMethod(value, row) {
      return row.type === value;
    },
    render: (data, column) => {
      return data.type.charAt(0).toUpperCase() + data.type.substr(1);
    }
  },
  {
    label: translate.get('Valid'),
    prop: "accepted",
    sortable: true,
    render: (data, column) => {
      if (data.accepted === 0) {
        return <Tag type="danger">{translate.get('Desactivated')}</Tag>
      } else{
        return <Tag type="success">{translate.get('Validated')}</Tag>
      }
    }
  },
  {
    label: translate.get('Comment'),
    prop: "meta",
  }
]

export default balanceColumns
