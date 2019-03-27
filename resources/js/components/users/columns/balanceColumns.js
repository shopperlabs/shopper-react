import React from 'react'
import { Tag } from 'element-react'
function formatDate(date) {
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var day = date.getDate(), monthIndex = date.getMonth(), year = date.getFullYear().toString().substr(-2);
  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}
const balanceColumns = [
  {
    type: 'selection'
  },
  {
    label: 'Added At',
    prop: "created_at",
    sortable: true,
  },
  {
    label: 'Amount',
    prop: "amount",
    sortable: true
  },
  {
    label: 'Type',
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
    label: 'Valid',
    prop: "accepted",
    sortable: true,
    render: (data, column)=>{
      console.log(data)
      if (data.accepted == 0) {
        return <Tag type="danger">Desactivated</Tag>
      } else{
        return <Tag type="success">Validated</Tag>
      }
    }
  },
  {
    label: 'Comment',
    prop: "meta",
  }
]

export default balanceColumns
