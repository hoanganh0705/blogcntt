// app/posts/[id]/page.tsx
import { notFound } from 'next/navigation'
import { PostDetailLayout } from '@/components/DetailPage/PostDetailLayout'

export const dynamicParams = false // 404 for unknown ids

export async function generateStaticParams() {
  const { getAllPosts } = await import('@/lib/getPosts')
  const posts = await getAllPosts()

  return posts.map((post) => ({
    id: post.slug
  }))
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
