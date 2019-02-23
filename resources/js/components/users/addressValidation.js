const addressRules = {
  city: [
    { required: true, message: 'Please city is required', trigger: 'blur' },
  ],
  street: [
    { required: true, message: 'Please street is required', trigger: 'blur' },
  ],
  phone_number: [
    { required: true, message: 'Please phone number is required', trigger: 'blur' },
  ]
}

export default addressRules
