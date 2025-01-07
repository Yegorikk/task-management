import { Outlet } from 'react-router-dom'
import { Navbar } from '../layout/Navbar'

export const Layout = () => {
  return (
    <div className="min-vh-100 bg-light">
      <Navbar />
      <main className="container-fluid py-4" style={{ maxWidth: '1800px', padding: '0 24px' }}>
        <Outlet />
      </main>
    </div>
  )
} 