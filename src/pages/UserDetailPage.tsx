import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import type { RootState } from '../store/store'

function UserDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const users = useSelector((state: RootState) => state.users.users)

  // useMemo — find user only when users or id changes
  const user = useMemo(() => {
    return users.find(u => u.id === Number(id))
  }, [users, id])

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-5xl mb-4">👤</p>
          <p className="text-gray-500 text-lg">User not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-blue-600 hover:underline"
          >
            ← Back to users
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="text-blue-600 hover:underline mb-6 flex items-center gap-1"
      >
        ← Back to users
      </button>

      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-3xl">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-500">@{user.username}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h2 className="font-semibold text-gray-700 text-lg">Contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Email</p>
              <p className="text-gray-700"> {user.email}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Phone</p>
              <p className="text-gray-700"> {user.phone}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Website</p>
              <p className="text-gray-700">{user.website}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Company</p>
              <p className="text-gray-700"> {user.company.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="font-semibold text-gray-700 text-lg mb-3">Address</h2>
        <div className="bg-gray-50 rounded-lg p-4 space-y-1 text-gray-700">
          <p>{user.address.street}, {user.address.suite}</p>
          <p> {user.address.city}, {user.address.zipcode}</p>
        </div>
      </div>
    </div>
  )
}

export default UserDetailPage
