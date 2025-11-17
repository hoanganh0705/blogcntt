'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Đảm bảo chỉ render sau khi mount (tránh SSR mismatch)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant='outline' size='icon' disabled>
        <Sun className='h-[1.2rem] w-[1.2rem]' />
      </Button>
    )
  }

  const isDark = theme === 'dark'

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={toggleTheme}
      className='relative overflow-hidden transition-all duration-300 hover:scale-105'
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Sun Icon */}
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all duration-500 ${
          isDark
            ? 'scale-0 rotate-90 opacity-0'
            : 'scale-100 rotate-0 opacity-100'
        }`}
      />

      {/* Moon Icon */}
      <Moon
        className={`absolute inset-0 m-auto h-[1.2rem] w-[1.2rem] transition-all duration-500 ${
          isDark
            ? 'scale-100 rotate-0 opacity-100'
            : 'scale-0 -rotate-90 opacity-0'
        }`}
      />

      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
