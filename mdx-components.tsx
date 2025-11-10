// mdx-components.tsx
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(): MDXComponents {
  return {
    pre: ({ children, ...props }) => (
      <pre
        {...props}
        className='not-prose bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm my-6 shadow-lg border border-gray-800'
        style={{ fontFamily: 'Fira Code, monospace' }}
      >
        {children}
      </pre>
    ),
    h1: ({ children }) => (
      <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mt-12 mb-6 text-foreground leading-tight'>
        {children}
      </h1>
    )
  }
}
