import { ReactNode } from 'react'
import { Navbar } from './Navbar'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      <main className="container-fluid">
        {children}
      </main>
    </div>
  )
} 