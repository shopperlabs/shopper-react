const rules = {
  name: [
    { required: true, message: 'Please category name is required', trigger: 'blur' }
  ],
  slug: [
    { required: true, message: 'Please URL is required', trigger: 'blur' }
  ],
}

export default rules
