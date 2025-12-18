// app/blog/[id]/page.tsx
import { notFound } from 'next/navigation'
import { PostDetailLayout } from '@/components/DetailPage/PostDetailLayout'
import type { Metadata } from 'next'

export const dynamicParams = false // 404 for unknown ids

export async function generateStaticParams() {
  const { getAllPosts } = await import('@/lib/getPosts')
  const posts = await getAllPosts()

  return posts.map((post) => ({
    id: post.slug
  }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params

  try {
    const mod = await import(`@/content/${id}.mdx`)
    const metadata = mod.metadata

    if (!metadata) {
      return {
        title: 'Blog CNTT',
        description: 'Kiến thức công nghệ thông tin chất lượng cao'
      }
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const postUrl = `${baseUrl}/blog/${id}`

    return {
      title: `${metadata.title} | Blog CNTT`,
      description: metadata.excerpt,
      keywords: [metadata.category, 'blog', 'tutorial', 'programming', 'tech'],
      authors: [{ name: metadata.author }],
      creator: metadata.author,
      publisher: 'Blog CNTT',
      formatDetection: {
        email: false,
        address: false,
        telephone: false
      },
      openGraph: {
        title: metadata.title,
        description: metadata.excerpt,
        url: postUrl,
        siteName: 'Blog CNTT',
        type: 'article',
        locale: 'vi_VN',
        images: metadata.image
          ? [
              {
                url: metadata.image.startsWith('http')
                  ? metadata.image
                  : `${baseUrl}${metadata.image}`,
                width: 1200,
                height: 600,
                alt: metadata.title
              }
            ]
          : [],
        publishedTime: new Date(metadata.date).toISOString(),
        modifiedTime: new Date(metadata.date).toISOString(),
        authors: [metadata.author],
        tags: [metadata.category]
      },
      twitter: {
        card: 'summary_large_image',
        title: metadata.title,
        description: metadata.excerpt,
        creator: '@blogcntt', // Replace with your Twitter handle
        images: metadata.image
          ? [
              metadata.image.startsWith('http')
                ? metadata.image
                : `${baseUrl}${metadata.image}`
            ]
          : []
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
      alternates: {
        canonical: postUrl
      },
      category: metadata.category
    }
  } catch {
    return {
      title: 'Blog CNTT',
      description: 'Kiến thức công nghệ thông tin chất lượng cao'
    }
  }
}

export default async function PostPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  let PostComponent
  let metadata

  try {
    // mod là do remark-mdx-frontmatter tự tạo ra
    const mod = await import(`@/content/${id}.mdx`)
    PostComponent = mod.default
    metadata = mod.metadata
  } catch {
    notFound()
  }

  if (!PostComponent || !metadata) notFound()

  return (
    <PostDetailLayout metadata={metadata}>
      <PostComponent />
    </PostDetailLayout>
  )
}
