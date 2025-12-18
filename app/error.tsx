'use client'

import { AlertTriangle, Home, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className='min-h-screen bg-background flex items-center justify-center px-4'>
      <div className='max-w-md w-full text-center'>
        <div className='mb-8'>
          <AlertTriangle className='mx-auto h-16 w-16 text-destructive' />
        </div>

        <h1 className='text-2xl font-bold text-foreground mb-4'>
          Something went wrong
        </h1>

        <p className='text-muted-foreground mb-8'>
          We encountered an unexpected error. Please try again or return to the
          homepage.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button onClick={reset} className='flex items-center gap-2'>
            <RefreshCw className='h-4 w-4' />
            Try Again
          </Button>

          <Button variant='outline' asChild>
            <Link href='/' className='flex items-center gap-2'>
              <Home className='h-4 w-4' />
              Go Home
            </Link>
          </Button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className='mt-8 text-left'>
            <summary className='cursor-pointer text-sm text-muted-foreground hover:text-foreground'>
              Error Details (Development Only)
            </summary>
            <pre className='mt-2 text-xs bg-muted p-4 rounded-lg overflow-auto'>
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </main>
  )
}
