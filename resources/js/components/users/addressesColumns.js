import translate from '../../helpers/translate'

const addressesColumns = [
  {
    type: 'selection'
  },
  {
      label: translate.get('Name'),
      prop: "name",
      sortable: true
  },
  {
    label: translate.get('Country'),
    prop: "country_id",
    sortable: true
  },
  {
    label: translate.get('State'),
    prop: "state_id",
    sortable: true
  },
  {
    label: translate.get('City'),
    prop: "city",
    sortable: true
  },
  {
    label: translate.get('Street'),
    prop: "street",
    sortable: true
  },
  {
    label: translate.get('Address'),
    prop: "address",
    sortable: true
  },
  {
    label: translate.get('Phone'),
    prop: "phone_number",
    sortable: true
  }
]

export default addressesColumns
