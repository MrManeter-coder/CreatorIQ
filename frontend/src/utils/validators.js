
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(email) {
  if (!email.trim()) return 'Email is required'
  if (!EMAIL_PATTERN.test(email.trim())) return 'Enter a valid email address'
  return ''
}

export function validateLogin({ email, password }) {
  const errors = {}

  const emailError = validateEmail(email)
  if (emailError) errors.email = emailError

  if (!password) errors.password = 'Password is required'

  return errors
}

export function validateRegister({
  fullName,
  email,
  password,
  confirmPassword,
}) {
  const errors = {}

  if (!fullName.trim()) {
    errors.fullName = 'Full name is required'
  } else if (fullName.trim().length > 100) {
    errors.fullName = 'Full name must be 100 characters or fewer'
  }

  const emailError = validateEmail(email)
  if (emailError) errors.email = emailError

  if (!password) {
    errors.password = 'Password is required'
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  } else if (new TextEncoder().encode(password).length > 72) {
    errors.password = 'Password is too long (maximum 72 bytes)'
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
  } else if (confirmPassword !== password) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return errors
}
