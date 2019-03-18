const rules = {
  name: [
    { required: true, message: 'Please name is required', trigger: 'blur' }
  ],
  code: [
    { required: true, message: 'Please code is required', trigger: 'blur' }
  ],
  type: [
    { required: true, message: 'Please type is required', trigger: 'change' }
  ]
}

export default rules
