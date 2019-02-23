const rules = {
  email: [
    { required: true, message: 'Please user email is required', trigger: 'blur' },
    { type: 'email', message: 'Please correct email address', trigger: 'blur,change' }
  ],
}

export default rules
