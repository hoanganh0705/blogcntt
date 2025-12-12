// next.config.ts
import createMDX from '@next/mdx'

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      'remark-gfm',
      'remark-frontmatter',
      ['remark-mdx-frontmatter', { name: 'metadata' }],
    ],
    rehypePlugins: [

    ],
  },
})

export default withMDX({
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
})