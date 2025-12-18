// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Blog CNTT - Kiến thức công nghệ thông tin chất lượng cao',
    template: '%s | Blog CNTT'
  },
  description:
    'Khám phá kiến thức công nghệ thông tin chất lượng cao với các bài viết về lập trình, phát triển web, và xu hướng công nghệ mới nhất.',
  keywords: [
    'blog',
    'công nghệ thông tin',
    'lập trình',
    'web development',
    'tutorial',
    'programming',
    'tech',
    'javascript',
    'react',
    'nextjs'
  ],
  authors: [{ name: 'Blog CNTT Team' }],
  creator: 'Blog CNTT',
  publisher: 'Blog CNTT',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  ),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Blog CNTT - Kiến thức công nghệ thông tin chất lượng cao',
    description:
      'Khám phá kiến thức công nghệ thông tin chất lượng cao với các bài viết về lập trình, phát triển web, và xu hướng công nghệ mới nhất.',
    url: '/',
    siteName: 'Blog CNTT',
    type: 'website',
    locale: 'vi_VN',
    images: [
      {
        url: '/images/og-default.jpg', // You'll need to add this image
        width: 1200,
        height: 600,
        alt: 'Blog CNTT - Kiến thức công nghệ thông tin chất lượng cao'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog CNTT - Kiến thức công nghệ thông tin chất lượng cao',
    description:
      'Khám phá kiến thức công nghệ thông tin chất lượng cao với các bài viết về lập trình, phát triển web, và xu hướng công nghệ mới nhất.',
    creator: '@blogcntt', // Replace with your Twitter handle
    images: ['/images/og-default.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'your-google-site-verification-code' // Add your Google verification code
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='vi'>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
