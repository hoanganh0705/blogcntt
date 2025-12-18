'use client'

import { AlertTriangle, Home, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className='min-h-screen bg-background flex items-center justify-center px-4'>
      <div className='max-w-md w-full text-center'>
        <div className='mb-8'>
          <AlertTriangle className='mx-auto h-16 w-16 text-destructive' />
        </div>

        <h1 className='text-2xl font-bold text-foreground mb-4'>
          Article Not Found
        </h1>

        <p className='text-muted-foreground mb-8'>
          The article you&apos;re looking for doesn&apos;t exist or may have
          been moved.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button asChild>
            <Link href='/' className='flex items-center gap-2'>
              <Home className='h-4 w-4' />
              Go Home
            </Link>
          </Button>

          <Button variant='outline' asChild>
            <Link href='/' className='flex items-center gap-2'>
              <Search className='h-4 w-4' />
              Browse Articles
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
