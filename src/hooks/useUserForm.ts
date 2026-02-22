import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { AppDispatch } from '../store/store'
import { addUser } from '../store/usersSlice'
import { validateUserForm } from '../utils/validation'
import type { User, NewUserForm } from '../types/user'

function useUserForm() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [form, setForm] = useState<NewUserForm>({ name: '', email: '' })
  const [errors, setErrors] = useState<Partial<NewUserForm>>({})

  // handle input changes + clear errors
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }, [])

  // build user object 
  const buildUser = useCallback((form: NewUserForm): User => ({
    id: Date.now() * -1,
    name: form.name.trim(),
    username: form.name.trim().toLowerCase().replace(/\s/g, ''),
    email: form.email.trim(),
    phone: 'N/A',
    website: 'N/A',
    address: {
      street: 'N/A',
      suite: 'N/A',
      city: 'N/A',
      zipcode: 'N/A',
      geo: { lat: '0', lng: '0' },
    },
    company: { name: 'N/A', catchPhrase: 'N/A', bs: 'N/A' },
  }), [])

  // handle submit 
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateUserForm(form)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    dispatch(addUser(buildUser(form)))
    navigate('/')
  }, [form, buildUser])

  return { form, errors, handleChange, handleSubmit }
}

export default useUserForm