// app/routes/dashboard.tsx
import ProtectedRoute from "~/components/ProtectedRoute"

import { useUser } from "~/hooks/use-user"

/** UI */
import Navbar from "~/components/Navbar"
import { Button } from "~/components/ui/button"
import { Toaster } from "~/components/ui/toaster"

export default function Dashboard() {
  const { user } = useUser()
  console.log(user)

  return (
    <ProtectedRoute>
      <div className='min-h-screen bg-background'>
        <Navbar />
        <main className='container mx-auto px-6 py-8'>
          <div className='flex justify-between items-center mb-8'>
            <h1 className='text-3xl font-bold'>Welcome, {user?.displayName}</h1>
          </div>

          <div className='grid md:grid-cols-2 gap-6'>
            <div className='p-6 rounded-lg border bg-card'>
              <h2 className='text-xl font-semibold mb-4'>
                Recent Appointments
              </h2>
              <p className='text-muted-foreground'>No recent appointments</p>
            </div>

            <div className='p-6 rounded-lg border bg-card'>
              <h2 className='text-xl font-semibold mb-4'>Quick Actions</h2>
              <div className='space-y-4'>
                <Button className='w-full'>New Appointment</Button>
                <Button className='w-full' variant='outline'>
                  View Reports
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Toaster />
      </div>
    </ProtectedRoute>
  )
}
