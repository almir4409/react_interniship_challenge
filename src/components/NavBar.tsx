import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-white text-2xl font-bold tracking-tight">
           UserManager
        </Link>
        <Link
          to="/add"
          className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
        >
          + Add User
        </Link>
      </div>
    </nav>
  )
}

export default Navbar