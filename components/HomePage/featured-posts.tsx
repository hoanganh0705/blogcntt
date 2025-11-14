// components/FeaturedPosts.tsx
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getFeaturedPosts, PostMetadata } from '@/lib/getPosts'

export async function FeaturedPosts() {
  const posts: PostMetadata[] = await getFeaturedPosts(2)

  if (posts.length === 0) return null

  return (
    <section className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
      <h2 className='text-3xl font-bold text-foreground mb-12'>
        Featured Articles
      </h2>
      <div className='grid md:grid-cols-2 gap-8'>
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className='group'>
            <article className='bg-card border border-border rounded-lg p-8 hover:border-accent transition-colors h-full flex flex-col justify-between'>
              <div>
                <div className='flex items-center gap-3 mb-4'>
                  <span className='text-sm font-medium text-accent'>
                    {post.category}
                  </span>
                  <span className='text-sm text-muted-foreground'>•</span>
                  <span className='text-sm text-muted-foreground'>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <h3 className='text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors'>
                  {post.title}
                </h3>
                <p className='text-muted-foreground leading-relaxed mb-4'>
                  {post.excerpt}
                </p>
              </div>
              <div className='flex items-center justify-between pt-4 border-t border-border'>
                <span className='text-sm text-muted-foreground'>
                  {post.readTime}
                </span>
                <ArrowRight
                  size={20}
                  className='text-accent group-hover:translate-x-1 transition-transform'
                />
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
