import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, isLoggedIn } from '../utils/auth'

export default function Login() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  if (isLoggedIn()) nav('/properties', { replace: true })
  function handleSubmit(e) {
    e.preventDefault()
    login(email, password)
    nav('/properties', { replace: true })
  }
  return (
    <div className="container flex justify-center mt-12">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white border rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Login</h2>
        <label className="block text-sm">
          <span className="text-gray-700">Email</span>
          <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-accent focus:border-accent" />
        </label>
        <label className="block text-sm">
          <span className="text-gray-700">Password</span>
          <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-accent focus:border-accent" />
        </label>
        <div className="flex items-center justify-between">
          <button type="submit" className="px-4 py-2 bg-accent text-white rounded">Sign in</button>
        </div>
        <p className="text-sm text-gray-500">Use any email/password — demo only.</p>
      </form>
    </div>
  )
}
