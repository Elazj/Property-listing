import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isLoggedIn, logout } from '../utils/auth'

export default function Header() {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link
          to="/properties"
          className="text-2xl font-bold text-gray-800 hover:text-accent transition"
        >
          Properties
        </Link>

        <nav>
          {isLoggedIn() ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2  text-white bg-blue-600 text-sm font-medium rounded-md hover:bg-blue-700 transition shadow-sm"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition shadow-sm"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}