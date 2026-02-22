import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store/store'
import { deleteUser } from '../store/usersSlice'
import type { User } from '../types/user'

interface UserCardProps {
  user: User
}

// React.memo = if this users data didnt change dont re-render
const UserCard = React.memo(({ user }: UserCardProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = (e: React.MouseEvent) => {
    // stop click from bubbling up to the card click
    e.stopPropagation()
    dispatch(deleteUser(user.id))
  }

  return (
    <div
      onClick={() => navigate(`/users/${user.id}`)}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all duration-200"
    >
      {/* Avatar + Name */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
          {user.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{user.name}</h3>
          <p className="text-sm text-gray-500">@{user.username}</p>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1 text-sm text-gray-600">
        <p> {user.email}</p>
        <p> {user.company.name}</p>
        <p> {user.address.city}</p>
      </div>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="mt-4 w-full text-center text-red-500 text-sm hover:text-red-700 hover:bg-red-50 py-1 rounded-lg transition-colors"
      >
         Delete
      </button>
    </div>
  )
})

export default UserCard