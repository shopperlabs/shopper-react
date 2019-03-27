import translate from '../../helpers/translate'

const ordersColumns = [
  {
    label: translate.get('Order Number'),
    prop: "order_number",
    sortable: true
  },
  {
    label: translate.get('Status'),
    prop: "statusName",
    sortable: true
  },
  {
    label: translate.get('Payment Method'),
    prop: "paymentMethod",
    sortable: true
  },
  {
    label: translate.get('Shipping Type'),
    prop: "shippingType",
    sortable: true
  },
  {
    label: translate.get('Price'),
    prop: "total_price_formated",
    sortable: true
  }
]

export default ordersColumns
