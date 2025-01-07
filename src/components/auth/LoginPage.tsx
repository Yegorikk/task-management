import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import { useAuthStore } from '../../store/useAuthStore'

export const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement login logic
    navigate('/')
  }

  return (
    <div className="col-md-4 mx-auto mt-5">
      <h1 className="h3 mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="card p-4">
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100 mt-3 mb-3"
        >
          Login
        </button>
      </form>
    </div>
  )
} 