import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getFeaturedPosts, PostMetadata } from '@/lib/getPosts'

export async function FeaturedPosts() {
  const posts: PostMetadata[] = await getFeaturedPosts(2)

  if (posts.length === 0) return null

  return (
    <section className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
      <h2 className='text-2xl font-bold text-foreground mb-12'>
        Featured Articles
      </h2>
      <div className='grid md:grid-cols-2 gap-8'>
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className='group'>
            <Card className='h-full hover:border-accent transition-colors'>
              <CardHeader>
                <div className='flex items-center gap-3 mb-4'>
                  <Badge variant='secondary'>{post.category}</Badge>
                  <span className='text-sm text-muted-foreground'>•</span>
                  <span className='text-sm text-muted-foreground'>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <h3 className='text-2xl font-bold text-foreground transition-colors'>
                  {post.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground leading-relaxed'>
                  {post.excerpt}
                </p>
              </CardContent>
              <CardFooter className='flex items-center justify-between border-t'>
                <span className='text-sm text-muted-foreground'>
                  {post.readTime}
                </span>
                <ArrowRight
                  size={20}
                  className='text-accent group-hover:translate-x-1 transition-transform'
                />
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
