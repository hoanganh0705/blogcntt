// app/posts/[id]/page.tsx
import { notFound } from 'next/navigation'
import { PostDetailLayout } from '@/components/DetailPage/PostDetailLayout'

export const dynamicParams = false // 404 for unknown ids

export async function generateStaticParams() {
  // OPTIONAL: pre-render known posts at build time
  // Return [] if you want fully dynamic (SSR) rendering
  return []
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
    console.log(mod)
    PostComponent = mod.default
    console.log(PostComponent)
    metadata = mod.metadata
    console.log(metadata)
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
