import type { NewUserForm } from '../types/user'

export const validateUserForm = (form: NewUserForm): Partial<NewUserForm> => {
  const errors: Partial<NewUserForm> = {}

  if (!form.name.trim()) {
    errors.name = 'Name is required'
  } else if (form.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email'
  }

  return errors
}