import { useState, useMemo, useCallback } from 'react'
import useUsers from '../hooks/useUsers'
import useDebounce from '../hooks/useDebounce'
import SearchBar from '../components/SearchBar'
import UserCard from '../components/UserCard'
import type { User } from '../types/user'

function HomePage() {
  const { users, loading, error } = useUsers()
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('')

  // useDebounce — only updates 300ms after user stops typing
  // THIS is where we finally use our useDebounce hook!
  const debouncedSearch = useDebounce(search, 300)

  // useCallback — handleSearch won't be recreated every render
  const handleSearch = useCallback((value: string) => {
    setSearch(value)
  }, [])

  const handleSort = useCallback((value: string) => {
    setSortBy(value)
  }, [])

  // useMemo only recalculates when users, debouncedSearch or sortBy changes
  // if nothing changed  returns cached result instantly
  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users]

    // FILTER  using debouncedSearch not search!
    if (debouncedSearch) {
      result = result.filter(user =>
        user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    }

    // SORT
    if (sortBy) {
      result.sort((a: User, b: User) => {
        switch (sortBy) {
          case 'name-asc':
            return a.name.localeCompare(b.name)
          case 'name-desc':
            return b.name.localeCompare(a.name)
          case 'email-asc':
            return a.email.localeCompare(b.email)
          case 'email-desc':
            return b.email.localeCompare(a.email)
          default:
            return 0
        }
      })
    }

    return result
  }, [users, debouncedSearch, sortBy])

  // loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading users...</p>
        </div>
      </div>
    )
  }

  // error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center bg-red-50 border border-red-200 rounded-xl p-8">
          <p className="text-red-500 text-lg font-semibold">Something went wrong</p>
          <p className="text-red-400 text-sm mt-2">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Users</h1>
        <p className="text-gray-500 mt-1">
          {filteredAndSortedUsers.length} of {users.length} users
        </p>
      </div>

      {/* Search + Sort */}
      <SearchBar
        value={search}
        onChange={handleSearch}
        sortBy={sortBy}
        onSortChange={handleSort}
      />

      {/* Empty state */}
      {filteredAndSortedUsers.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg font-medium">No users found</p>
          <p className="text-sm mt-1">Try a different search term</p>
        </div>
      )}

      {/* Users Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}

export default HomePage