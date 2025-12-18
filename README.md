# Blog CNTT

A modern, SEO-optimized blog built with Next.js 16, featuring MDX content, dark mode, and comprehensive metadata.

## Features

- 🚀 **Next.js 16** with App Router
- 📝 **MDX Support** for rich content
- 🎨 **Tailwind CSS** with dark mode
- 🔍 **SEO Optimized** with dynamic metadata
- 📱 **Responsive Design**
- ⚡ **Static Generation** for performance
- 🗺️ **Sitemap Generation**
- 🤖 **Robots.txt** for search engines

## SEO Features

- Dynamic meta tags for each blog post
- Open Graph and Twitter Card support
- Structured data and canonical URLs
- Automatic sitemap generation
- Optimized for search engines

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   # or
   pnpm install
   ```

3. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

4. Update `.env.local` with your settings:

   ```env
   NEXT_PUBLIC_BASE_URL=https://yourdomain.com
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the blog.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── blog/[id]/         # Dynamic blog post pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx          # Homepage
│   ├── sitemap.ts        # Dynamic sitemap
│   └── not-found.tsx     # 404 page
├── components/            # React components
├── content/               # MDX blog posts
├── lib/                   # Utility functions
└── public/                # Static assets
```

## SEO Configuration

Each blog post automatically gets:

- Custom title and description
- Open Graph meta tags
- Twitter Card support
- Canonical URLs
- Structured data

## License

MIT
