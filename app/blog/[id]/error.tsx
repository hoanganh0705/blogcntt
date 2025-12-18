'use client'

import { AlertTriangle, ArrowLeft, Home, RefreshCw } from 'lucide-react'
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
    <main className='min-h-screen bg-background'>
      <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <Link href='/'>
          <Button variant='ghost' className='mb-8 -ml-2 cursor-pointer'>
            <ArrowLeft size={20} className='mr-2' />
            Back to Articles
          </Button>
        </Link>

        <div className='text-center py-16'>
          <div className='mb-8'>
            <AlertTriangle className='mx-auto h-16 w-16 text-destructive' />
          </div>

          <h1 className='text-2xl font-bold text-foreground mb-4'>
            Article Not Found
          </h1>

          <p className='text-muted-foreground mb-8 max-w-md mx-auto'>
            The article you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button onClick={reset} className='flex items-center gap-2'>
              <RefreshCw className='h-4 w-4' />
              Try Again
            </Button>

            <Button variant='outline' asChild>
              <Link href='/' className='flex items-center gap-2'>
                <Home className='h-4 w-4' />
                Browse Articles
              </Link>
            </Button>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <details className='mt-8 text-left max-w-2xl mx-auto'>
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
      </div>
    </main>
  )
}
