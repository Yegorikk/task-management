import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

export const Navbar = () => {
  const { user, logout } = useAuthStore((state) => ({
    user: state.user,
    logout: state.logout,
  }))

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow mb-5">
      <div className="container-fluid" style={{ maxWidth: '2000px', padding: '20px 20px' }}>
        <div className="d-flex justify-content-between align-items-center w-100">
          <Link to="/" className="text-xl font-bold" style={{ fontSize: '24px' }}>
            Task Manager
          </Link>
          <div className="d-flex align-items-center gap-3">
            {user ? (
              <>
                <span>{user.name}</span>
                <button
                  onClick={logout}
                  className="btn btn-danger"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="d-flex gap-2">
                <Link
                  to="/login"
                  className="btn btn-primary"
                >
                  Login
                </Link>
                <Link
                  to="/register" 
                  className="btn btn-outline-primary"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 