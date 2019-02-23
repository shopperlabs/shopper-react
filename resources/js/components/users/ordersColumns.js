import translate from '../../helpers/translate'

const ordersColumns = [
  {
    label: translate.get('Order Number'),
    prop: "order_number",
    sortable: true
  },
  {
    label: translate.get('Status'),
    prop: "status_id",
    sortable: true
  },
  {
    label: translate.get('Payment Method'),
    prop: "payment_method_id",
    sortable: true
  },
  {
    label: translate.get('Shipping Type'),
    prop: "shipping_type_id",
    sortable: true
  },
  {
    label: translate.get('Total Price'),
    prop: "total_price",
    sortable: true
  }
]

export default ordersColumns
