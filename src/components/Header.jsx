import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isLoggedIn, logout, getToken } from '../utils/auth'

export default function Header() {
  const navigate = useNavigate()
  function handleLogout() {
    logout()
    navigate('/login')
  }
  const token = getToken()
  return (
    <header className="bg-white border-b">
      <div className="container flex items-center justify-between py-3">
        <Link to="/properties" className="text-xl font-bold text-accent">Properties</Link>
        <nav className="flex items-center gap-3">
          {isLoggedIn() ? (
            <>
              <span className="text-sm text-gray-600">{token?.user?.email || 'user'}</span>
              <button onClick={handleLogout} className="px-3 py-1 rounded bg-accent text-white text-sm">Logout</button>
            </>
          ) : (
            <Link to="/login" className="px-3 py-1 rounded bg-accent text-white text-sm">Login</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
