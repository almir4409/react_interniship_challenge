import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar'
import HomePage from './pages/HomePage'
import UserDetailPage from './pages/UserDetailPage'
import UserForm from './components/UserForm'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar shows on every page */}
        <Navbar />

        {/* Main content */}
        <main>
          <Routes>
            {/* Home page — shows list of users */}
            <Route path="/" element={<HomePage />} />

            {/* User detail page — shows one user */}
            <Route path="/users/:id" element={<UserDetailPage />} />

            {/* Add user page — shows the form */}
            <Route path="/add" element={<UserForm />} />

            {/* Any unknown URL → go home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App


