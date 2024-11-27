// app/components/Navbar.tsx
import { Link } from '@remix-run/react'
import { Button } from '~/components/ui/button'
import Logo from './Logo'

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-6 mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo className="h-8 w-auto" />
        </Link>

        <div className="flex items-center">
          <Link to="/register">
            <Button variant="outline">Log In</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
