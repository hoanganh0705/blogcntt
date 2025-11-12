'use client'

import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ReactNode } from 'react'
import { AuthorAvatar } from './AuthorAvatar'

export interface Frontmatter {
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  author: string
  authorImage: string
  image?: string
}

interface Props {
  metadata: Frontmatter
  children: ReactNode
}

export function PostDetailLayout({ metadata, children }: Props) {
  const formatted = new Date(metadata.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  console.log(metadata.image)

  return (
    <main className='min-h-screen bg-background'>
      <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <Link href='/'>
          <Button variant='ghost' className='mb-8 -ml-2'>
            <ArrowLeft size={20} className='mr-2' />
            Back to Articles
          </Button>
        </Link>

        <article>
          {/* Header */}
          <div className='mb-8'>
            <div className='flex flex-wrap items-center gap-3 mb-4'>
              <Badge>{metadata.category}</Badge>
              <span className='text-sm text-muted-foreground'>•</span>
              <span className='text-sm text-muted-foreground flex items-center gap-1'>
                <Calendar size={14} />
                {formatted}
              </span>
              <span className='text-sm text-muted-foreground flex items-center gap-1'>
                <Clock size={14} />
                {metadata.readTime}
              </span>
            </div>

            <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance'>
              {metadata.title}
            </h1>

            <div className='flex items-center gap-3 pt-4 border-t border-border'>
              <AuthorAvatar
                name={metadata.author}
                image={metadata.authorImage}
              />

              <div>
                <p className='font-medium text-foreground'>{metadata.author}</p>
                <p className='text-sm text-muted-foreground'>
                  Published {formatted}
                </p>
              </div>
            </div>
          </div>

          {/* Hero image */}
          {metadata.image && (
            <div className='mb-8 rounded-lg overflow-hidden bg-muted h-96'>
              <Image
                src={metadata.image}
                alt={metadata.title}
                width={1200}
                height={600}
                className='w-full h-full object-cover'
              />
            </div>
          )}

          {/* Excerpt */}
          <Card className='mb-8 bg-muted/50 border-accent/20'>
            <CardContent className=''>
              <p className='text-base text-foreground italic'>
                {metadata.excerpt}
              </p>
            </CardContent>
          </Card>

          {/* MDX content */}
          <div className='prose prose-invert max-w-none mb-12 prose-headings:text-5xl prose-headings:font-bold prose-headings:mt-12 prose-headings:mb-6'>
            {children}
          </div>
        </article>
      </div>
    </main>
  )
}
