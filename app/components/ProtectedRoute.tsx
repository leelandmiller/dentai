import { useEffect } from "react"
import { useNavigate } from "@remix-run/react"
import { useUser } from "~/hooks/use-user"
import Spinner from "~/components/ui/spinner"

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate("/register")
    }
  }, [user, loading, navigate])

  if (loading) {
    return <Spinner size='large' />
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
