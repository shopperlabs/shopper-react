const OfferRules = {
  quantity: [
    { required: true, message: 'Please quantity is required', trigger: 'blur' },
  ],
  category_id: [
    { required: true, message: 'Please category is required', trigger: 'change' },
  ],
  product_id: [
    { required: true, message: 'Please product is required', trigger: 'change' },
  ],
  offer_id: [
    { required: true, message: 'Please offer is required', trigger: 'change' },
  ]
}

export default OfferRules
