import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      'remark-gfm',
      'remark-frontmatter',                    // Bật frontmatter (YAML)
      ['remark-mdx-frontmatter', { name: 'metadata' }], // Export thành `metadata`
    ],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)