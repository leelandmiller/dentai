import { useState } from "react"
import { useNavigate, Link, useSearchParams } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import {
  signInWithGoogle,
  signInWithEmail,
  registerWithEmail,
} from "~/utils/auth"
import Logo from "~/components/Logo"
import { Separator } from "~/components/ui/separator"
import { X } from "lucide-react"
import { useToast } from "~/hooks/use-toast"
import { Toaster } from "~/components/ui/toaster"

export default function Register() {
  const [searchParams] = useSearchParams()
  const mode = searchParams.get("mode")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isLogin, setIsLogin] = useState(mode === "login")
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (isLogin) {
        await signInWithEmail(email, password)
        toast({
          title: "Success",
          description: "Successfully signed in!",
        })
      } else {
        await registerWithEmail(email, password, firstName, lastName)
        toast({
          title: "Success",
          description: "Account created successfully!",
        })
      }
      navigate("/dashboard")
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred during authentication",
      })
    }
  }

  const handleGoogleAuth = async () => {
    try {
      const { isNewUser } = await signInWithGoogle()
      toast({
        title: "Success",
        description: isNewUser
          ? "Account created successfully!"
          : "Successfully signed in!",
      })
      navigate("/dashboard")
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred during Google authentication",
      })
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
      <Link
        to='/'
        className='absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
      >
        <X className='h-6 w-6' />
        <span className='sr-only'>Close</span>
      </Link>

      <div className='max-w-md w-full space-y-8'>
        <div className='flex flex-col items-center'>
          <Logo />
          <h2 className='mt-6 text-3xl font-extrabold text-gray-900 dark:text-white'>
            {isLogin ? "Sign in to your account" : "Create new account"}
          </h2>
        </div>

        <form onSubmit={handleEmailAuth} className='mt-8 space-y-6'>
          <div className='space-y-4 min-h-[140px]'>
            {" "}
            {/* Add min-height to reserve space */}
            <div
              className={`transition-opacity duration-200 ${
                !isLogin ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
              }`}
            >
              <div className='flex space-x-4'>
                <Input
                  type='text'
                  required={!isLogin}
                  placeholder='First Name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className='flex-1'
                  disabled={isLogin}
                />
                <Input
                  type='text'
                  required={!isLogin}
                  placeholder='Last Name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className='flex-1'
                  disabled={isLogin}
                />
              </div>
            </div>
            <Input
              type='email'
              required
              placeholder='Email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type='password'
              required
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-4'>
            <Button type='submit' className='w-full'>
              {isLogin ? "Sign in" : "Sign up"} with Email
            </Button>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <Separator />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-gray-50 px-8 text-muted-foreground'>
                  or
                </span>
              </div>
            </div>

            <Button
              type='button'
              variant='outline'
              className='w-full'
              onClick={handleGoogleAuth}
            >
              Continue with Google
            </Button>
          </div>

          <div className='text-center'>
            <button
              type='button'
              className='text-sm text-primary hover:underline'
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </form>
        <Toaster />
      </div>
    </div>
  )
}
