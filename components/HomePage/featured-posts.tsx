import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getFeaturedPosts, PostMetadata } from '@/lib/getPosts'

export async function FeaturedPosts() {
  const posts: PostMetadata[] = await getFeaturedPosts(3)

  if (posts.length === 0) return null

  return (
    <section className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
      <h2 className='text-2xl font-bold text-foreground mb-12'>
        Featured Articles
      </h2>
      <div className='grid md:grid-cols-3 gap-8'>
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className='group'>
            <Card className='h-full transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 hover:border-accent'>
              <CardHeader>
                <div className='flex items-center gap-3 mb-4'>
                  <Badge variant='secondary'>{post.category}</Badge>
                  <span className='text-sm text-muted-foreground'>•</span>
                  <span className='text-xs text-muted-foreground'>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <h3 className='text-xl font-bold text-foreground  transition-colors duration-300'>
                  {post.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                  {post.excerpt}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
