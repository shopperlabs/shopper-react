const rules = {
  name: [
    { required: true, message: 'Please name is required', trigger: 'blur' }
  ],
  slug: [
    { required: true, message: 'Please slug is required', trigger: 'blur' }
  ],
}

export default rules
