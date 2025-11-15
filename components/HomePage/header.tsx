'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '../ui/button'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className='sticky top-0 z-50 bg-background border-b border-border'>
      <nav className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between'>
        <Link href='/' className='text-2xl font-bold text-foreground'>
          Insights
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-8 text-sm'>
          <Link href='#' className='text-foreground'>
            Articles
          </Link>
          <Link href='#' className='text-foreground'>
            Categories
          </Link>
          <Link href='#' className='text-foreground'>
            About
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant='ghost'
          className='md:hidden'
          onClick={() => setIsOpen(!isOpen)}
          aria-label='Toggle menu'
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className='absolute top-full left-0 right-0 bg-background border-b border-border md:hidden'>
            <div className='flex flex-col gap-4 p-4'>
              <Link
                href='#'
                className='text-foreground hover:text-accent transition-colors'
              >
                Articles
              </Link>
              <Link
                href='#'
                className='text-foreground hover:text-accent transition-colors'
              >
                Categories
              </Link>
              <Link
                href='#'
                className='text-foreground hover:text-accent transition-colors'
              >
                About
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
