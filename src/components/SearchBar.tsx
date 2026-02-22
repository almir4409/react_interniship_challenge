import React from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  sortBy: string
  onSortChange: (value: string) => void
}

// React.memo = only re-renders if props actually change
const SearchBar = React.memo(({ value, onChange, sortBy, onSortChange }: SearchBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {/* Search Input */}
      <div className="flex-1 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          
        </span>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Sort Dropdown */}
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="">Sort By...</option>
        <option value="name-asc">Name A → Z</option>
        <option value="name-desc">Name Z → A</option>
        <option value="email-asc">Email A → Z</option>
        <option value="email-desc">Email Z → A</option>
      </select>
    </div>
  )
})

export default SearchBar