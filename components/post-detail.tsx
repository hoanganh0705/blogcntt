import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Post {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  readTime: string
  author: string
  image?: string
}

interface PostDetailProps {
  post: Post
}

export function PostDetail({ post }: PostDetailProps) {
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
          <div className='mb-8'>
            <div className='flex flex-wrap items-center gap-3 mb-4'>
              <Badge>{post.category}</Badge>
              <span className='text-sm text-muted-foreground'>•</span>
              <span className='text-sm text-muted-foreground flex items-center gap-1'>
                <Calendar size={14} />
                {post.date}
              </span>
              <span className='text-sm text-muted-foreground flex items-center gap-1'>
                <Clock size={14} />
                {post.readTime}
              </span>
            </div>

            <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance'>
              {post.title}
            </h1>

            <div className='flex items-center gap-3 pt-4 border-t border-border'>
              <div className='w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center'>
                <User size={24} className='text-accent' />
              </div>
              <div>
                <p className='font-medium text-foreground'>{post.author}</p>
                <p className='text-sm text-muted-foreground'>
                  Published {post.date}
                </p>
              </div>
            </div>
          </div>

          {post.image && (
            <div className='mb-8 rounded-lg overflow-hidden bg-muted h-96'>
              <img
                src={post.image || '/placeholder.svg'}
                alt={post.title}
                className='w-full h-full object-cover'
              />
            </div>
          )}

          <Card className='mb-8 bg-muted/50 border-accent/20'>
            <CardContent className='pt-6'>
              <p className='text-lg text-foreground italic'>{post.excerpt}</p>
            </CardContent>
          </Card>

          <div className='prose prose-invert max-w-none mb-12'>
            <div className='text-foreground leading-relaxed space-y-6 text-base md:text-lg'>
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <Card className='bg-muted/50 border-border'>
            <CardHeader>
              <h3 className='text-lg font-semibold text-foreground'>
                Share this article
              </h3>
            </CardHeader>
            <CardContent className='flex gap-4'>
              <Button variant='outline' size='sm'>
                Twitter
              </Button>
              <Button variant='outline' size='sm'>
                LinkedIn
              </Button>
              <Button variant='outline' size='sm'>
                Copy Link
              </Button>
            </CardContent>
          </Card>
        </article>
      </div>
    </main>
  )
}
