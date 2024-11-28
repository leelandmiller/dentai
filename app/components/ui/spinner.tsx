import { cn } from "~/lib/utils"

interface SpinnerProps {
  size?: "small" | "medium" | "large"
  className?: string
}

export default function Spinner({
  size = "medium",
  className,
}: SpinnerProps = {}) {
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4",
  }

  return (
    <div className='flex justify-center items-center'>
      <div
        className={cn(
          "animate-spin rounded-full border-t-primary",
          "border-r-primary/30 border-b-primary/30 border-l-primary/30",
          sizeClasses[size],
          className
        )}
        role='status'
        aria-label='Loading'
      >
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  )
}
