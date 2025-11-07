import { PostDetail } from '@/components/post-detail'
import Link from 'next/link'

const allPosts = [
  {
    id: 1,
    title: 'Building Accessible Interfaces',
    excerpt:
      'How to create digital experiences that work for everyone, with practical techniques and real-world examples.',
    content: `Accessibility is not an afterthought in web design—it's a fundamental principle that ensures your content reaches and serves everyone. In this comprehensive guide, we'll explore practical techniques and real-world examples to help you build interfaces that are truly inclusive.

The importance of accessible design cannot be overstated. When you design with accessibility in mind, you're not only helping people with disabilities—you're improving the experience for everyone. From keyboard navigation to screen reader optimization, these practices make interfaces more usable for all users.

Let's start with the basics. Semantic HTML is your foundation. Using proper heading hierarchies, alt text for images, and meaningful link text ensures that assistive technologies can properly interpret your content. These simple practices can have a profound impact on accessibility.

Color contrast is another crucial element. Aim for at least a 4.5:1 contrast ratio between text and backgrounds. This helps users with low vision and makes content readable in various lighting conditions. Tools like WebAIM's Contrast Checker can help you verify your ratios.

Form accessibility often gets overlooked, but it's critical. Always associate labels with form inputs, provide clear error messages, and indicate required fields. ARIA attributes can enhance your forms' accessibility when used correctly.

Testing is essential. Use keyboard navigation to ensure all interactive elements are reachable. Test with screen readers like NVDA or JAWS. Conduct user testing with people who have disabilities—they'll provide invaluable insights.`,
    category: 'Design',
    date: 'Oct 20, 2024',
    readTime: '8 min read',
    author: 'Sarah Chen',
    image: '/accessible-web-design.jpg'
  },
  {
    id: 2,
    title: 'React Performance Optimization',
    excerpt:
      'Deep dive into rendering optimization, memoization strategies, and profiling tools to make your apps faster.',
    content: `React applications can become sluggish as they grow. Understanding performance optimization techniques is essential for building fast, responsive user experiences. Let's explore the most effective strategies.

React re-renders components when state or props change. While this is powerful, it can lead to unnecessary renders. React.memo allows you to skip re-rendering when props haven't changed, but use it judiciously—profiling first is key.

useMemo and useCallback are powerful hooks for performance optimization. useMemo caches expensive computations, while useCallback prevents functions from being recreated on every render. However, the cost of memoization itself can sometimes outweigh its benefits, so measure first.

Code splitting is another crucial optimization. By splitting your application into smaller chunks, you can lazy-load components and reduce initial bundle size. Next.js makes this easy with dynamic imports.

Virtual scrolling is a game-changer for lists with many items. Instead of rendering every item, you only render visible items. Libraries like react-window make this implementation straightforward.

Profiling is your best friend. The React DevTools Profiler shows you exactly which components are rendering and how long it takes. Use it to identify bottlenecks before implementing optimizations.

Remember: don't optimize prematurely. Measure, identify bottlenecks, and then optimize. The tools are there to guide you.`,
    category: 'Development',
    date: 'Oct 18, 2024',
    readTime: '12 min read',
    author: 'James Miller',
    image: '/react-performance.jpg'
  },
  {
    id: 3,
    title: 'CSS Grid Layouts Explained',
    excerpt:
      'Master modern CSS Grid with practical examples and common patterns.',
    content: `CSS Grid has revolutionized how we approach web layouts. Once you understand its core concepts, you'll find it to be an incredibly powerful and flexible tool.

The grid container and grid items form the foundation. When you set display: grid on a container, all direct children become grid items. Define your grid structure with grid-template-columns and grid-template-rows.

The fr unit is your friend. It represents a fraction of available space, making responsive layouts easier. 1fr is equivalent to one part of the available space, so grid-template-columns: 1fr 1fr creates two equal columns.

Grid lines are the numbered lines around your grid. Using grid-column and grid-row, you can place items at specific locations. The auto keyword is handy for automatically placing items based on the grid's flow.

Named grid areas offer semantic and readable code. With grid-template-areas, you can visualize your layout as a text pattern, making it self-documenting.

For responsive grids, combine CSS Grid with media queries. You can change your grid structure at different breakpoints to optimize for different screen sizes.

Auto-placement is powerful. The browser automatically places items based on the grid flow. Control this behavior with grid-auto-flow and grid-auto-rows/grid-auto-columns.`,
    category: 'CSS',
    date: 'Oct 15, 2024',
    readTime: '6 min read',
    author: 'Maria Garcia',
    image: '/css-grid-layouts.jpg'
  }
]

export default async function PostPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const postId = Number.parseInt(id)
  const post = allPosts.find((p) => p.id === postId)

  if (!post) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-foreground mb-4'>
            Post Not Found
          </h1>
          <p className='text-muted-foreground mb-8'>
            The article you&lsquo;re looking for doesn&lsquo;t exist.
          </p>
          <Link href='/' className='text-accent hover:underline'>
            Back to Articles
          </Link>
        </div>
      </div>
    )
  }

  return <PostDetail post={post} />
}
