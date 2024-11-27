import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

import Logo from '~/components/Logo'
import { Button } from '~/components/ui/button'
import Navbar from '~/components/Navbar'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <header className="bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6 py-24">
          <div className="flex flex-col items-center text-center">
            <Logo className="h-12 w-auto mb-8" />
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              AI-Powered Dental Notes Made Simple
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
              Transform your dental appointments into detailed patient notes
              instantly. Save time, reduce errors, and focus more on patient
              care.
            </p>
            <Link to="/register">
              <Button size="lg">Sign Up Today</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              title="Real-Time Transcription"
              description="Automatically convert conversations into structured clinical notes"
              icon="🎙️"
            />
            <FeatureCard
              title="Smart Treatment Plans"
              description="Generate detailed treatment plans from your conversations"
              icon="📋"
            />
            <FeatureCard
              title="Seamless Integration"
              description="Works with your existing practice management software"
              icon="🔄"
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Step number={1} title="Record Appointment">
              Simply start recording during your patient consultation
            </Step>
            <Step number={2} title="AI Processing">
              Our AI transcribes and structures the conversation
            </Step>
            <Step number={3} title="Review & Save">
              Review the generated notes and save to patient records
            </Step>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Ready to Transform Your Practice?
          </h2>
          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <Button size="lg">Sign Up Today</Button>
            </Link>
            <Button size="lg" variant="outline">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <span className="text-4xl mb-4">{icon}</span>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}

interface StepProps {
  number: number
  title: string
  children: React.ReactNode
}

function Step({ number, title, children }: StepProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{children}</p>
    </div>
  )
}
