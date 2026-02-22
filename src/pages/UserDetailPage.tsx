import useUserDetail from '../hooks/useUserDetail'

function UserDetailPage() {
  const {
    user,
    isEditing,
    editForm,
    handleEditStart,
    handleChange,
    handleSave,
    handleCancel,
    navigate,
  } = useUserDetail()

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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-3xl">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-500">@{user.username}</p>
            </div>
          </div>

          {/* Edit / Save / Cancel Buttons */}
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEditStart}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                 Edit
              </button>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h2 className="font-semibold text-gray-700 text-lg">Contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            {/* Email */}
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Email</p>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editForm.email || ''}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-700"> {user.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Phone</p>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={editForm.phone || ''}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-700">{user.phone}</p>
              )}
            </div>

            {/* Website */}
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Website</p>
              {isEditing ? (
                <input
                  type="text"
                  name="website"
                  value={editForm.website || ''}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-700"> {user.website}</p>
              )}
            </div>

            {/* Company */}
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
          <p> {user.address.street}, {user.address.suite}</p>
          <p> {user.address.city}, {user.address.zipcode}</p>
        </div>
      </div>
    </div>
  )
}

export default UserDetailPage
