// app/components/Navbar.tsx
import { Link, useNavigate, useLocation } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import { useUser } from "~/hooks/use-user"
import { logOut } from "~/utils/auth"
import Logo from "./Logo"

export default function Navbar() {
  const { user, loading } = useUser()
  const navigate = useNavigate()
  const location = useLocation()
  const isDashboard = location.pathname === "/dashboard"

  const handleLogout = async () => {
    try {
      await logOut()
      navigate("/")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  return (
    <nav className='border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='px-6 mx-auto flex h-16 items-center justify-between'>
        <Link to='/' className='flex items-center'>
          <Logo className='h-8 w-auto' />
        </Link>

        <div className='flex items-center gap-4'>
          {loading ? null : user ? (
            <>
              {!isDashboard && (
                <Link to='/dashboard'>
                  <Button variant='ghost'>Dashboard</Button>
                </Link>
              )}
              <Button variant='outline' onClick={handleLogout}>
                Log Out
              </Button>
            </>
          ) : (
            <Link to='/register?mode=login'>
              <Button variant='outline'>Log In</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
