import { useMemo, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { updateUser } from '../store/usersSlice'
import type { User } from '../types/user'

function useUserDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const users = useSelector((state: RootState) => state.users.users)

  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<Partial<User>>({})

  // find user — ONE job
  const user = useMemo(() => {
    return users.find(u => u.id === Number(id))
  }, [users, id])

  // start editing — ONE job
  const handleEditStart = useCallback(() => {
    if (!user) return
    setEditForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
    })
    setIsEditing(true)
  }, [user])

  // handle input change — ONE job
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditForm(prev => ({ ...prev, [name]: value }))
  }, [])

  // save — ONE job
  const handleSave = useCallback(() => {
    if (!user) return
    const updatedUser: User = {
      ...user,
      name: editForm.name || user.name,
      email: editForm.email || user.email,
      phone: editForm.phone || user.phone,
      website: editForm.website || user.website,
    }
    dispatch(updateUser(updatedUser))
    setIsEditing(false)
  }, [user, editForm, dispatch])

  // cancel — ONE job
  const handleCancel = useCallback(() => {
    setIsEditing(false)
    setEditForm({})
  }, [])

  return {
    user,
    isEditing,
    editForm,
    handleEditStart,
    handleChange,
    handleSave,
    handleCancel,
    navigate,
  }
}

export default useUserDetail