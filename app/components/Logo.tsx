// app/components/Logo.tsx
interface LogoProps {
  className?: string
}
export default function Logo({ className = 'h-full w-full' }: LogoProps) {
  return (
    <>
      <img
        src="/dentai.svg"
        alt="Dentai Logo"
        className={className + ' block dark:hidden'}
      />
      <img
        src="/dentai-dark.svg"
        alt="Dentai Logo"
        className={className + ' hidden dark:block'}
      />
    </>
  )
}
