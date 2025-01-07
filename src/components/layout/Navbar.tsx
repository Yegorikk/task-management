import { useNavigate } from 'react-router-dom'
import { authApi } from '../../api/auth'

export const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    authApi.logout()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary align-items-center ">
      <div className="container py-3">
        <div className="d-flex align-items-center">
        <img 
            src="src\assets\logo.png" 
            alt="Logo" 
            height="50"
            className="me-3"
          />
          <span className="navbar-brand mb-0 h1">Task Manager</span>
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-outline-light"
        >
          Logout
        </button>
      </div>
    </nav>
  )
} 