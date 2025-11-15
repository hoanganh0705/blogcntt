import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getAllPosts, PostMetadata } from '@/lib/getPosts'

export async function PostGrid() {
  const posts: PostMetadata[] = await getAllPosts()

  if (posts.length === 0) {
    return (
      <section className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center'>
        <p className='text-muted-foreground'>No articles found.</p>
      </section>
    )
  }

  return (
    <section className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
      <h2 className='text-2xl font-bold text-foreground mb-12'>All Articles</h2>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className='group'>
            <Card className='hover:border-accent transition-all hover:shadow-lg h-full flex flex-col'>
              <CardHeader className='pb-3'>
                <Badge className='w-fit' variant='secondary'>
                  {post.category}
                </Badge>
              </CardHeader>
              <CardContent className='flex-1 pb-4'>
                <h3 className='text-lg font-bold text-foreground mb-2 transition-colors line-clamp-2'>
                  {post.title}
                </h3>
                <p className='text-sm text-muted-foreground line-clamp-2'>
                  {post.excerpt}
                </p>
              </CardContent>
              <CardFooter className='flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4'>
                <div className='flex items-center gap-1'>
                  <Calendar size={14} />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <div className='flex items-center gap-1'>
                  <Clock size={14} />
                  {post.readTime}
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
